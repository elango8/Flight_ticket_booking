import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, Chrome, Facebook } from 'lucide-react';

export function LoginPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/my-trips');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-gray-600">
                            {isLogin ? 'Login to your account to continue' : 'Sign up to start booking flights'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0033A0] focus:border-transparent" placeholder="John Doe" required={!isLogin} />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0033A0] focus:border-transparent" placeholder="john@example.com" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0033A0] focus:border-transparent" placeholder="••••••••" required />
                            </div>
                        </div>
                        {isLogin && (
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded text-[#0033A0] focus:ring-[#0033A0]" />
                                    <span className="text-gray-600">Remember me</span>
                                </label>
                                <button type="button" className="text-[#0033A0] hover:underline">Forgot password?</button>
                            </div>
                        )}
                        <button type="submit" className="w-full bg-[#0033A0] text-white py-3 rounded-lg hover:bg-[#002d8f] transition-colors">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">Or continue with</span></div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <Chrome className="w-5 h-5 text-gray-600" />
                                <span className="text-sm text-gray-700">Google</span>
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <Facebook className="w-5 h-5 text-blue-600" />
                                <span className="text-sm text-gray-700">Facebook</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm">
                        <span className="text-gray-600">{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>{' '}
                        <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-[#0033A0] font-medium hover:underline">
                            {isLogin ? 'Sign up' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
