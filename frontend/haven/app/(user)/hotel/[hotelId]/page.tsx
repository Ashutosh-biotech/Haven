import { getHotels } from "@/lib";
import { Hotel } from "@/components/interface/hotel";
import Header from "@/components/feature/hotel/Header";
import Gallery from "@/components/feature/hotel/Gallery";
import BookYourStay from "@/components/feature/hotel/BookYourStay";
import AboutResort from "@/components/feature/hotel/AboutResort";
import RoomCards from "@/components/feature/hotel/RoomCards";
import PrimeLocation from "@/components/feature/hotel/PrimeLocation";
import GuestReviews from "@/components/feature/hotel/GuestReviews";
import HotelPolicies from "@/components/feature/hotel/HotelPolicies";
import AmenitiesCarousel from "@/components/feature/hotel/AmenitiesCarousel";
import ContactCard from "@/components/feature/hotel/ContactCard";
import AwardsSection from "@/components/feature/hotel/AwardsSection";

export default async function HotelDetailsPage({ params }: { params: Promise<{ hotelId: string }> }): Promise<React.ReactNode> {
  const { hotelId }: { hotelId: string } = await params;
  const hotel: Hotel = await getHotels(`${hotelId}`, "");

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* ─── Hero Header ─── */}
      <Header
        coverImageUrl={hotel.media?.coverImageUrl || ""}
        name={hotel.name}
        starRating={hotel.starRating}
        brand={hotel.brand}
        city={hotel.location?.city || ""}
        state={hotel.location?.state || ""}
        averageRating={hotel.ratings?.averageRating}
        totalReviews={hotel.ratings?.totalReviews || 0}
      />

      {/* ─── Main Content Grid ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column — 2/3 width */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery + About */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <Gallery
                gallery={hotel.media?.gallery || []}
              />
              <AboutResort
                description={hotel.description}
                categories={hotel.categories || []}
              />
            </div>

            {/* Room Cards */}
            <RoomCards roomTypes={hotel.roomTypes || []} />

            {/* Guest Reviews */}
            <GuestReviews
              ratings={hotel.ratings}
              latestReviews={hotel.latestReviews}
            />

            {/* Amenities Carousel */}
            <AmenitiesCarousel amenities={hotel.amenities || []} />

            {/* Awards */}
            <AwardsSection awards={hotel.awards || []} />
          </div>

          {/* Right Column — 1/3 width (Sidebar) */}
          <div className="space-y-6 lg:top-24 overflow-y-auto no-scrollbar pb-6">
            <BookYourStay
              roomTypes={hotel.roomTypes || []}
              freeCancellation={hotel.bookingInfo?.freeCancellation || false}
              depositRequired={hotel.bookingInfo?.depositRequired || false}
            />

            <PrimeLocation
              address={hotel.location?.address || ""}
              nearbyLandmarks={hotel.location?.nearbyLandmarks || []}
              latitude={hotel.location?.coordinates?.latitude || 0}
              longitude={hotel.location?.coordinates?.longitude || 0}
            />

            <HotelPolicies
              policies={hotel.policies}
            />

            {hotel.contact && (
              <ContactCard contact={hotel.contact} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}