import asyncio
import asyncpg

async def main():
    # Connect to 'postgres' DB to check/create flight_booking_db
    conn = await asyncpg.connect(
        user='postgres', password='elango08',
        host='localhost', port=5432, database='postgres'
    )
    
    exists = await conn.fetchval(
        "SELECT 1 FROM pg_database WHERE datname='flight_booking_db'"
    )
    
    if not exists:
        await conn.execute('CREATE DATABASE flight_booking_db')
        print('✅ Created database: flight_booking_db')
    else:
        print('✅ Database flight_booking_db already exists')
    
    await conn.close()
    
    # Connect to flight_booking_db and run init.sql
    conn2 = await asyncpg.connect(
        user='postgres', password='elango08',
        host='localhost', port=5432, database='flight_booking_db'
    )
    
    # Check if tables already exist
    table_count = await conn2.fetchval(
        "SELECT count(*) FROM information_schema.tables WHERE table_name='flight_instances'"
    )
    
    if table_count == 0:
        with open('init.sql', 'r') as f:
            sql = f.read()
        await conn2.execute(sql)
        print('✅ Schema created and seed data inserted')
    else:
        flight_count = await conn2.fetchval('SELECT count(*) FROM flight_instances')
        print(f'✅ Tables already exist ({flight_count} flights)')
    
    await conn2.close()
    print('\n🚀 Database is ready!')

if __name__ == '__main__':
    asyncio.run(main())
