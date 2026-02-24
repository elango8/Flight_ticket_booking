import { useState } from "react";
import { useNavigate } from "react-router";
import {
    Search,
    Calendar,
    Users,
    ArrowRight,
    Plane,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback.jsx";
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

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchData.from || !searchData.to || !searchData.departDate) return;
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
                        <p className="text-xl md:text-1xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                            Compare prices from multiple airlines and book
                            your perfect flight in seconds
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-sm">
                            <form onSubmit={handleSearch}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                    {/* From — Searchable Dropdown */}
                                    <AirportDropdown
                                        label="From"
                                        value={searchData.from}
                                        onChange={(city) =>
                                            setSearchData({ ...searchData, from: city })
                                        }
                                        placeholder="Search departure city..."
                                    />

                                    {/* To — Searchable Dropdown */}
                                    <AirportDropdown
                                        label="To"
                                        value={searchData.to}
                                        onChange={(city) =>
                                            setSearchData({ ...searchData, to: city })
                                        }
                                        placeholder="Search arrival city..."
                                    />

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
        </div>
    );
}
