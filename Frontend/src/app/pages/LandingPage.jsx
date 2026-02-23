import { useState } from "react";
import { useNavigate } from "react-router";
import {
    Search,
    MapPin,
    Calendar,
    Users,
    ArrowRight,
    Plane,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback.jsx";

export function LandingPage() {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        from: "",
        to: "",
        departDate: "",
        returnDate: "",
        passengers: 1,
    });

    const popularRoutes = [
        {
            from: "Chennai",
            to: "Delhi",
            price: "₹4,299",
            image:
                "https://images.unsplash.com/photo-1618863911039-f7bb949e64d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMGFyY2hpdGVjdHVyZSUyMG1vZGVybnxlbnwxfHx8fDE3NzE4NTI5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
            from: "Mumbai",
            to: "Bangalore",
            price: "₹3,599",
            image:
                "https://images.unsplash.com/photo-1758669246636-17a5f6d972ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhaXJwb3J0JTIwdGVybWluYWwlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzE3OTA0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
            from: "Delhi",
            to: "Goa",
            price: "₹5,199",
            image:
                "https://images.unsplash.com/photo-1761662864957-09f73d280793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzcxNzUyNzMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
            from: "Bangalore",
            to: "Hyderabad",
            price: "₹2,899",
            image:
                "https://images.unsplash.com/photo-1618863911039-f7bb949e64d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMGFyY2hpdGVjdHVyZSUyMG1vZGVybnxlbnwxfHx8fDE3NzE4NTI5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        navigate("/search", { state: searchData });
    };

    return (
        <div className="bg-white">
            {/* Hero Section with Search */}
            <div className="relative min-h-screen overflow-hidden">
                {/* Background with Overlay */}
                <div className="absolute inset-0">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1627663412345-aad473f2ba39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZseWluZyUyMHNreSUyMGNsb3Vkc3xlbnwxfHx8fDE3NzE4NTI5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Aircraft in flight"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0033A0]/95 via-[#0033A0]/85 to-[#0052CC]/90" />
                </div>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                    {/* Hero Text */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20">
                            <Plane className="w-5 h-5 text-white" />
                            <span className="text-white font-medium">
                                India's Trusted Flight Booking Platform
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            Fly Anywhere,
                            <br />
                            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                Anytime
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Compare prices from multiple airlines and book
                            your perfect flight in seconds
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-sm">
                            <form onSubmit={handleSearch}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                    {/* From */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            From
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0033A0] transition-transform group-hover:scale-110" />
                                            <select
                                                value={searchData.from}
                                                onChange={(e) =>
                                                    setSearchData({
                                                        ...searchData,
                                                        from: e.target.value,
                                                    })
                                                }
                                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0033A0] focus:border-transparent transition-all hover:border-[#0033A0] text-gray-700 font-medium appearance-none bg-white cursor-pointer"
                                                required
                                            >
                                                <option value="">Select City</option>
                                                <option value="Chennai">
                                                    Chennai (MAA)
                                                </option>
                                                <option value="Delhi">
                                                    Delhi (DEL)
                                                </option>
                                                <option value="Mumbai">
                                                    Mumbai (BOM)
                                                </option>
                                                <option value="Bangalore">
                                                    Bangalore (BLR)
                                                </option>
                                                <option value="Hyderabad">
                                                    Hyderabad (HYD)
                                                </option>
                                                <option value="Kolkata">
                                                    Kolkata (CCU)
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* To */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            To
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0033A0] transition-transform group-hover:scale-110" />
                                            <select
                                                value={searchData.to}
                                                onChange={(e) =>
                                                    setSearchData({
                                                        ...searchData,
                                                        to: e.target.value,
                                                    })
                                                }
                                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0033A0] focus:border-transparent transition-all hover:border-[#0033A0] text-gray-700 font-medium appearance-none bg-white cursor-pointer"
                                                required
                                            >
                                                <option value="">Select City</option>
                                                <option value="Chennai">
                                                    Chennai (MAA)
                                                </option>
                                                <option value="Delhi">
                                                    Delhi (DEL)
                                                </option>
                                                <option value="Mumbai">
                                                    Mumbai (BOM)
                                                </option>
                                                <option value="Bangalore">
                                                    Bangalore (BLR)
                                                </option>
                                                <option value="Hyderabad">
                                                    Hyderabad (HYD)
                                                </option>
                                                <option value="Kolkata">
                                                    Kolkata (CCU)
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Departure Date */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0033A0] focus:border-transparent transition-all hover:border-[#0033A0] text-gray-700 font-medium"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Passengers */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0033A0] focus:border-transparent transition-all hover:border-[#0033A0] text-gray-700 font-medium appearance-none bg-white cursor-pointer"
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
                                    className="w-full bg-gradient-to-r from-[#0033A0] to-[#0052CC] text-white py-5 rounded-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 font-semibold text-lg group"
                                >
                                    <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <span>Search Flights</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Routes Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Popular Destinations
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover the most traveled routes at unbeatable
                            prices
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularRoutes.map((route, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                                onClick={() =>
                                    navigate("/search", {
                                        state: { from: route.from, to: route.to },
                                    })
                                }
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <ImageWithFallback
                                        src={route.image}
                                        alt={`${route.from} to ${route.to}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                                    {/* Route Info Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                                        <div className="flex items-center justify-between text-white mb-3">
                                            <span className="text-lg font-bold">
                                                {route.from}
                                            </span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            <span className="text-lg font-bold">
                                                {route.to}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-white/80 mb-1">
                                                    Starting from
                                                </p>
                                                <p className="text-2xl font-bold text-white">
                                                    {route.price}
                                                </p>
                                            </div>
                                            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                                <Plane className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0033A0] to-[#0052CC]" />
                <div className="absolute inset-0 opacity-10">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1754481387410-7c8c9350372c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGFpcnBsYW5lJTIwYWlyY3JhZnQlMjByZW5kZXJ8ZW58MXx8fHwxNzcxODUyOTg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Aircraft"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Plane className="w-16 h-16 text-white/80 mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready for Your Next Adventure?
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Book your flight now and enjoy exclusive deals,
                        instant confirmation, and 24/7 customer support
                    </p>
                    <button
                        onClick={() => navigate("/LandingPage")}
                        className="bg-white text-[#0033A0] px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transition-all inline-flex items-center gap-3"
                    >
                        <span>Start Booking</span>
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </section>
        </div>
    );
}
