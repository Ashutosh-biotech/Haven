export interface BookingInfo {
  instantBooking: boolean;

  payAtHotelOptions: string[];

  freeCancellation: boolean;
  depositRequired: boolean;

  minimumAdvanceBookingHours: number;

  loyaltyPointsEligible: boolean;
  loyaltyEarnRate: number;
}
