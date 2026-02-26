"""Execute add_airplanes.sql against the local PostgreSQL database."""
import psycopg2

conn = psycopg2.connect(
    host="localhost",
    port=5432,
    dbname="flight_booking_db",
    user="postgres",
    password="elango08",
)
conn.autocommit = True
cur = conn.cursor()

with open("add_airplanes.sql", "r") as f:
    sql = f.read()

try:
    cur.execute(sql)
    print("✅ SQL executed successfully!")
except Exception as e:
    print(f"❌ Error: {e}")

# Verify counts
cur.execute("SELECT COUNT(*) FROM seat_maps")
print(f"Total seat maps (aircraft): {cur.fetchone()[0]}")

cur.execute("SELECT COUNT(*) FROM flight_instances")
print(f"Total flight instances: {cur.fetchone()[0]}")

cur.execute("SELECT COUNT(*) FROM seat_map_seats")
print(f"Total individual seats: {cur.fetchone()[0]}")

cur.close()
conn.close()
