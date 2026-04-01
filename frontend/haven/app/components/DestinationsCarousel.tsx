"use client";

import Image from "next/image";
import bengaluruImage from "../assets/images/shutterstock_154851008_20200123162547_20200123162603.png";
import chennaiImage from "../assets/images/8988706248_ddc81393bb_b.jpg";
import coorgImage from "../assets/images/coorg-hill-station1.jpg";
import jaipurImage from "../assets/images/Front-facade-of-Palace-of-the-Winds-Hawa-Mahal-Jaipur-Rajasthan-India.jpg";
import udaipurImage from "../assets/images/Pichola_Lake_in_Udaipur_TravellersofIndia.jpeg";
import Images from "@/components/Image";
import { citiesType } from "./type";
import Link from "next/link";
import Routes from "@/router/routes";

const cities: citiesType[] = [
    {name: "Bengaluru", slug: "bengaluru", img: bengaluruImage, url: Routes.city("bengaluru")},
    {name: "Chennai", slug: "chennai", img: chennaiImage, url: Routes.city("chennai")},
    {name: "Coorg", slug: "coorg", img: coorgImage, url: Routes.city("coorg")},
    {name: "Jaipur", slug: "jaipur", img: jaipurImage, url: Routes.city("jaipur")},
    {name: "Udaipur", slug: "udaipur", img: udaipurImage, url: Routes.city("udaipur")},
    {name: "View All Cities", slug: "view-all", url: Routes.cities(), isReadMore: true},
];

export const DestinationsCarousel = (): React.ReactNode => {
    return (
        <section className="py-12 flex justify-center items-center bg-white">
            <div className="container flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">
                        Cities We Incorporate
                    </span>
                    <div className="inline-flex gap-4">
                        <button
                            onClick={() =>
                                document.getElementById("carousel")?.scrollBy({left: -300, behavior: "smooth"})
                            }
                            className="rounded-sm border border-gray-200 p-3 size-10 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none flex justify-center items-center cursor-pointer"
                            aria-label="Previous cities"
                        >
                            {Images.CARET_LEFT}
                        </button>

                        <button
                            onClick={() =>
                                document.getElementById("carousel")?.scrollBy({left: 300, behavior: "smooth"})
                            }
                            className="rounded-sm border border-gray-200 p-3 size-10 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none flex justify-center items-center cursor-pointer"
                            aria-label="Next cities"
                        >
                            {Images.CARET_RIGHT}
                        </button>
                    </div>
                </div>
                <div
                    id="carousel"
                    className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 no-scrollbar"
                >
                    {cities.map((data) => (
                        <div
                            key={data.slug}
                            className="snap-start shrink-0 w-full sm:w-1/2 lg:w-1/3"
                        >
                            <Link
                                href={data.url}
                                className="group relative block h-64 sm:h-80 lg:h-96 w-full rounded overflow-hidden"
                            >

                                <span
                                    className="absolute inset-0 border-2 border-dashed border-teal-500 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"/>

                                {data.isReadMore ? (
                                    <div
                                        className="relative h-full flex flex-col items-center justify-center bg-teal-50 text-center p-6 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1 hover:shadow-xl">
                                        <h3 className="text-xl font-bold text-gray-900">{data.name}</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Explore all our featured cities and destinations
                                        </p>
                                        <button className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-sm">
                                            Discover More
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="relative h-full flex items-end rounded overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:-rotate-2 group-hover:shadow-2xl">

                                        {data.img && (
                                            <div className="absolute inset-0">
                                                <Image
                                                    src={data.img}
                                                    alt={data.name}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw,
                                                           (max-width: 1024px) 50vw,
                                                           33vw"
                                                    className="object-cover"
                                                />
                                                <div
                                                    className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"/>
                                            </div>
                                        )}

                                        <div className="relative p-4 sm:p-6 lg:p-8 text-white z-10">
                                            <h3 className="text-xl sm:text-2xl font-medium">{data.name}</h3>
                                            <p className="mt-2 text-md text-gray-200">
                                                Experience the vibrant culture and iconic landmarks of {data.name}.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};