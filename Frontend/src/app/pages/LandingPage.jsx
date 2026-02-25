import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
    Search,
    Calendar,
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
import { AirportDropdown } from "../components/AirportDropdown.jsx";

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

    // Auto-cycle stats for subtle animation
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
        {
            icon: Shield,
            title: "Secure Booking",
            description: "Your payments and personal data are protected with bank-grade encryption",
            color: "from-emerald-500 to-teal-600",
            bg: "bg-emerald-50",
        },
        {
            icon: CreditCard,
            title: "Best Prices",
            description: "Compare fares across multiple airlines to find the lowest prices guaranteed",
            color: "from-violet-500 to-purple-600",
            bg: "bg-violet-50",
        },
        {
            icon: Headphones,
            title: "24/7 Support",
            description: "Our dedicated customer support team is always here to help you",
            color: "from-amber-500 to-orange-600",
            bg: "bg-amber-50",
        },
        {
            icon: Clock,
            title: "Instant Confirmation",
            description: "Get your e-ticket and boarding pass instantly after booking",
            color: "from-sky-500 to-blue-600",
            bg: "bg-sky-50",
        },
    ];

    const stats = [
        { value: "10M+", label: "Happy Travelers", icon: Users },
        { value: "500+", label: "Routes Covered", icon: Globe },
        { value: "50+", label: "Partner Airlines", icon: Plane },
        { value: "4.8★", label: "Customer Rating", icon: Star },
    ];

    return (
        <div className="bg-white overflow-hidden">
            {/* ═══════════════════════════════════════════ */}
            {/*  HERO SECTION                              */}
            {/* ═══════════════════════════════════════════ */}
            <div className="relative min-h-screen overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#001a5c] via-[#0033A0] to-[#0066e0]">
                    {/* Animated grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />
                    {/* Floating orbs */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                    <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
                </div>

                {/* Floating plane decorations */}
                <div className="absolute top-32 right-20 text-white/10 animate-bounce" style={{ animationDuration: "4s" }}>
                    <Plane className="w-16 h-16 rotate-45" />
                </div>
                <div className="absolute bottom-40 left-16 text-white/10 animate-bounce" style={{ animationDuration: "5s", animationDelay: "1s" }}>
                    <Plane className="w-12 h-12 -rotate-12" />
                </div>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
                    {/* Hero Text */}
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full mb-8 border border-white/20 shadow-lg shadow-blue-900/20">
                            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                            <span className="text-white/90 font-medium tracking-wide text-sm">
                                India's Most Trusted Flight Booking Platform
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                            Fly Anywhere,
                            <br />
                            <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 bg-clip-text text-transparent">
                                Anytime
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                            Compare prices from <span className="text-white font-semibold">50+ airlines</span> and book
                            your perfect flight in seconds. Fast, secure, and hassle-free.
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-900/30 p-8 md:p-10 border border-white/50">
                            <form onSubmit={handleSearch}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                                    {/* From */}
                                    <AirportDropdown
                                        label="From"
                                        value={searchData.from}
                                        onChange={(city) =>
                                            setSearchData({ ...searchData, from: city })
                                        }
                                        placeholder="Departure city..."
                                    />

                                    {/* To */}
                                    <AirportDropdown
                                        label="To"
                                        value={searchData.to}
                                        onChange={(city) =>
                                            setSearchData({ ...searchData, to: city })
                                        }
                                        placeholder="Arrival city..."
                                    />

                                    {/* Departure Date */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                                            Departure
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0033A0] transition-transform group-hover:scale-110" />
                                            <input
                                                type="date"
                                                value={searchData.departDate}
                                                onChange={(e) =>
                                                    setSearchData({
                                                        ...searchData,
                                                        departDate: e.target.value,
                                                    })
                                                }
                                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0033A0] focus:border-transparent transition-all hover:border-[#0033A0]/50 text-gray-700 font-medium bg-gray-50/50"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Passengers */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                                            Passengers
                                        </label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0033A0] transition-transform group-hover:scale-110" />
                                            <select
                                                value={searchData.passengers}
                                                onChange={(e) =>
                                                    setSearchData({
                                                        ...searchData,
                                                        passengers: Number(e.target.value),
                                                    })
                                                }
                                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0033A0] focus:border-transparent transition-all hover:border-[#0033A0]/50 text-gray-700 font-medium appearance-none bg-gray-50/50 cursor-pointer"
                                            >
                                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                                    <option key={num} value={num}>
                                                        {num}{" "}
                                                        {num === 1
                                                            ? "Passenger"
                                                            : "Passengers"}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#0033A0] via-[#0044cc] to-[#0052CC] text-white py-5 rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg group hover:scale-[1.01] active:scale-[0.99]"
                                >
                                    <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <span>Search Flights</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Trust Indicators - mini stats row */}
                    <div className="max-w-4xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={i}
                                    className={`flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-4 border transition-all duration-500 ${activeStatIndex === i
                                            ? "border-white/30 bg-white/15 scale-105 shadow-lg shadow-blue-900/30"
                                            : "border-white/10"
                                        }`}
                                >
                                    <Icon className="w-5 h-5 text-cyan-300 flex-shrink-0" />
                                    <div>
                                        <div className="text-white font-bold text-lg leading-none">{stat.value}</div>
                                        <div className="text-white/60 text-xs mt-1">{stat.label}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/*  FEATURES SECTION                          */}
            {/* ═══════════════════════════════════════════ */}
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
                            We make booking flights simple, secure, and affordable for millions of travelers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={i}
                                    className="group relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/*  POPULAR ROUTES SECTION                    */}
            {/* ═══════════════════════════════════════════ */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <TrendingUp className="w-4 h-4" />
                                Trending Now
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                Popular <span className="text-[#0033A0]">Routes</span>
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Discover the most booked flights at unbeatable prices
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/search")}
                            className="hidden md:flex items-center gap-2 text-[#0033A0] font-semibold hover:gap-3 transition-all"
                        >
                            View All Routes <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularRoutes.map((route, i) => (
                            <div
                                key={i}
                                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                onClick={() =>
                                    navigate("/search", {
                                        state: { from: route.from, to: route.to, departDate: "", passengers: 1 },
                                    })
                                }
                            >
                                {/* Tag */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="bg-white/90 backdrop-blur-sm text-xs font-bold text-[#0033A0] px-3 py-1.5 rounded-full shadow-sm border border-blue-100">
                                        {route.tag}
                                    </span>
                                </div>

                                {/* Emoji hero */}
                                <div className="h-36 bg-gradient-to-br from-[#0033A0]/5 via-[#0052CC]/5 to-[#0066e0]/10 flex items-center justify-center relative overflow-hidden">
                                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                                        {route.image}
                                    </span>
                                    {/* Decorative lines */}
                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0033A0]/20 to-transparent" />
                                </div>

                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="font-bold text-gray-900">{route.from}</span>
                                        <div className="flex-1 flex items-center gap-1">
                                            <div className="flex-1 h-px bg-gray-200" />
                                            <Plane className="w-4 h-4 text-[#0033A0] rotate-90" />
                                            <div className="flex-1 h-px bg-gray-200" />
                                        </div>
                                        <span className="font-bold text-gray-900">{route.to}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-500">Starting from</span>
                                            <div className="text-xl font-bold text-[#0033A0]">{route.price}</div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-[#0033A0]/5 flex items-center justify-center group-hover:bg-[#0033A0] transition-colors duration-300">
                                            <ArrowRight className="w-5 h-5 text-[#0033A0] group-hover:text-white transition-colors duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile view all button */}
                    <div className="mt-8 text-center md:hidden">
                        <button
                            onClick={() => navigate("/search")}
                            className="inline-flex items-center gap-2 text-[#0033A0] font-semibold"
                        >
                            View All Routes <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/*  HOW IT WORKS SECTION                      */}
            {/* ═══════════════════════════════════════════ */}
            <section className="py-24 bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0033A0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#0033A0]/5 text-[#0033A0] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <Sparkles className="w-4 h-4" />
                            Simple & Easy
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Book in <span className="text-[#0033A0]">3 Simple Steps</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            From search to boarding pass — it's faster than you think
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connector line (desktop) */}
                        <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-[#0033A0]/20 via-[#0033A0]/40 to-[#0033A0]/20" />

                        {[
                            {
                                step: "01",
                                title: "Search & Compare",
                                desc: "Enter your destinations and dates to discover flights from 50+ airlines at the best prices",
                                icon: Search,
                                color: "from-[#0033A0] to-[#0052CC]"
                            },
                            {
                                step: "02",
                                title: "Choose & Customize",
                                desc: "Pick your perfect flight, select seats, and add any extras you need for your journey",
                                icon: MapPin,
                                color: "from-[#0044CC] to-[#0066e0]"
                            },
                            {
                                step: "03",
                                title: "Pay & Fly",
                                desc: "Complete secure payment and get your e-ticket instantly. You're all set to fly!",
                                icon: Plane,
                                color: "from-[#0052CC] to-[#3B82F6]"
                            },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="text-center relative">
                                    <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${item.color} mx-auto mb-6 flex items-center justify-center shadow-xl shadow-blue-900/15 group hover:scale-105 transition-transform duration-300`}>
                                        <Icon className="w-12 h-12 text-white" />
                                    </div>
                                    <div className="text-xs font-bold text-[#0033A0]/50 mb-2 tracking-[0.2em] uppercase">
                                        Step {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/*  CTA SECTION                               */}
            {/* ═══════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative bg-gradient-to-br from-[#0033A0] via-[#0044cc] to-[#0066e0] rounded-3xl overflow-hidden p-12 md:p-16">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                        <div className="absolute top-10 right-20 text-white/10">
                            <Plane className="w-20 h-20 rotate-45" />
                        </div>

                        <div className="relative text-center">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                                Ready for Your Next
                                <br />
                                <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                                    Adventure?
                                </span>
                            </h2>
                            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                                Join millions of happy travelers who trust SkyBook for their flights.
                                Start exploring the best deals today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                    className="bg-white text-[#0033A0] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                                >
                                    <Search className="w-5 h-5" />
                                    Search Flights Now
                                </button>
                                <button
                                    onClick={() => navigate("/my-trips")}
                                    className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2"
                                >
                                    <Plane className="w-5 h-5" />
                                    View My Trips
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
