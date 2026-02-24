import random
import string

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import List, Optional

from core.security import get_current_user
from core.redis_client import redis_client
from db.session import get_db

router = APIRouter(tags=["Bookings"])


class CreateBookingRequest(BaseModel):
    flight_id: int
    seat_nos: List[str]
    total_amount: float
    passenger_name: Optional[str] = None
    passenger_email: Optional[str] = None
    passenger_phone: Optional[str] = None


def generate_pnr() -> str:
    """Generate a random PNR like PNR2H4K9L3"""
    chars = string.ascii_uppercase + string.digits
    return "PNR" + "".join(random.choices(chars, k=7))


@router.post("/bookings")
async def create_booking(
    data: CreateBookingRequest,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    user_id = str(current_user["id"])
    pnr = generate_pnr()

    # 1. Create booking record
    result = await db.execute(
        text("""
            INSERT INTO bookings (user_id, flight_instance_id, pnr, total_amount,
                                  passenger_name, passenger_email, passenger_phone)
            VALUES (:uid, :fid, :pnr, :amount, :pname, :pemail, :pphone)
            RETURNING id
        """),
        {
            "uid": user_id,
            "fid": data.flight_id,
            "pnr": pnr,
            "amount": data.total_amount,
            "pname": data.passenger_name,
            "pemail": data.passenger_email,
            "pphone": data.passenger_phone,
        },
    )
    booking_row = result.mappings().first()
    booking_id = booking_row["id"]

    # 2. Insert booking_seats rows and mark seats as booked
    for seat_no in data.seat_nos:
        await db.execute(
            text("""
                INSERT INTO booking_seats (flight_instance_id, seat_no, user_id, booking_id)
                VALUES (:fid, :seat, :uid, :bid)
            """),
            {"fid": data.flight_id, "seat": seat_no, "uid": user_id, "bid": booking_id},
        )

        # 3. Clear seat holds in DB and Redis
        await db.execute(
            text("""
                DELETE FROM seat_holds
                WHERE flight_instance_id = :fid AND seat_no = :seat
            """),
            {"fid": data.flight_id, "seat": seat_no},
        )
        redis_key = f"hold:{data.flight_id}:{seat_no}"
        redis_client.delete(redis_key)

    await db.commit()

    return {
        "booking_id": booking_id,
        "pnr": pnr,
        "status": "confirmed",
        "message": "Booking created successfully",
    }


@router.get("/my-trips")
async def get_my_trips(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    user_id = str(current_user["id"])

    # Get all bookings with flight details
    result = await db.execute(
        text("""
            SELECT
                b.id, b.pnr, b.total_amount, b.status, b.created_at,
                b.passenger_name, b.passenger_email,
                fi.flight_number, fi.travel_date,
                fi.departure_time, fi.arrival_time, fi.base_price,
                al.name AS airline,
                ap_from.city AS from_city, ap_from.code AS from_code,
                ap_to.city AS to_city, ap_to.code AS to_code
            FROM bookings b
            JOIN flight_instances fi ON b.flight_instance_id = fi.id
            JOIN airlines al ON fi.airline_id = al.id
            JOIN airports ap_from ON fi.from_airport_id = ap_from.id
            JOIN airports ap_to ON fi.to_airport_id = ap_to.id
            WHERE b.user_id = :uid
            ORDER BY b.created_at DESC
        """),
        {"uid": user_id},
    )
    bookings = result.mappings().all()

    trips = []
    for b in bookings:
        # Get seats for this booking
        seats_result = await db.execute(
            text("SELECT seat_no FROM booking_seats WHERE booking_id = :bid"),
            {"bid": b["id"]},
        )
        seats = [row["seat_no"] for row in seats_result.mappings().all()]

        trips.append({
            "id": str(b["id"]),
            "pnr": b["pnr"],
            "flightNumber": b["flight_number"],
            "airline": b["airline"],
            "from": b["from_city"],
            "to": b["to_city"],
            "date": str(b["travel_date"]),
            "departureTime": str(b["departure_time"])[:5],
            "arrivalTime": str(b["arrival_time"])[:5],
            "seats": seats,
            "status": b["status"],
            "price": float(b["total_amount"]),
        })

    return {"trips": trips}
