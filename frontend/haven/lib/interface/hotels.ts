export interface HotelMap {
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
    averageRating?: number | null,
    totalReviews: number,
    startingPrice: number,
    amenityCount: number,
    roomTypeCount: number
};