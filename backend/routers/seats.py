from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from db.session import get_db

router = APIRouter(prefix="/flights", tags=["Seats"])

@router.get("/{flight_id}/seats")
async def get_seats(flight_id: int, db: AsyncSession = Depends(get_db)):

    # 1️⃣ Get seat map id for this flight
    seat_map_query = text("""
        SELECT seat_map_id
        FROM flight_instances
        WHERE id = :flight_id
    """)
    
    result = await db.execute(seat_map_query, {"flight_id": flight_id})
    seat_map_row = result.mappings().first()

    if not seat_map_row:
        return {"error": "Flight not found"}

    seat_map_id = seat_map_row["seat_map_id"]

    # 2️⃣ Get all seats from seat_map
    seats_query = text("""
        SELECT seat_no
        FROM seat_map_seats
        WHERE seat_map_id = :seat_map_id
    """)
    
    seats_result = await db.execute(seats_query, {"seat_map_id": seat_map_id})
    all_seats = [row["seat_no"] for row in seats_result.mappings().all()]

    # 3️⃣ Get booked seats
    booked_query = text("""
        SELECT seat_no
        FROM booking_seats
        WHERE flight_instance_id = :flight_id
    """)

    booked_result = await db.execute(booked_query, {"flight_id": flight_id})
    booked_seats = {row["seat_no"] for row in booked_result.mappings().all()}

    # 4️⃣ Prepare response
    seat_list = []

    for seat in all_seats:
        status = "BOOKED" if seat in booked_seats else "AVAILABLE"
        seat_list.append({
            "seat_no": seat,
            "status": status
        })

    return {
        "flight_id": flight_id,
        "total_seats": len(all_seats),
        "seats": seat_list
    }