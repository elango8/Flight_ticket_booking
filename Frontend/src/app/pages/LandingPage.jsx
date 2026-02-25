import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
    Search,
    Users,
    ArrowRight,
    Plane,
    Shield,
    Clock,
    Headphones,
    Star,
    MapPin,
    TrendingUp,
    CreditCard,
    Globe,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { AirportCombobox } from "../components/AirportCombobox.jsx";
import { DatePickerPopover } from "../components/DatePickerPopover.jsx";
import { PassengerSelector } from "../components/PassengerSelector.jsx";

export function LandingPage() {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        from: "",
        to: "",
        departDate: "",
        returnDate: "",
        passengers: 1,
    });
    const [activeStatIndex, setActiveStatIndex] = useState(0);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchData.from || !searchData.to || !searchData.departDate) return;
        navigate("/search", { state: searchData });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStatIndex((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const popularRoutes = [
        { from: "Delhi", to: "Mumbai", price: "₹3,499", image: "🏙️", tag: "Most Popular" },
        { from: "Bangalore", to: "Goa", price: "₹2,899", image: "🏖️", tag: "Trending" },
        { from: "Chennai", to: "Kolkata", price: "₹4,199", image: "🌆", tag: "Best Value" },
        { from: "Hyderabad", to: "Delhi", price: "₹3,799", image: "🕌", tag: "Hot Deal" },
    ];

    const features = [
        { icon: Shield, title: "Secure Booking", description: "Bank-grade encryption protects your payments and data", color: "from-emerald-500 to-teal-600" },
        { icon: CreditCard, title: "Best Prices", description: "Compare fares across 50+ airlines for the lowest prices", color: "from-violet-500 to-purple-600" },
        { icon: Headphones, title: "24/7 Support", description: "Our dedicated team is always here to help you", color: "from-amber-500 to-orange-600" },
        { icon: Clock, title: "Instant Confirmation", description: "Get your e-ticket and boarding pass instantly", color: "from-sky-500 to-blue-600" },
    ];

    const stats = [
        { value: "10M+", label: "Happy Travelers", icon: Users },
        { value: "500+", label: "Routes Covered", icon: Globe },
        { value: "50+", label: "Partner Airlines", icon: Plane },
        { value: "4.8★", label: "Customer Rating", icon: Star },
    ];

    return (
        <div className="bg-white overflow-hidden">
            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <div className="relative min-h-screen overflow-hidden">
                {/* Layered animated background */}
                <div className="absolute inset-0">
                    {/* Base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#000d2b] via-[#001f6d] to-[#003db8]" />

                    {/* Animated mesh overlay */}
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
                            backgroundSize: "40px 40px",
                        }}
                    />

                    {/* Large animated gradient blobs */}
                    <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/25 to-cyan-400/15 rounded-full blur-3xl" style={{ animation: "heroFloat 8s ease-in-out infinite" }} />
                    <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-gradient-to-bl from-purple-600/20 to-indigo-500/15 rounded-full blur-3xl" style={{ animation: "heroFloat 10s ease-in-out infinite reverse" }} />
                    <div className="absolute -bottom-40 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/15 to-blue-400/10 rounded-full blur-3xl" style={{ animation: "heroFloat 12s ease-in-out infinite", animationDelay: "2s" }} />

                    {/* Animated plane trajectory SVG */}
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.06 }}>
                        <path d="M-50,300 Q200,100 500,250 T1000,150 T1500,300" fill="none" stroke="white" strokeWidth="2" strokeDasharray="12 8" className="hero-path-1" />
                        <path d="M-100,500 Q300,300 600,450 T1200,350 T1800,500" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="8 6" className="hero-path-2" />
                    </svg>

                    {/* Floating cloud/particle elements */}
                    <div className="absolute top-[15%] left-[10%] w-32 h-8 bg-white/[0.03] rounded-full blur-sm" style={{ animation: "cloudDrift 20s linear infinite" }} />
                    <div className="absolute top-[35%] left-[60%] w-48 h-10 bg-white/[0.02] rounded-full blur-md" style={{ animation: "cloudDrift 25s linear infinite", animationDelay: "5s" }} />
                    <div className="absolute top-[65%] left-[30%] w-40 h-8 bg-white/[0.03] rounded-full blur-sm" style={{ animation: "cloudDrift 22s linear infinite", animationDelay: "10s" }} />
                </div>

                {/* Animated plane icon flying across */}
                <div className="absolute hero-flying-plane" style={{ animation: "planeFly 15s linear infinite" }}>
                    <Plane className="w-6 h-6 text-white/20 rotate-45" />
                </div>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                    {/* Two-column hero layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left — Text */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-xl px-5 py-2.5 rounded-full mb-8 border border-white/[0.12]">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="text-white/80 font-medium text-sm tracking-wide">
                                    India's Most Trusted Platform
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                                Your Journey
                                <br />
                                <span className="hero-gradient-text">Starts Here</span>
                            </h1>

                            <p className="text-lg md:text-xl text-white/60 max-w-lg leading-relaxed mb-10">
                                Compare <span className="text-white/90 font-semibold">50+ airlines</span>, find the best deals, and book your perfect flight — all in seconds.
                            </p>

                            {/* Mini stats row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {stats.map((stat, i) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div
                                            key={i}
                                            className={`flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-md rounded-xl px-4 py-3 border transition-all duration-500 ${activeStatIndex === i
                                                ? "border-white/20 bg-white/[0.1] scale-[1.03]"
                                                : "border-white/[0.06]"
                                                }`}
                                        >
                                            <Icon className="w-4 h-4 text-cyan-300/80 flex-shrink-0" />
                                            <div>
                                                <div className="text-white font-bold text-sm leading-none">{stat.value}</div>
                                                <div className="text-white/40 text-[10px] mt-0.5">{stat.label}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right — Search Card (Glassmorphism) */}
                        <div className="relative">
                            {/* Glow behind the card */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 rounded-[2rem] blur-2xl" />

                            <div className="relative bg-white/[0.07] backdrop-blur-2xl rounded-2xl border border-white/[0.12] p-7 md:p-8 shadow-2xl shadow-black/20">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                                        <Search className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-white font-bold text-lg">Search Flights</h2>
                                        <p className="text-white/40 text-xs">Find the best deals instantly</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSearch}>
                                    <div className="space-y-4 mb-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <AirportCombobox
                                                label="From"
                                                value={searchData.from}
                                                onChange={(city) => setSearchData({ ...searchData, from: city })}
                                                placeholder="Departure city..."
                                                variant="glass"
                                            />
                                            <AirportCombobox
                                                label="To"
                                                value={searchData.to}
                                                onChange={(city) => setSearchData({ ...searchData, to: city })}
                                                placeholder="Arrival city..."
                                                variant="glass"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <DatePickerPopover
                                                label="Departure"
                                                value={searchData.departDate}
                                                onChange={(date) => setSearchData({ ...searchData, departDate: date })}
                                                variant="glass"
                                            />
                                            <PassengerSelector
                                                label="Passengers"
                                                value={searchData.passengers}
                                                onChange={(count) => setSearchData({ ...searchData, passengers: count })}
                                                variant="glass"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-base group hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span>Search Flights</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════ FEATURES SECTION ═══════════════ */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#0033A0]/5 text-[#0033A0] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <Star className="w-4 h-4" />
                            Why Choose SkyBook
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Travel with <span className="text-[#0033A0]">Confidence</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            We make booking flights simple, secure, and affordable
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div key={i} className="group relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* Hero Animations */}
            <style>{`
                .hero-gradient-text {
                    background: linear-gradient(135deg, #67e8f9, #a5b4fc, #c084fc, #67e8f9);
                    background-size: 300% 300%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: gradientShift 6s ease-in-out infinite;
                }
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes heroFloat {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -20px) scale(1.05); }
                    66% { transform: translate(-20px, 15px) scale(0.95); }
                }
                @keyframes cloudDrift {
                    0% { transform: translateX(-100px); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateX(calc(100vw + 100px)); opacity: 0; }
                }
                @keyframes planeFly {
                    0% { left: -50px; top: 30%; transform: rotate(-5deg); opacity: 0; }
                    5% { opacity: 1; }
                    50% { top: 20%; }
                    95% { opacity: 1; }
                    100% { left: calc(100% + 50px); top: 35%; transform: rotate(5deg); opacity: 0; }
                }
                .hero-path-1 {
                    animation: dashMove 30s linear infinite;
                }
                .hero-path-2 {
                    animation: dashMove 25s linear infinite reverse;
                }
                @keyframes dashMove {
                    0% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -200; }
                }
            `}</style>
        </div>
    );
}
