import { Landmark } from "@/components/interface/hotel";
import { LuMapPin } from "react-icons/lu";

interface PrimeLocationProps {
  address: string;
  nearbyLandmarks: Landmark[];
  latitude: number;
  longitude: number;
}

export default function PrimeLocation({ address, nearbyLandmarks, latitude, longitude }: PrimeLocationProps): React.ReactNode {
  const mapUrl: string = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.02}%2C${latitude - 0.015}%2C${longitude + 0.02}%2C${latitude + 0.015}&layer=mapnik&marker=${latitude}%2C${longitude}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <LuMapPin className="size-5 text-teal-600" />
          Prime Location
        </h3>

        {/* Landmarks */}
        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-2">
            <LuMapPin className="size-4 text-red-500 mt-0.5 shrink-0 fill-red-500" />
            <span className="text-sm text-gray-700">{address}</span>
          </div>
          {nearbyLandmarks?.slice(0, 4).map((landmark, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <LuMapPin className="size-4 text-teal-500 shrink-0 fill-teal-500" />
              <span className="text-sm text-gray-700">{landmark.name}</span>
              <span className="text-xs text-gray-400 ml-auto">{landmark.distanceKm} km</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="h-48 bg-gray-100">
        <iframe
          src={mapUrl}
          className="w-full h-full border-0"
          title="Hotel Location"
          loading="lazy"
        />
      </div>
    </div>
  );
}
