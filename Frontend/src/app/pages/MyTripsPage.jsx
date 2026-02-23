import { useNavigate } from 'react-router';
import { Plane, Calendar, MapPin, Download, X, CheckCircle } from 'lucide-react';

export function MyTripsPage() {
    const navigate = useNavigate();

    const mockBookings = [
        {
            id: '1', pnr: 'PNR2H4K9L3', flightNumber: '6E-2043', airline: 'IndiGo',
            from: 'Chennai', to: 'Delhi', date: '2026-03-15', departureTime: '06:30',
            arrivalTime: '09:15', seats: ['12A', '12B'], status: 'confirmed', price: 8598,
        },
        {
            id: '2', pnr: 'PNRX7Y2M9', flightNumber: 'AI-543', airline: 'Air India',
            from: 'Mumbai', to: 'Bangalore', date: '2026-04-20', departureTime: '14:00',
            arrivalTime: '15:30', seats: ['8C'], status: 'confirmed', price: 5699,
        },
        {
            id: '3', pnr: 'PNRK3L8P4', flightNumber: 'UK-821', airline: 'Vistara',
            from: 'Delhi', to: 'Mumbai', date: '2026-02-10', departureTime: '10:15',
            arrivalTime: '12:30', seats: ['15D'], status: 'completed', price: 6499,
        },
        {
            id: '4', pnr: 'PNRA9B5N2', flightNumber: 'SG-8156', airline: 'SpiceJet',
            from: 'Bangalore', to: 'Goa', date: '2026-01-25', departureTime: '16:30',
            arrivalTime: '17:45', seats: ['20F'], status: 'cancelled', price: 3899,
        },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'confirmed':
                return (
                    <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" /><span>Confirmed</span>
                    </div>
                );
            case 'completed':
                return (
                    <div className="flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" /><span>Completed</span>
                    </div>
                );
            case 'cancelled':
                return (
                    <div className="flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-sm font-medium">
                        <X className="w-4 h-4" /><span>Cancelled</span>
                    </div>
                );
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">My Trips</h1>
                    <p className="text-gray-600">View and manage all your flight bookings</p>
                </div>

                <div className="space-y-4">
                    {mockBookings.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                            <p className="text-gray-600 mb-6">Start planning your next trip!</p>
                            <button onClick={() => navigate('/')} className="bg-gradient-to-r from-[#0033A0] to-[#0052CC] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium">Search Flights</button>
                        </div>
                    ) : (
                        mockBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0033A0] to-[#0052CC] flex items-center justify-center text-white font-bold text-lg">{booking.airline.substring(0, 2).toUpperCase()}</div>
                                            <div>
                                                <div className="text-lg font-semibold text-gray-900">{booking.airline}</div>
                                                <div className="text-sm text-gray-600">{booking.flightNumber}</div>
                                            </div>
                                        </div>
                                        {getStatusBadge(booking.status)}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <MapPin className="w-4 h-4 text-[#0033A0]" />
                                                <span className="text-sm font-medium text-gray-600">Route</span>
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900 mb-1">{booking.from} → {booking.to}</div>
                                            <div className="text-sm text-gray-600">{booking.departureTime} - {booking.arrivalTime}</div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Calendar className="w-4 h-4 text-[#0033A0]" />
                                                <span className="text-sm font-medium text-gray-600">Travel Date</span>
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900">
                                                {new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-600 mb-2">PNR Number</div>
                                            <div className="text-lg font-semibold text-gray-900 mb-2">{booking.pnr}</div>
                                            <div className="flex flex-wrap gap-2">
                                                {booking.seats.map((seat) => (
                                                    <span key={seat} className="bg-[#E8F1FF] text-[#0033A0] px-3 py-1 rounded-lg text-sm font-medium">{seat}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div>
                                            <span className="text-sm text-gray-600">Total Fare: </span>
                                            <span className="text-xl font-bold text-[#0033A0]">₹{booking.price.toLocaleString()}</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                                <Download className="w-4 h-4" /><span className="text-sm font-medium">Download</span>
                                            </button>
                                            {booking.status === 'confirmed' && (
                                                <button className="flex items-center gap-2 px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                                                    <X className="w-4 h-4" /><span className="text-sm font-medium">Cancel</span>
                                                </button>
                                            )}
                                            {booking.status === 'completed' && (
                                                <button onClick={() => navigate('/')} className="px-4 py-2 bg-gradient-to-r from-[#0033A0] to-[#0052CC] text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium">Book Again</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-8 bg-gradient-to-r from-[#E8F1FF] to-[#D1E7FF] rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                    <p className="text-gray-700 mb-4">Have questions about your booking? Our customer support team is here to help you 24/7.</p>
                    <button className="bg-[#0033A0] text-white px-6 py-2.5 rounded-lg hover:bg-[#002d8f] transition-colors font-medium">Contact Support</button>
                </div>
            </div>
        </div>
    );
}
