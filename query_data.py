"""Query all inserted data for the walkthrough - writes to file."""
import psycopg2
import sys

conn = psycopg2.connect(
    host="localhost", port=5432,
    dbname="flight_booking_db", user="postgres", password="elango08",
)
cur = conn.cursor()

out = open("query_output.txt", "w", encoding="utf-8")

def p(s=""):
    out.write(s + "\n")

p("=" * 80)
p("AIRCRAFT TYPES (seat_maps)")
p("=" * 80)
cur.execute("SELECT id, name FROM seat_maps ORDER BY id")
for row in cur.fetchall():
    cur2 = conn.cursor()
    cur2.execute("SELECT COUNT(*) FROM seat_map_seats WHERE seat_map_id = %s", (row[0],))
    seat_count = cur2.fetchone()[0]
    p(f"  ID {row[0]}: {row[1]:30s}  ({seat_count} seats)")
    cur2.close()

p()
p("=" * 80)
p("AIRLINES")
p("=" * 80)
cur.execute("SELECT id, code, name FROM airlines ORDER BY id")
for row in cur.fetchall():
    p(f"  ID {row[0]}: [{row[1]}] {row[2]}")

p()
p("=" * 80)
p("AIRPORTS")
p("=" * 80)
cur.execute("SELECT id, code, city, name FROM airports ORDER BY id")
for row in cur.fetchall():
    p(f"  ID {row[0]:2d}: [{row[1]}] {row[2]:12s} - {row[3]}")

p()
p("=" * 80)
p("ALL FLIGHT INSTANCES (sorted by route & time)")
p("=" * 80)
cur.execute("""
    SELECT 
        f.id, a.code, f.flight_number,
        ap_from.code, ap_to.code,
        f.travel_date, f.departure_time, f.arrival_time,
        f.base_price, sm.name
    FROM flight_instances f
    JOIN airlines a ON f.airline_id = a.id
    JOIN airports ap_from ON f.from_airport_id = ap_from.id
    JOIN airports ap_to ON f.to_airport_id = ap_to.id
    JOIN seat_maps sm ON f.seat_map_id = sm.id
    ORDER BY ap_from.code, ap_to.code, f.departure_time
""")
rows = cur.fetchall()
p(f"\n  Total flights: {len(rows)}\n")

current_route = None
for row in rows:
    route = f"{row[3]} -> {row[4]}"
    if route != current_route:
        if current_route:
            p()
        p(f"  -- {route} --")
        current_route = route
    dep = str(row[6])[:5]
    arr = str(row[7])[:5]
    price = float(row[8])
    p(f"    #{row[0]:2d}  {row[2]:10s}  {dep}-{arr}  Rs.{price:,.0f}  [{row[9]}]")

p()
p("=" * 80)
p("ROUTES SUMMARY")
p("=" * 80)
cur.execute("""
    SELECT ap_from.code, ap_to.code, COUNT(*)
    FROM flight_instances f
    JOIN airports ap_from ON f.from_airport_id = ap_from.id
    JOIN airports ap_to ON f.to_airport_id = ap_to.id
    GROUP BY ap_from.code, ap_to.code
    ORDER BY ap_from.code, ap_to.code
""")
for row in cur.fetchall():
    p(f"  {row[0]} -> {row[1]}: {row[2]} flight(s)")

p()
p("=" * 80)
p("AIRCRAFT USAGE")
p("=" * 80)
cur.execute("""
    SELECT sm.name, COUNT(*)
    FROM flight_instances f
    JOIN seat_maps sm ON f.seat_map_id = sm.id
    GROUP BY sm.name ORDER BY COUNT(*) DESC
""")
for row in cur.fetchall():
    p(f"  {row[0]:30s}: {row[1]} flights")

out.close()
cur.close()
conn.close()
print("Done! Output written to query_output.txt")
