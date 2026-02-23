import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CreditCard, Smartphone, Building2, Lock, CheckCircle } from 'lucide-react';

export function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { flight, searchData, passengerData: statePassengerData, selectedSeats } = location.state || {};
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const [cardData, setCardData] = useState({ cardNumber: '', cardName: '', expiryDate: '', cvv: '' });
    const [upiId, setUpiId] = useState('');
    const [selectedBank, setSelectedBank] = useState('');

    const mockPassengerData = { firstName: 'John', lastName: 'Doe', gender: 'Male', age: 30, email: 'john.doe@example.com', phone: '+91 9876543210' };
    const passengerData = statePassengerData || mockPassengerData;

    if (!flight || !selectedSeats || !flight.price) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Invalid booking data</p>
                    <button onClick={() => navigate('/search')} className="text-[#0033A0] hover:underline font-medium">Go back to search</button>
                </div>
            </div>
        );
    }

    const totalAmount = flight.price + selectedSeats.length * 200;

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const bookingId = 'PNR' + Math.random().toString(36).substr(2, 9).toUpperCase();
        navigate('/confirmation', { state: { bookingId, flight, searchData, passengerData, selectedSeats, totalAmount } });
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Lock className="w-5 h-5 text-green-600" />
                                <h2 className="text-2xl font-semibold text-gray-900">Secure Payment</h2>
                            </div>

                            <div className="flex gap-2 mb-6 border-b border-gray-200">
                                <button onClick={() => setPaymentMethod('card')} className={`px-6 py-3 border-b-2 transition-colors ${paymentMethod === 'card' ? 'border-[#0033A0] text-[#0033A0] font-medium' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
                                    <div className="flex items-center gap-2"><CreditCard className="w-5 h-5" /><span>Card</span></div>
                                </button>
                                <button onClick={() => setPaymentMethod('upi')} className={`px-6 py-3 border-b-2 transition-colors ${paymentMethod === 'upi' ? 'border-[#0033A0] text-[#0033A0] font-medium' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
                                    <div className="flex items-center gap-2"><Smartphone className="w-5 h-5" /><span>UPI</span></div>
                                </button>
                                <button onClick={() => setPaymentMethod('netbanking')} className={`px-6 py-3 border-b-2 transition-colors ${paymentMethod === 'netbanking' ? 'border-[#0033A0] text-[#0033A0] font-medium' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
                                    <div className="flex items-center gap-2"><Building2 className="w-5 h-5" /><span>Net Banking</span></div>
                                </button>
                            </div>

                            <form onSubmit={handlePayment}>
                                {paymentMethod === 'card' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                                            <input type="text" value={cardData.cardNumber} onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0033A0] focus:border-transparent" placeholder="1234 5678 9012 3456" maxLength={19} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                                            <input type="text" value={cardData.cardName} onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0033A0] focus:border-transparent" placeholder="JOHN DOE" required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                                                <input type="text" value={cardData.expiryDate} onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0033A0] focus:border-transparent" placeholder="MM/YY" maxLength={5} required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                                                <input type="password" value={cardData.cvv} onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0033A0] focus:border-transparent" placeholder="123" maxLength={3} required />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'upi' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID *</label>
                                        <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0033A0] focus:border-transparent" placeholder="yourname@upi" required />
                                        <p className="mt-2 text-sm text-gray-600">Enter your UPI ID to complete the payment</p>
                                    </div>
                                )}

                                {paymentMethod === 'netbanking' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Bank *</label>
                                        <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0033A0] focus:border-transparent" required>
                                            <option value="">Choose Bank</option>
                                            <option value="sbi">State Bank of India</option>
                                            <option value="hdfc">HDFC Bank</option>
                                            <option value="icici">ICICI Bank</option>
                                            <option value="axis">Axis Bank</option>
                                            <option value="kotak">Kotak Mahindra Bank</option>
                                        </select>
                                    </div>
                                )}

                                <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-start gap-3">
                                    <Lock className="w-5 h-5 text-green-600 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-medium text-green-900">SSL Secure Payment</p>
                                        <p className="text-green-700">Your payment information is encrypted and secure</p>
                                    </div>
                                </div>

                                <button type="submit" disabled={isProcessing} className="w-full mt-6 bg-[#0033A0] text-white py-4 rounded-lg hover:bg-[#002d8f] transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2">
                                    {isProcessing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Processing Payment...</span>
                                        </>
                                    ) : (
                                        <span>Pay ₹{totalAmount.toLocaleString()}</span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-20">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Flight Details</div>
                                    <div className="font-medium text-gray-900">{flight.flightNumber}</div>
                                    <div className="text-sm text-gray-700">{flight.airline}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Route</div>
                                    <div className="font-medium text-gray-900">{flight.departure} → {flight.arrival}</div>
                                    <div className="text-sm text-gray-700">{flight.departureTime} - {flight.arrivalTime}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Passenger</div>
                                    <div className="font-medium text-gray-900">{passengerData.firstName} {passengerData.lastName}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Seats</div>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedSeats.map((seat) => (
                                            <span key={seat} className="bg-[#0033A0] text-white px-2 py-1 rounded text-xs">{seat}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-sm"><span className="text-gray-600">Base Fare</span><span className="font-medium text-gray-900">₹{(flight.price * 0.75).toFixed(0)}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-gray-600">Taxes & Fees</span><span className="font-medium text-gray-900">₹{(flight.price * 0.25).toFixed(0)}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-gray-600">Seat Charges</span><span className="font-medium text-gray-900">₹{(selectedSeats.length * 200).toLocaleString()}</span></div>
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold text-gray-900">Total Amount</span>
                                    <span className="text-2xl font-semibold text-[#0033A0]">₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
