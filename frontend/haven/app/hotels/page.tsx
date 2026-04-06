import { HotelMap } from "@/components/interface/hotels";
import HotelCard from "@/components/ui/HotelCard";
import { getHotels } from "@/lib";
import React from "react";

export default async function HotelsPage(): Promise<React.ReactNode> {
    const hotelsData: { results: HotelMap[] } = await getHotels("", "");
    const results: HotelMap[] = hotelsData?.results || [];
    
    return (
        <div className="flex justify-center items-center my-36">
            <div className="container mx-auto">
                <h2 className="text-2xl font-semibold mb-8 text-center underline">All Hotels</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {results.map((hotel: HotelMap): React.ReactNode => (
                        <HotelCard key={hotel.hotelId} hotel={hotel} />
                    ))}
                </div>
            </div>
        </div>
    )
}