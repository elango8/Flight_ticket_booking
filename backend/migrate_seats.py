import asyncio
from sqlalchemy import text
from db.session import engine

async def migrate():
    async with engine.begin() as conn:
        await conn.execute(text(
            "ALTER TABLE booking_seats "
            "DROP CONSTRAINT IF EXISTS uq_booking_seats_flight_seat"
        ))
        await conn.execute(text(
            "ALTER TABLE booking_seats "
            "ADD CONSTRAINT uq_booking_seats_flight_seat "
            "UNIQUE (flight_instance_id, seat_no)"
        ))
        print("Unique constraint added to booking_seats!")

asyncio.run(migrate())
