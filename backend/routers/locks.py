from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from core.redis_client import redis_client

router = APIRouter(prefix="/locks", tags=["Locks"])

class LockRequest(BaseModel):
    flight_id: int
    seat_no: str
    user_id: int  # later replace with JWT

@router.post("")
def lock_seat(data: LockRequest):
    key = f"lock:{data.flight_id}:{data.seat_no}"

    # Try to lock with 5-minute expiry
    success = redis_client.set(
        key,
        data.user_id,
        nx=True,
        ex=300
    )

    if not success:
        raise HTTPException(status_code=400, detail="Seat already locked")

    return {
        "message": "Seat locked successfully",
        "expires_in_seconds": 300
    }