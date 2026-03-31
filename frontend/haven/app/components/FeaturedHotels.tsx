import Link from "next/link";
import { type HotelMap } from "./type";
import { hotels } from "../api/home/routes";
import Images from "@/components/Image";

export async function FeaturedHotels() {
    const hotelsData = await hotels();
    const results = hotelsData?.results || [];

    return (
        <section className="mb-10">
            <div className="container mx-auto flex flex-col gap-4">
                <h2>Featured Hotels</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {/* Hotel Cards */}
                    {results.map((hotel: HotelMap) => (
                        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 hover:shadow-2xl transition-shadow duration-300 group" key={hotel.hotelId}>
                            <div className="relative h-48 w-full">
                                <img
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    src={hotel.thumbnailUrl}
                                    alt={hotel.name}
                                />
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-2 py-1 rounded shadow-sm flex gap-2 items-center">
                                        {hotel.averageRating} <span className="size-3">{Images.STAR}</span>
                                    </span>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                                            {hotel.brand}
                                        </p>
                                        <h2 className="text-xl font-bold text-slate-900 leading-tight">
                                            {hotel.name}
                                        </h2>
                                        <p className="text-sm text-slate-500 flex items-center mt-1">
                                            <span className="mr-3 size-7">{Images.MAP_LOCATION}</span>
                                            {hotel.city}, {hotel.state}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    {hotel.tags?.slice(0, 3).map((tag, index) => (
                                        <span key={index} className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                                    {hotel.description}
                                </p>

                                <hr className="my-4 border-slate-100" />

                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-slate-400">Starting from</p>
                                        <p className="text-2xl font-black text-slate-900">
                                            ₹{hotel.startingPrice}<span className="text-sm font-medium text-slate-500">/night</span>
                                        </p>
                                    </div>
                                    <Link href={`/hotels/${hotel.hotelId}`} className="bg-slate-900 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors duration-200 cursor-pointer text-center inline-block">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="group relative max-w-md mx-auto h-[500px] w-full overflow-hidden rounded-2xl bg-slate-900 shadow-xl">

                        <div className="absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-110">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                                alt="Haven Context"
                                className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                        </div>

                        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">

                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                                {Images.HOTEL}
                            </div>

                            <h3 className="mb-3 text-2xl font-light tracking-widest text-white uppercase">
                                Experience <span className="font-bold">More</span>
                            </h3>

                            <p className="mb-8 text-sm leading-relaxed text-slate-300">
                                Beyond this selection lies a curated world of Haven properties designed for the modern traveler.
                            </p>

                            <a href="/explore" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-blue-500 hover:text-white group-hover:px-8">
                                Explore All Properties
                                <span className="size-5">{Images.ARROW_RIGHT_LONG}</span>
                            </a>
                        </div>

                        <div className="absolute bottom-0 w-full bg-white/5 py-4 backdrop-blur-sm text-center">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                The Haven Collection • 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}