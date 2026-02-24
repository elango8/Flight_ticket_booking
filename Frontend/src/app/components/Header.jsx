import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Plane, User, LogOut } from 'lucide-react';
import { getToken, removeToken, getMe } from '../utils/api.js';

export function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            const token = getToken();
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const userData = await getMe();
                setUser(userData);
            } catch {
                // Token invalid/expired — clear it
                removeToken();
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const handleLogout = () => {
        removeToken();
        setUser(null);
        navigate('/');
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky mt-0 top-0 z-50 shadow-sm">
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

                        {loading ? (
                            <div className="w-24 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-[#0033A0]/5 px-3 py-2 rounded-lg">
                                    <div className="w-8 h-8 bg-[#0033A0] rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <span className="text-sm font-medium text-gray-800 hidden sm:inline">
                                        {user.name}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors px-2 py-2 rounded-lg hover:bg-red-50"
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-1 bg-[#0033A0] text-white px-4 py-2 rounded-lg hover:bg-[#002d8f] transition-colors">
                                <User className="w-3 h-3" />
                                <span>Login / Signup</span>
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
