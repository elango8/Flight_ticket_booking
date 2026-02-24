import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Timer, CheckCircle2, AlertCircle } from 'lucide-react';
import { getSeats, holdSeat, getToken } from '../utils/api.js';

export function SeatSelectionPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { flight: stateFlight, searchData, passengerData } = location.state || {};

    const mockFlight = {
        id: '1', airline: 'IndiGo', flightNumber: '6E-2043', departure: 'Chennai',
        arrival: 'Delhi', departureTime: '06:30', arrivalTime: '09:15',
        duration: '2h 45m', stops: 0, price: 4299,
    };

    const flight = stateFlight || mockFlight;

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [lockedSeats, setLockedSeats] = useState(new Set());
    const [bookedSeats, setBookedSeats] = useState(new Set());
    const [timeLeft, setTimeLeft] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lockError, setLockError] = useState(null);
    const timerRef = useRef(null);
    const pollRef = useRef(null);

    // ── Fetch seats from API ─────────────────────────────────────────
    const fetchSeats = useCallback(async () => {
        try {
            const flightId = flight.id;
            const result = await getSeats(flightId);
            const booked = new Set();
            const locked = new Set();
            const seatList = result.seats.map((apiSeat) => {
                const seatNo = apiSeat.seat_no;
                const match = seatNo.match(/^(\d+)([A-Z])$/);
                let status = 'available';

                if (apiSeat.status === 'BOOKED') {
                    status = 'booked';
                    booked.add(seatNo);
                } else if (apiSeat.status === 'LOCKED') {
                    status = 'locked';
                    locked.add(seatNo);
                }

                if (!match) {
                    return { id: seatNo, row: 0, column: seatNo, status };
                }
                return { id: seatNo, row: parseInt(match[1]), column: match[2], status };
            });

            setSeats(seatList);
            setBookedSeats(booked);
            setLockedSeats(locked);
        } catch (err) {
            if (seats.length === 0) {
                setError(err.message || 'Failed to load seats');
                generateLocalSeats();
            }
        }
    }, [flight.id]);

    // ── Initial fetch ─────────────────────────────────────────────────
    useEffect(() => {
        async function initialFetch() {
            setLoading(true);
            setError(null);
            await fetchSeats();
            setLoading(false);
        }
        initialFetch();
    }, [fetchSeats]);

    // ── Auto-refresh seats every 10 seconds ──────────────────────────
    useEffect(() => {
        pollRef.current = setInterval(() => {
            fetchSeats();
        }, 10000);
        return () => { if (pollRef.current) clearInterval(pollRef.current); };
    }, [fetchSeats]);

    function generateLocalSeats() {
        const rows = 30;
        const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
        const localSeats = [];
        for (let row = 1; row <= rows; row++) {
            for (const col of columns) {
                localSeats.push({ id: `${row}${col}`, row, column: col, status: 'available' });
            }
        }
        setSeats(localSeats);
    }

    // ── Countdown timer ──────────────────────────────────────────────
    useEffect(() => {
        if (timerStarted && timeLeft !== null && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === null || prev <= 1) {
                        if (timerRef.current) clearInterval(timerRef.current);
                        navigate('/search');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => { if (timerRef.current) clearInterval(timerRef.current); };
        }
    }, [timerStarted, navigate]);

    if (!flight || !flight.price) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Invalid booking data</p>
                    <button onClick={() => navigate('/search')} className="text-[#0033A0] hover:underline font-medium">Go back to search</button>
                </div>
            </div>
        );
    }

    const allRows = [...new Set(seats.map(s => s.row))].sort((a, b) => a - b);

    // ── Handle seat click ────────────────────────────────────────────
    const handleSeatClick = async (seat) => {
        if (seat.status === 'booked' || seat.status === 'locked') return;
        setLockError(null);

        // Start timer on first selection
        if (!timerStarted && selectedSeats.length === 0) {
            setTimerStarted(true);
            setTimeLeft(600);
        }

        // Deselect if already selected
        if (selectedSeats.includes(seat.id)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat.id));
            return;
        }

        // Check if user is logged in
        const token = getToken();
        if (!token) {
            setLockError('Please login first to select seats');
            return;
        }

        // Try to hold the seat
        try {
            await holdSeat(Number(flight.id), seat.id);
            setSelectedSeats([...selectedSeats, seat.id]);
            // Re-fetch seats to get latest state
            await fetchSeats();
        } catch (err) {
            setLockError(err.message || `Seat ${seat.id} is already locked by another user`);
        }
    };

    // ── Seat color logic ─────────────────────────────────────────────
    // RED = booked, ORANGE = locked/selected, GREEN = available
    const getSeatColor = (seat) => {
        if (seat.status === 'booked' || bookedSeats.has(seat.id)) {
            return 'bg-red-500 text-white cursor-not-allowed border-red-600';
        }
        if (selectedSeats.includes(seat.id)) {
            return 'bg-orange-500 text-white border-orange-600 shadow-lg ring-2 ring-orange-300';
        }
        if (seat.status === 'locked' || lockedSeats.has(seat.id)) {
            return 'bg-orange-400 text-white cursor-not-allowed border-orange-500';
        }
        return 'bg-green-500 hover:bg-green-600 text-white cursor-pointer border-green-600';
    };

    const isSeatDisabled = (seat) => {
        return seat.status === 'booked' || (seat.status === 'locked' && !selectedSeats.includes(seat.id));
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleConfirm = () => {
        if (selectedSeats.length === 0) { alert('Please select at least one seat'); return; }
        if (timerRef.current) clearInterval(timerRef.current);
        navigate('/payment', { state: { flight, searchData, passengerData, selectedSeats } });
    };

    const isTimeRunningOut = timeLeft !== null && timeLeft <= 120;

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {timerStarted && timeLeft !== null && (
                    <div className={`${isTimeRunningOut ? 'bg-red-100 border-red-300' : 'bg-amber-50 border-amber-200'} border-2 rounded-xl p-6 mb-6 flex items-center justify-between shadow-lg`}>
                        <div className="flex items-center gap-3">
                            <Timer className={`w-8 h-8 ${isTimeRunningOut ? 'text-red-600' : 'text-amber-600'}`} />
                            <div>
                                <div className={`font-semibold ${isTimeRunningOut ? 'text-red-900' : 'text-amber-900'}`}>{isTimeRunningOut ? '⚠️ Hurry! Time running out' : 'Complete booking within'}</div>
                                <div className={`text-sm ${isTimeRunningOut ? 'text-red-700' : 'text-amber-700'}`}>Seats are held for 10 minutes</div>
                            </div>
                        </div>
                        <div className={`text-4xl font-bold ${isTimeRunningOut ? 'text-red-600' : 'text-amber-600'}`}>{formatTime(timeLeft)}</div>
                    </div>
                )}

                {lockError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <span className="text-red-700 text-sm">{lockError}</span>
                        <button onClick={() => setLockError(null)} className="ml-auto text-red-400 hover:text-red-600 text-lg font-bold">×</button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Your Seat</h2>

                            {loading && (
                                <div className="text-center py-12">
                                    <div className="w-12 h-12 border-4 border-[#0033A0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-gray-600">Loading seat map...</p>
                                </div>
                            )}

                            {!loading && error && (
                                <div className="text-center py-8">
                                    <p className="text-amber-600 mb-2">⚠️ {error}</p>
                                    <p className="text-sm text-gray-500">Using offline seat map</p>
                                </div>
                            )}

                            {!loading && (
                                <>
                                    {/* Legend — GREEN / ORANGE / RED */}
                                    <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200 flex-wrap">
                                        {[
                                            { color: 'bg-green-500', label: 'Available', border: 'border-green-600' },
                                            { color: 'bg-orange-500', label: 'Selected / Locked', border: 'border-orange-600' },
                                            { color: 'bg-red-500', label: 'Booked', border: 'border-red-600' },
                                        ].map((item) => (
                                            <div key={item.label} className="flex items-center gap-2">
                                                <div className={`w-8 h-8 rounded border-2 ${item.color} ${item.border} shadow-sm`}></div>
                                                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-center mb-6">
                                        <div className="bg-gradient-to-r from-[#0033A0] to-[#0052CC] text-white px-8 py-2 rounded-full text-sm font-semibold shadow-lg">✈️ Front of Aircraft</div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <div className="inline-block min-w-full">
                                            <div className="flex justify-center mb-4">
                                                <div className="flex gap-2">
                                                    {['A', 'B', 'C'].map((col) => (<div key={col} className="w-12 text-center text-sm font-bold text-[#0033A0]">{col}</div>))}
                                                    <div className="w-12"></div>
                                                    {['D', 'E', 'F'].map((col) => (<div key={col} className="w-12 text-center text-sm font-bold text-[#0033A0]">{col}</div>))}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                {allRows.map((row) => (
                                                    <div key={row} className="flex justify-center items-center gap-2">
                                                        <div className="w-10 text-sm font-bold text-gray-600 text-right">{row}</div>
                                                        <div className="flex gap-2">
                                                            {['A', 'B', 'C'].map(col => {
                                                                const seat = seats.find(s => s.row === row && s.column === col);
                                                                return seat ? (
                                                                    <button
                                                                        key={seat.id}
                                                                        onClick={() => handleSeatClick(seat)}
                                                                        className={`w-12 h-12 rounded-lg text-xs font-bold transition-all border-2 ${getSeatColor(seat)}`}
                                                                        disabled={isSeatDisabled(seat)}
                                                                    >
                                                                        {selectedSeats.includes(seat.id) ? <CheckCircle2 className="w-6 h-6 mx-auto" /> : col}
                                                                    </button>
                                                                ) : (<div key={`${row}${col}`} className="w-12 h-12"></div>);
                                                            })}
                                                        </div>
                                                        <div className="w-12 flex items-center justify-center"><div className="h-px w-8 bg-gray-300"></div></div>
                                                        <div className="flex gap-2">
                                                            {['D', 'E', 'F'].map(col => {
                                                                const seat = seats.find(s => s.row === row && s.column === col);
                                                                return seat ? (
                                                                    <button
                                                                        key={seat.id}
                                                                        onClick={() => handleSeatClick(seat)}
                                                                        className={`w-12 h-12 rounded-lg text-xs font-bold transition-all border-2 ${getSeatColor(seat)}`}
                                                                        disabled={isSeatDisabled(seat)}
                                                                    >
                                                                        {selectedSeats.includes(seat.id) ? <CheckCircle2 className="w-6 h-6 mx-auto" /> : col}
                                                                    </button>
                                                                ) : (<div key={`${row}${col}`} className="w-12 h-12"></div>);
                                                            })}
                                                        </div>
                                                        <div className="w-10 text-sm font-bold text-gray-600">{row}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-20">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Seats</h3>
                            {selectedSeats.length === 0 ? (
                                <p className="text-sm text-gray-600 mb-6">No seats selected</p>
                            ) : (
                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {selectedSeats.map((seatId) => (<div key={seatId} className="bg-gradient-to-br from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">{seatId}</div>))}
                                    </div>
                                    <div className="text-sm text-gray-600">{selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected</div>
                                </div>
                            )}
                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-sm"><span className="text-gray-600">Flight Fare</span><span className="font-medium text-gray-900">₹{flight.price.toLocaleString()}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-gray-600">Seat Charges</span><span className="font-medium text-gray-900">₹{(selectedSeats.length * 200).toLocaleString()}</span></div>
                            </div>
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold text-gray-900">Total Amount</span>
                                    <span className="text-2xl font-bold text-[#0033A0]">₹{(flight.price + selectedSeats.length * 200).toLocaleString()}</span>
                                </div>
                            </div>
                            <button onClick={handleConfirm} disabled={selectedSeats.length === 0} className="w-full bg-gradient-to-r from-[#0033A0] to-[#0052CC] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed">
                                {selectedSeats.length > 0 ? 'Confirm Seats' : 'Select Seats to Continue'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
