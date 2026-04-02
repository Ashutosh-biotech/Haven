import { getHotels } from "@/lib";
import HotelCard from "@/components/ui/HotelCard";
import { HotelMap } from "@/components/interface/hotels";

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    const hotelsData = await getHotels("", `city=${city}`);
    const results: HotelMap[] = hotelsData?.results || [];
    return (
        <div className="my-36 flex flex-col justify-center items-center">
            <div className="container mx-auto flex flex-col gap-10">
                <h1 className="text-3xl font-bold w-full text-center">Hotels in {city.replaceAll("%20", " ")}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {results.map((hotel: HotelMap): React.ReactNode => (
                        <HotelCard key={hotel.hotelId} hotel={hotel} />
                    ))}
                </div>
            </div>
        </div>
    );
}