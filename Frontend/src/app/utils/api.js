// API service layer for connecting frontend to FastAPI backend
// All requests are proxied through Vite: /api/* → http://localhost:8000/*

const API_BASE = '/api';

// ─── City ↔ Airport Code Mapping ────────────────────────────────────

const CITY_TO_CODE = {
    'Chennai': 'MAA',
    'Delhi': 'DEL',
    'Mumbai': 'BOM',
    'Bangalore': 'BLR',
    'Hyderabad': 'HYD',
    'Kolkata': 'CCU',
    'Goa': 'GOI',
    'Kochi': 'COK',
};

const CODE_TO_CITY = Object.fromEntries(
    Object.entries(CITY_TO_CODE).map(([city, code]) => [code, city])
);

export function cityToCode(city) {
    return CITY_TO_CODE[city] || city;
}

export function codeToCity(code) {
    return CODE_TO_CITY[code] || code;
}

// ─── API Functions ──────────────────────────────────────────────────

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API error: ${response.status}`);
    }
    return response.json();
}

/**
 * Search flights by origin, destination, and date.
 * Accepts city names (e.g. "Chennai") — they are auto-converted to airport codes.
 */
export async function searchFlights(from, to, date) {
    const fromCode = cityToCode(from);
    const toCode = cityToCode(to);
    const params = new URLSearchParams({ from: fromCode, to: toCode, date });
    const response = await fetch(`${API_BASE}/flights?${params}`);
    return handleResponse(response);
}

/**
 * Get a single flight by its ID.
 */
export async function getFlightById(id) {
    const response = await fetch(`${API_BASE}/flights/${id}`);
    return handleResponse(response);
}

/**
 * Get the seat map for a flight, including booked/available status.
 */
export async function getSeats(flightId) {
    const response = await fetch(`${API_BASE}/flights/${flightId}/seats`);
    return handleResponse(response);
}

/**
 * Lock a seat for 5 minutes via Redis.
 */
export async function lockSeat(flightId, seatNo, userId = 1) {
    const response = await fetch(`${API_BASE}/locks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            flight_id: flightId,
            seat_no: seatNo,
            user_id: userId,
        }),
    });
    return handleResponse(response);
}

/**
 * Get list of airports from backend.
 */
export async function getAirports() {
    const response = await fetch(`${API_BASE}/airports`);
    return handleResponse(response);
}

// ─── Helpers: Convert API response to frontend Flight shape ─────────

/** Extract airline code from flight number (e.g. "6E-2043" → "6E") */
function extractAirlineCode(flightNumber) {
    const parts = flightNumber.split('-');
    return parts[0] || flightNumber.substring(0, 2);
}

/** Format a time string (HH:MM:SS → HH:MM) */
function formatTime(time) {
    if (!time) return '';
    const parts = time.split(':');
    return `${parts[0]}:${parts[1]}`;
}

/** Calculate duration between two time strings */
function calculateDuration(dep, arr) {
    const [depH, depM] = dep.split(':').map(Number);
    const [arrH, arrM] = arr.split(':').map(Number);
    let totalMinutes = (arrH * 60 + arrM) - (depH * 60 + depM);
    if (totalMinutes < 0) totalMinutes += 24 * 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}

/**
 * Convert an API flight response to the shape used by frontend components.
 */
export function apiFlightToFrontend(apiFlight) {
    const depTime = formatTime(apiFlight.departure_time);
    const arrTime = formatTime(apiFlight.arrival_time);

    return {
        id: String(apiFlight.id),
        airline: apiFlight.airline,
        logo: extractAirlineCode(apiFlight.flight_number),
        flightNumber: apiFlight.flight_number,
        departure: codeToCity(apiFlight.from_airport),
        arrival: codeToCity(apiFlight.to_airport),
        departureTime: depTime,
        arrivalTime: arrTime,
        duration: calculateDuration(apiFlight.departure_time, apiFlight.arrival_time),
        stops: 0,
        price: apiFlight.base_price,
    };
}
