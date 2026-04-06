import Link from "next/link";
import { type HotelMap } from "../../interface/hotels";
import { getHotels } from "@/lib";
import { LuBuilding2, LuArrowRight } from "react-icons/lu";
import HotelCard from "@/components/ui/HotelCard";
import Routes from "@/router/routes";

export async function FeaturedHotels(): Promise<React.ReactNode> {
    const hotelsData = await getHotels("", "limit=5");
    const results: HotelMap[] = hotelsData?.results || [];

    return (
        <section className="mb-10">
            <div className="container mx-auto flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">Featured Hotels</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {/* Hotel Cards */}
                    {results.map((hotel: HotelMap): React.ReactNode => (
                        <HotelCard key={hotel.hotelId} hotel={hotel} />
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

                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white">
                                <LuBuilding2 size={36} />
                            </div>

                            <h3 className="mb-3 text-2xl font-light tracking-widest text-white uppercase">
                                Experience <span className="font-bold">More</span>
                            </h3>

                            <p className="mb-8 text-sm leading-relaxed text-slate-300">
                                Beyond this selection lies a curated world of Haven properties designed for the modern traveler.
                            </p>

                            <Link href={Routes.hotels()} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-teal-500 hover:text-white group-hover:px-8">
                                Explore All Properties
                                <LuArrowRight className="size-5" />
                            </Link>
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