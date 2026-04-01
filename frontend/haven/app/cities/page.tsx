import { getHotels, getImage } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import Routes from "@/router/routes";
import CityCard from "@/components/ui/cityCard";

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
                            <CityCard data={{name: city, slug: city, img: image.url, url: Routes.city(city)}} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}