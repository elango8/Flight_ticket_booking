import { Link } from 'react-router';
import { Plane, User } from 'lucide-react';

export function Header() {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="bg-[#0033A0] rounded-lg p-2">
                            <Plane className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-semibold text-[#0033A0]">SkyBook</span>
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link to="/my-trips" className="text-gray-700 hover:text-[#0033A0] transition-colors">
                            My Trips
                        </Link>
                        <Link to="/search" className="text-gray-700 hover:text-[#0033A0] transition-colors">
                            Support
                        </Link>
                        <Link to="/login" className="flex items-center gap-2 bg-[#0033A0] text-white px-4 py-2 rounded-lg hover:bg-[#002d8f] transition-colors">
                            <User className="w-4 h-4" />
                            <span>Login / Signup</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
