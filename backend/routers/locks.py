from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from core.redis_client import redis_client
from core.config import SEAT_HOLD_SECONDS
from core.security import get_current_user
from db.session import get_db

router = APIRouter(prefix="/flights", tags=["Seat Holds"])


class HoldRequest(BaseModel):
    seat_no: str


@router.post("/{flight_id}/hold")
async def hold_seat(
    flight_id: int,
    data: HoldRequest,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    user_id = str(current_user["id"])
    seat_no = data.seat_no

    # 1. Check if seat is already booked
    booked = await db.execute(
        text("""
            SELECT id FROM booking_seats
            WHERE flight_instance_id = :fid AND seat_no = :seat
        """),
        {"fid": flight_id, "seat": seat_no},
    )
    if booked.mappings().first():
        raise HTTPException(status_code=400, detail="Seat is already booked")

    # 2. Check if seat is already held in Redis
    redis_key = f"hold:{flight_id}:{seat_no}"
    existing_holder = redis_client.get(redis_key)
    if existing_holder and existing_holder != user_id:
        raise HTTPException(status_code=400, detail="Seat is already held by another user")

    # 3. If user already holds this seat, return success
    if existing_holder == user_id:
        ttl = redis_client.ttl(redis_key)
        return {
            "message": "Seat already held by you",
            "seat_no": seat_no,
            "expires_in_seconds": max(ttl, 0),
        }

    # 4. Set Redis lock with TTL
    redis_client.set(redis_key, user_id, ex=SEAT_HOLD_SECONDS)

    # 5. Upsert into seat_holds table
    expires_at = datetime.now(timezone.utc) + timedelta(seconds=SEAT_HOLD_SECONDS)
    await db.execute(
        text("""
            INSERT INTO seat_holds (flight_instance_id, seat_no, user_id, held_at, expires_at)
            VALUES (:fid, :seat, :uid, NOW(), :expires)
            ON CONFLICT (flight_instance_id, seat_no)
            DO UPDATE SET user_id = :uid, held_at = NOW(), expires_at = :expires
        """),
        {"fid": flight_id, "seat": seat_no, "uid": user_id, "expires": expires_at},
    )
    await db.commit()

    return {
        "message": "Seat held successfully",
        "seat_no": seat_no,
        "expires_in_seconds": SEAT_HOLD_SECONDS,
    }