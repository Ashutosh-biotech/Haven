import { Amenity } from "@/components/interface/hotel";

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
  beach: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M17.5 21H6.5c-.3 0-.5-.2-.5-.5V19c0-2.8 2.2-5 5-5h2c2.8 0 5 2.2 5 5v1.5c0 .3-.2.5-.5.5z" /><path d="M12 3v11" /><path d="M8 7c2-2 6-2 8 0" />
    </svg>
  ),
  spa: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M12 22c-4.97 0-9-2.24-9-5v-.09C5 13.34 8.58 10 12 10s7 3.34 9 6.91V17c0 2.76-4.03 5-9 5z" /><path d="M12 2C9.79 5 7 8 7 11a5 5 0 0 0 10 0c0-3-2.79-6-5-9z" />
    </svg>
  ),
  cancellation: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  payment: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  pool: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" /><path d="M2 16c2-1 4-1 6 0s4 1 6 0 4-1 6 0" /><path d="M8 4v8" /><path d="M16 4v8" /><path d="M8 8h8" />
    </svg>
  ),
  restaurant: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  default: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

function getIcon(amenityName: string): React.ReactNode {
  const name = amenityName.toLowerCase();
  if (name.includes("wi-fi") || name.includes("wifi") || name.includes("internet")) return AMENITY_ICONS.wifi;
  if (name.includes("beach")) return AMENITY_ICONS.beach;
  if (name.includes("spa") || name.includes("wellness")) return AMENITY_ICONS.spa;
  if (name.includes("cancel")) return AMENITY_ICONS.cancellation;
  if (name.includes("pay") || name.includes("payment")) return AMENITY_ICONS.payment;
  if (name.includes("pool") || name.includes("swim")) return AMENITY_ICONS.pool;
  if (name.includes("restaurant") || name.includes("dining") || name.includes("food")) return AMENITY_ICONS.restaurant;
  return AMENITY_ICONS.default;
}

interface AmenitiesBarProps {
  amenities: Amenity[];
  freeCancellation?: boolean;
  payAtHotelOptions?: string[];
}

export default function AmenitiesBar({ amenities, freeCancellation, payAtHotelOptions }: AmenitiesBarProps) {
  const featured = amenities.filter((a) => a.isFeatured).slice(0, 4);

  const items: { name: string; icon: React.ReactNode }[] = featured.map((a) => ({
    name: a.name,
    icon: getIcon(a.name),
  }));

  if (freeCancellation) {
    items.push({ name: "Free Cancellation", icon: AMENITY_ICONS.cancellation });
  }
  if (payAtHotelOptions && payAtHotelOptions.length > 0) {
    items.push({ name: "Pay at Hotel", icon: AMENITY_ICONS.payment });
  }

  return (
    <div className="w-full bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-teal-400">{item.icon}</span>
              <span className="text-white text-sm font-medium">{item.name}</span>
              {idx < items.length - 1 && (
                <span className="text-gray-600 ml-4 hidden sm:inline">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
