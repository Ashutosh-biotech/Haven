import Link from "next/link";
import { HotelMap } from "../interface/hotels";
import Routes from "@/router/routes";
import { LuStar, LuMapPin } from "react-icons/lu";

export default function HotelCard({hotel}: {hotel: HotelMap}): React.ReactNode {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 hover:shadow-2xl transition-shadow duration-300 group">
            <div className="relative h-48 w-full">
                <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={hotel.thumbnailUrl}
                    alt={hotel.name}
                />
                {
                    hotel.averageRating === null ? "" : (<div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-2 py-1 rounded shadow-sm flex gap-2 items-center">
                        {hotel.averageRating} <span className="size-3 flex items-center justify-center"><LuStar className="size-3" fill={"currentColor"} /></span>
                    </span>
                    </div>)
                }

            </div>

            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
                            {hotel.brand}
                        </p>
                        <h2 className="text-xl font-bold text-slate-900 leading-tight">
                            {hotel.name}
                        </h2>
                        <p className="text-sm text-slate-500 flex items-center mt-1">
                            <span className="mr-3 size-7 flex items-center justify-center"><LuMapPin className="size-5" /></span>
                            {hotel.city}, {hotel.state}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {hotel.tags?.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-teal-100 text-teal-600 text-sm font-medium px-2 py-0.5 rounded-full border border-teal-200">
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
                        <p className="text-2xl font-black text-teal-900">
                            ₹{hotel.startingPrice}<span className="text-sm font-medium text-black">/night</span>
                        </p>
                    </div>
                    <Link href={Routes.hotel(hotel.hotelId)} className="bg-slate-900 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors duration-200 cursor-pointer text-center inline-block">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}