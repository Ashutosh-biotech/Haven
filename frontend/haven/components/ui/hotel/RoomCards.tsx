import { RoomType } from "@/components/interface/room";
import { LuTriangleAlert } from "react-icons/lu";

interface RoomCardsProps {
  roomTypes: RoomType[];
}

export default function RoomCards({ roomTypes }: RoomCardsProps): React.ReactNode {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roomTypes.map((room) => {
          const discounted = Math.round(
            room.pricing.basePrice * (1 - room.pricing.discountPercentage / 100)
          );
          const isLowAvailability = room.availability.availableRooms <= 3;

          return (
            <div
              key={room.roomTypeId}
              className="group bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Room Image */}
              <div className="relative h-52 overflow-hidden">
                {room.media[0] && (
                  <img
                    src={room.media[0].url}
                    alt={room.media[0].altText || room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                {/* Tags */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {room.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-teal-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Room Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{room.name}</h3>

                {/* Details Row */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{room.bedConfig}</span>
                  <span>|</span>
                  <span>{room.sizeSqm} sqm</span>
                  <span>|</span>
                  <span>{room.view}</span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-black text-gray-900">
                    ₹{discounted.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-gray-500">/ night</span>
                  {room.pricing.discountPercentage > 0 && (
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                      ({room.pricing.discountPercentage}% off)
                    </span>
                  )}
                </div>

                {/* Low availability warning */}
                {isLowAvailability && (
                  <div className="flex items-center gap-1.5 mb-4">
                    <LuTriangleAlert className="size-4 text-amber-500" />
                    <span className="text-xs font-semibold text-amber-600">
                      Only {room.availability.availableRooms} rooms left!
                    </span>
                  </div>
                )}

                {/* Select Button */}
                <button className="w-full bg-gray-900 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition-all duration-300 cursor-pointer text-sm tracking-wide shadow-md hover:shadow-lg">
                  Select Room
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
