import { Amenity } from "@/components/interface/hotel";

interface AmenitiesCarouselProps {
  amenities: Amenity[];
}

export default function AmenitiesCarousel({ amenities }: AmenitiesCarouselProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Amenities</h2>
      
      {/* Horizontal scrolling container */}
      <div className="flex overflow-x-auto gap-4 pb-6 snap-x no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {amenities.map((amenity, idx) => (
          <div 
            key={idx} 
            className="flex-none w-64 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 snap-start flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                {/* Fallback checkmark icon if amenity.icon isn't provided or is just a string name */}
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 leading-tight">{amenity.name}</h4>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed flex-1">
              {amenity.description || `Enjoy our complimentary ${amenity.name.toLowerCase()} during your stay.`}
            </p>

            {ameenityHasTags(amenity) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {amenity.isFree ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md">Free</span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 px-2 py-1 rounded-md">Paid</span>
                )}
                {amenity.isFeatured && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2 py-1 rounded-md">Featured</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ameenityHasTags(amenity: Amenity) {
  return amenity.isFree || amenity.isFeatured;
}
