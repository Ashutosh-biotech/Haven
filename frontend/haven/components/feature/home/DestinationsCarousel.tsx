"use client";

import bengaluruImage from "@/assets/images/shutterstock_154851008_20200123162547_20200123162603.png";
import chennaiImage from "@/assets/images/8988706248_ddc81393bb_b.jpg";
import coorgImage from "@/assets/images/coorg-hill-station1.jpg";
import jaipurImage from "@/assets/images/Front-facade-of-Palace-of-the-Winds-Hawa-Mahal-Jaipur-Rajasthan-India.jpg";
import udaipurImage from "@/assets/images/Pichola_Lake_in_Udaipur_TravellersofIndia.jpeg";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Routes from "@/router/routes";
import { StaticImageData } from "next/image";
import CityCard from "@/components/ui/CityCard";

type citiesType = {
    name: string;
    slug: string;
    img?: string | StaticImageData;
    url: string;
    isReadMore?: boolean;
};

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
                            <LuChevronLeft size={20} />
                        </button>

                        <button
                            onClick={() =>
                                document.getElementById("carousel")?.scrollBy({left: 300, behavior: "smooth"})
                            }
                            className="rounded-sm border border-gray-200 p-3 size-10 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none flex justify-center items-center cursor-pointer"
                            aria-label="Next cities"
                        >
                            <LuChevronRight size={20} />
                        </button>
                    </div>
                </div>
                <div
                    id="carousel"
                    className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 no-scrollbar"
                >
                    {cities.map((data) => (
                        <CityCard data={data} key={data.name}/>
                    ))}
                </div>
            </div>
        </section>
    );
};