import asyncio
import asyncpg

async def main():
    conn = await asyncpg.connect(
        user='postgres', password='elango08',
        host='localhost', port=5432, database='flight_booking_db'
    )
    
    # Check schema
    rows = await conn.fetch(
        "SELECT column_name, data_type FROM information_schema.columns WHERE table_name='flight_instances' ORDER BY ordinal_position"
    )
    print("=== flight_instances schema ===")
    for r in rows:
        print(f"  {r['column_name']}: {r['data_type']}")
    
    # Check data
    flights = await conn.fetch("SELECT id, flight_number, travel_date, departure_time, arrival_time FROM flight_instances LIMIT 5")
    print(f"\n=== Sample flights ({len(flights)} shown) ===")
    for f in flights:
        print(f"  {dict(f)}")
    
    # Test the exact query the router uses
    print("\n=== Testing search query (MAA -> DEL, 2026-03-01) ===")
    try:
        result = await conn.fetch("""
            SELECT f.id, a.name AS airline, f.flight_number,
                   ap_from.code AS from_airport, ap_to.code AS to_airport,
                   f.travel_date, f.departure_time, f.arrival_time,
                   f.base_price, f.currency
            FROM flight_instances f
            JOIN airlines a ON f.airline_id = a.id
            JOIN airports ap_from ON f.from_airport_id = ap_from.id
            JOIN airports ap_to ON f.to_airport_id = ap_to.id
            WHERE ap_from.code = $1 AND ap_to.code = $2 AND f.travel_date = $3
            ORDER BY f.departure_time ASC
        """, 'MAA', 'DEL', __import__('datetime').date(2026, 3, 1))
        print(f"  Found {len(result)} flights")
        for r in result:
            print(f"  {dict(r)}")
    except Exception as e:
        print(f"  ERROR: {e}")
    
    await conn.close()

asyncio.run(main())
