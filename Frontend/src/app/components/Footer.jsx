import { Link } from 'react-router';

export function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">About SkyBook</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-600 hover:text-[#0033A0] transition-colors">About Us</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-[#0033A0] transition-colors">Careers</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-[#0033A0] transition-colors">Press</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-600 hover:text-[#0033A0] transition-colors">Help Center</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-[#0033A0] transition-colors">Contact Us</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-[#0033A0] transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-600 hover:text-[#0033A0] transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-[#0033A0] transition-colors">Terms of Service</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-[#0033A0] transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-600 hover:text-[#0033A0] transition-colors">Facebook</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-[#0033A0] transition-colors">Twitter</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-[#0033A0] transition-colors">Instagram</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-300 text-center text-gray-600">
                    <p>&copy; 2026 SkyBook. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
