import Routes from "@/lib/router/routes";
import CityCard from "@/components/feature/CityCard";
import { getImage } from "@/lib";
import React from "react";
import { ImageResult } from "@/lib/interface/ImageResult";
import { CarouselControls } from "@/components/ui/home/destinationCarousel/CarouselControl";

type citiesType = {
    name: string;
    slug: string;
    img?: ImageResult;
    url: string;
    isReadMore?: boolean;
};


export const DestinationsCarousel: React.FC = async (): Promise<React.ReactNode> => {

    const cities: citiesType[] = [
        { name: "Bengaluru", slug: "bengaluru", img: await getImage("bengaluru"), url: Routes.city("bengaluru") },
        { name: "Chennai", slug: "chennai", img: await getImage("chennai"), url: Routes.city("chennai") },
        { name: "Coorg", slug: "coorg", img: await getImage("coorg"), url: Routes.city("coorg") },
        { name: "Jaipur", slug: "jaipur", img: await getImage("jaipur"), url: Routes.city("jaipur") },
        { name: "Udaipur", slug: "udaipur", img: await getImage("udaipur"), url: Routes.city("udaipur") },
        { name: "View All Cities", slug: "view-all", url: Routes.cities(), isReadMore: true },
    ];

    return (
        <section className="py-12 flex justify-center items-center bg-white">
            <div className="container flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">
                        Cities We Incorporate
                    </span>
                    <CarouselControls />
                </div>
                <div
                    id="carousel"
                    className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 no-scrollbar"
                >
                    {cities.map((data) => (
                        <CityCard data={data} key={data.name} />
                    ))}
                </div>
            </div>
        </section>
    );
};