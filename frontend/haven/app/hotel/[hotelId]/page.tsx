import { getHotels } from "@/lib";
import {Hotel} from "@/components/interface/hotel";
import Images from "@/components/ui/Image";

export default async function HotelDetailsPage({params}: {params: Promise<{hotelId: string}>}) {
    const {hotelId}: {hotelId: string} = await params;
    const hotel: Hotel = await getHotels(`${hotelId}`, "");
    
    return (
        <div style={{backgroundImage: `url(${hotel.media.coverImageUrl})`}} className={"w-screen h-screen bg-cover bg-no-repeat pt-36 text-white text-shadow-black text-shadow-md"}>
            <div className={"flex items-center justify-center w-full"}>
                <div className="container">
                    <div>
                        <h1 className={"text-4xl mb-3 font-bold"}>{hotel.name}</h1>
                        <div className={" flex gap-4"}>
                            <div className={"flex gap-3 text-yellow-300"}>
                                {[...Array(hotel.starRating)].map((_, index) => {
                                    return (
                                        <span key={index} className={"size-7"}>{Images.STAR}</span>
                                    );
                                })}
                            </div>
                            <h3 className={"text-2xl"}>{hotel.brand}</h3>
                        </div>
                    </div>
                    <div></div>
                </div>

            </div>

        </div>
    )
}