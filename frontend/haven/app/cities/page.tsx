import { getHotels, getImage } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import Routes from "@/router/routes";

export default async function AllCitiesPage() {

    const { cities }: { cities: string[] } = await getHotels("stats", "");

    return (
        <div className="flex justify-center items-center mt-36 mb-24">
            <div className="container flex flex-col gap-10">
                <div>
                    <h1 className="text-3xl">All Cities</h1>
                    <p className="text-lg">Discover the best places to live and work</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cities.map(async (city: string) => {

                        const image = await getImage(city);

                        return (
                            <div
                                key={city}
                                className="snap-start shrink-0 w-full"
                            >
                                <Link
                                    href={Routes.city(city)}
                                    className="group relative block h-64 sm:h-80 lg:h-96 w-full rounded overflow-hidden"
                                >

                                    <span
                                        className="absolute inset-0 border-2 border-dashed border-teal-500 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                                    <div
                                        className="relative h-full flex items-end rounded overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">

                                        <div className="absolute inset-0">
                                            <Image
                                                src={image.url}
                                                alt={city}
                                                fill
                                                sizes="(max-width: 640px) 100vw,
                                                           (max-width: 1024px) 50vw,
                                                           33vw"
                                                className="object-cover group-hover:-rotate-2 transition-all duration-300"
                                            />
                                            <div
                                                className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                                        </div>

                                        <div className="relative p-4 sm:p-6 lg:p-8 text-white z-10">
                                            <h3 className="text-xl sm:text-2xl font-medium">{city}</h3>
                                            <p className="mt-2 text-md text-gray-200">
                                                Explore the Hotels and places in {city}.
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}