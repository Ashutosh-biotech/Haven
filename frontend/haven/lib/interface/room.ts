export interface RoomType {
  roomTypeId: string;
  name: string;
  description: string;

  tags: string[];

  capacity: Capacity;

  sizeSqm: number;
  bedConfig: string;
  view: string;
  floorLevel: string;

  pricing: Pricing;
  availability: Availability;

  amenities: RoomAmenity[];

  cancellationPolicy: string;

  media: RoomMedia[];
}

export interface Capacity {
  adults: number;
  children: number;
  extraBeds: number;
}

export interface Pricing {
  basePrice: number;
  currency: string;
  taxPercentage: number;
  discountPercentage: number;
  perPersonPrice: number;
}

export interface Availability {
  totalRooms: number;
  availableRooms: number;
  lastUpdated: string;
}

export interface RoomAmenity {
  id: string;
  isFree: boolean;
  note?: string;
}

export interface RoomMedia {
  url: string;
  altText: string;
}
