import asyncio
import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

async def test_db():
    # Try multiple paths for .env
    paths = [".env", "../.env", "../../.env"]
    found = False
    for p in paths:
        if os.path.exists(p):
            print(f"Found .env at {p}")
            load_dotenv(p)
            found = True
            break
    
    if not found:
        print("No .env file found!")
    
    db_url = os.getenv("DATABASE_URL")
    print(f"Testing connection to: {db_url}")
    
    if not db_url:
        print("DATABASE_URL is not set!")
        return

    try:
        engine = create_async_engine(db_url)
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            print(f"Connection successful: {result.scalar()}")
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_db())
