"use client";

import { useState } from "react";
import { RoomType } from "@/components/interface/room";
import { LuCheck } from "react-icons/lu";

interface BookYourStayProps {
  roomTypes: RoomType[];
  freeCancellation: boolean;
  depositRequired: boolean;
}

export default function BookYourStay({ roomTypes, freeCancellation, depositRequired }: BookYourStayProps): React.ReactNode {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [guests, setGuests] = useState<string>("2 Adults");

  const lowestPrice: number = roomTypes.reduce((min: number, room: RoomType): number => {
    const discounted: number = room.pricing.basePrice * (1 - room.pricing.discountPercentage / 100);
    return discounted < min ? discounted : min;
  }, Infinity);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-5">Book Your Stay</h3>

      {/* Check-In */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
          Check-In
        </label>
        <div className="relative">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 transition-all"
          />
        </div>
      </div>

      {/* Check-Out */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
          Check-Out
        </label>
        <div className="relative">
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 transition-all"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
          Guests
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 appearance-none cursor-pointer transition-all"
        >
          <option>1 Adult</option>
          <option>2 Adults</option>
          <option>2 Adults, 1 Child</option>
          <option>2 Adults, 2 Children</option>
          <option>3 Adults</option>
        </select>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-5" />

      {/* Price */}
      <div className="mb-5">
        <span className="text-xs text-gray-500">From</span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-gray-900">
            ₹{Math.round(lowestPrice).toLocaleString("en-IN")}
          </span>
          <span className="text-sm text-gray-500 font-medium">/ night</span>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-2 mb-6">
        {freeCancellation && (
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center size-5 rounded-full bg-emerald-100 text-emerald-600">
                <LuCheck className="size-3" strokeWidth={3} />
            </span>
            <span className="text-sm text-emerald-700 font-medium">Free Cancellation</span>
          </div>
        )}
        {!depositRequired && (
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center size-5 rounded-full bg-emerald-100 text-emerald-600">
                <LuCheck className="size-3" strokeWidth={3} />
            </span>
            <span className="text-sm text-emerald-700 font-medium">No Prepayment Needed</span>
          </div>
        )}
      </div>

      {/* Reserve Button */}
      <button className="w-full bg-gray-900 hover:bg-teal-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-sm tracking-wide">
        Reserve Now
      </button>
    </div>
  );
}
