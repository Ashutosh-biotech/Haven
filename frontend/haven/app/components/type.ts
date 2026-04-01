import { StaticImageData } from "next/image";

type HotelMap = {
    hotelId: string,
    name: string,
    brand: string,
    description: string,
    starRating: number,
    status: string,
    categories: string[],
    tags: string[],
    city: string,
    state: string,
    thumbnailUrl: string,
    averageRating: number,
    totalReviews: number,
    startingPrice: number,
    amenityCount: number,
    roomTypeCount: number
};

type Testimonial = {
    id: number,
    name: string,
    role: string,
    location: string,
    content: string,
    rating: number,
    initials: string,
    gradient: string,
    propertyType: string
};

type citiesType = {
    name: string;
    slug: string;
    img?: string | StaticImageData;
    url: string;
    isReadMore?: boolean;
};

export { type HotelMap, type Testimonial, type citiesType };