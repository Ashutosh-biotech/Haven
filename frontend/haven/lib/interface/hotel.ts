import { RoomType } from "./room";
import { Review } from "./review";
import { BookingInfo } from "./booking";

export interface Hotel {
  hotelId: string;
  name: string;
  brand: string;
  description: string;
  starRating: number;
  status: "ACTIVE" | "INACTIVE";

  categories: string[];
  tags: string[];

  location: Location;
  contact: Contact;
  media: Media;

  amenities: Amenity[];
  roomAmenities: string[];

  policies: Policies;
  roomTypes: RoomType[];

  awards: Award[];
  ratings: Ratings;
  latestReviews: Review[];

  bookingInfo: BookingInfo;
  loyaltyProgram: LoyaltyProgram;

  metadata: Metadata;
}

export interface Location {
  address: string;
  area: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;

  coordinates: Coordinates;
  nearbyLandmarks: Landmark[];

  tags: string[];
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Landmark {
  name: string;
  type: string;
  distanceKm: number;
}

export interface Contact {
  phone: string;
  email: string;
  website: string;
  supportChatUrl: string;
}

export interface Media {
  thumbnailUrl: string;
  coverImageUrl: string;

  gallery: MediaItem[];

  videoTourUrl: string;
  virtualTour360: string;
}

export interface MediaItem {
  url: string;
  tag: string;
  altText: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  icon: string;

  isFeatured: boolean;
  isFree: boolean;

  description: string;
}

export interface Policies {
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;

  petsAllowed: boolean;
  smokingAllowed: boolean;

  childPolicy: ChildPolicy;

  extraBedPolicy: string;
  importantNotes: string[];
}

export interface ChildPolicy {
  childrenAllowed: boolean;
  freeStayAgeLimit: number;
  extraChildPolicy: string;
}

export interface Award {
  id: string;
  name: string;
  awardingBody: string;
  year: number;
  category: string;
  rank: number | null;
}

export interface Ratings {
  averageRating: number;
  totalReviews: number;

  categoryRatings: CategoryRatings;
  ratingDistribution: RatingDistribution;
}

export interface CategoryRatings {
  cleanliness: number;
  service: number;
  location: number;
  comfort: number;
  value: number;
}

export interface RatingDistribution {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

export interface LoyaltyProgram {
  memberTiers: LoyaltyTier[];
}

export interface LoyaltyTier {
  tier: string;
  pointsPer100Rupees: number;
  benefits: string[];
}

export interface Metadata {
  createdAt: string;
  updatedAt: string;
  apiVersion: string;
}