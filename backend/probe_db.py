import asyncio
import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

async def probe_db():
    load_dotenv()
    db_url = os.getenv("DATABASE_URL")
    print(f"URL: {db_url}")
    
    # Try connecting to generic 'postgres' database first to check credentials
    base_url = db_url.rsplit('/', 1)[0] + '/postgres'
    print(f"Base URL: {base_url}")
    
    try:
        engine = create_async_engine(base_url, connect_args={"timeout": 5})
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT datname FROM pg_database"))
            dbs = [row[0] for row in result.fetchall()]
            print(f"Found databases: {dbs}")
            if "flight_booking_db" in dbs:
                print("SUCCESS: flight_booking_db exists.")
            else:
                print("ERROR: flight_booking_db DOES NOT exist.")
    except Exception as e:
        print(f"FAILED to connect to PostgreSQL: {e}")

if __name__ == "__main__":
    asyncio.run(probe_db())
