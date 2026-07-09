import { Ratings, CategoryRatings } from "@/components/interface/hotel";
import { Review } from "@/components/interface/review";
import { LuStar } from "react-icons/lu";

interface GuestReviewsProps {
  ratings: Ratings;
  latestReviews: Review[];
}

function getRatingLabel(rating: number): string {
  if (rating >= 4.5) return "Exceptional";
  if (rating >= 4.0) return "Excellent";
  if (rating >= 3.5) return "Very Good";
  if (rating >= 3.0) return "Good";
  return "Average";
}

function RatingBar({ label, value, max = 5 }: { label: string; value?: number; max?: number }): React.ReactNode {
  const safeValue: number = value || 0;
  const percentage: number = (safeValue / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-24 shrink-0">{label}</span>
      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-bold text-gray-700 w-8 text-right">{safeValue.toFixed(1)}</span>
    </div>
  );
}

export default function GuestReviews({ ratings, latestReviews }: GuestReviewsProps): React.ReactNode {
  const categories: { label: string; key: keyof CategoryRatings }[] = [
    { label: "Cleanliness", key: "cleanliness" },
    { label: "Service", key: "service" },
    { label: "Location", key: "location" },
    { label: "Comfort", key: "comfort" },
    { label: "Value", key: "value" },
  ];

  const defaultReviews: Review[] = [
    {
      reviewId: "dummy-1",
      rating: 5,
      title: "Heaven on Earth!",
      comment: "The sunset from the suite balcony was magical. Highly recommend for couples!",
      date: "2024-01-01",
      helpfulVotes: 12,
      images: [],
      user: {
        displayName: "TravelEnthusiast",
        location: "Bengaluru",
        verified: true,
      }
    },
    {
      reviewId: "dummy-2",
      rating: 5,
      title: "Excellent Service",
      comment: "The staff went above and beyond to make our anniversary special.",
      date: "2024-02-15",
      helpfulVotes: 5,
      images: [],
      user: {
        displayName: "FoodieCouple",
        location: "Mumbai",
        verified: true,
      }
    }
  ];

  const displayReviews: Review[] = (latestReviews && latestReviews.length > 0) ? latestReviews : defaultReviews;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ratings Breakdown */}
        <div>
          {/* Overall Rating */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-black text-teal-600">{ratings?.averageRating || 0}</span>
            <div>
              <span className="text-lg font-bold text-gray-800">
                {getRatingLabel(ratings?.averageRating || 0)}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                | {(ratings?.totalReviews || 0).toLocaleString()} Reviews
              </span>
            </div>
          </div>

          {/* Category Bars */}
          <div className="space-y-3">
            {categories.map(({ label, key }) => (
              <RatingBar
                key={key}
                label={label}
                value={ratings?.categoryRatings?.[key]}
              />
            ))}
          </div>
        </div>

        {/* Latest Reviews */}
        <div className="space-y-4">
          {displayReviews.slice(0, 3).map((review) => (
            <div
              key={review.reviewId}
              className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                {/* Avatar */}
                <div className="size-9 rounded-full bg-linear-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {review.user.displayName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">
                    &ldquo;{review.title}&rdquo;
                  </h4>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-2">
                {review.comment}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  — <span className="font-semibold text-teal-600">{review.user.displayName}</span>,{" "}
                  {review.user.location}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <LuStar
                      key={i}
                      className={`size-3 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
