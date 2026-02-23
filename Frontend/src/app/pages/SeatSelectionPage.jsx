import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Timer, CheckCircle2 } from 'lucide-react';
import { getSeats, lockSeat } from '../utils/api.js';

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
    const [timeLeft, setTimeLeft] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lockError, setLockError] = useState(null);
    const timerRef = useRef(null);

    useEffect(() => {
        async function fetchSeats() {
            setLoading(true);
            setError(null);
            try {
                const flightId = flight.id;
                const result = await getSeats(flightId);
                const seatList = result.seats.map((apiSeat) => {
                    const seatNo = apiSeat.seat_no;
                    const match = seatNo.match(/^(\d+)([A-Z])$/);
                    if (!match) {
                        return { id: seatNo, row: 0, column: seatNo, status: apiSeat.status === 'BOOKED' ? 'booked' : 'available' };
                    }
                    return { id: seatNo, row: parseInt(match[1]), column: match[2], status: apiSeat.status === 'BOOKED' ? 'booked' : 'available' };
                });
                setSeats(seatList);
            } catch (err) {
                setError(err.message || 'Failed to load seats');
                generateLocalSeats();
            } finally {
                setLoading(false);
            }
        }
        fetchSeats();
    }, [flight.id]);

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

    const handleSeatClick = async (seat) => {
        if (seat.status === 'booked') return;
        setLockError(null);
        if (!timerStarted && selectedSeats.length === 0) {
            setTimerStarted(true);
            setTimeLeft(600);
        }
        if (selectedSeats.includes(seat.id)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat.id));
        } else {
            try {
                await lockSeat(Number(flight.id), seat.id, 1);
                setSelectedSeats([...selectedSeats, seat.id]);
            } catch (err) {
                setLockError(`Seat ${seat.id} is already locked by another user`);
            }
        }
    };

    const getSeatColor = (seat) => {
        if (selectedSeats.includes(seat.id)) return 'bg-[#0033A0] text-white border-[#0033A0] shadow-lg';
        if (seat.status === 'available') return 'bg-green-500 hover:bg-green-600 text-white cursor-pointer border-green-600';
        return 'bg-gray-400 text-white cursor-not-allowed border-gray-500';
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

                {lockError && (<div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">{lockError}</div>)}

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
                                    <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200 flex-wrap">
                                        {[
                                            { color: 'bg-green-500', label: 'Available', border: 'border-green-600' },
                                            { color: 'bg-[#0033A0]', label: 'Your Selection', border: 'border-[#0033A0]' },
                                            { color: 'bg-gray-400', label: 'Booked', border: 'border-gray-500' },
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
                                                                    <button key={seat.id} onClick={() => handleSeatClick(seat)} className={`w-12 h-12 rounded-lg text-xs font-bold transition-all border-2 ${getSeatColor(seat)}`} disabled={seat.status === 'booked'}>
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
                                                                    <button key={seat.id} onClick={() => handleSeatClick(seat)} className={`w-12 h-12 rounded-lg text-xs font-bold transition-all border-2 ${getSeatColor(seat)}`} disabled={seat.status === 'booked'}>
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
                                        {selectedSeats.map((seatId) => (<div key={seatId} className="bg-gradient-to-br from-[#0033A0] to-[#0052CC] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">{seatId}</div>))}
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
