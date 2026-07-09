import { Policies } from "@/components/interface/hotel";
import { LuInfo, LuClock, LuBed } from "react-icons/lu";

interface HotelPoliciesProps {
  policies: Policies;
}

export default function HotelPolicies({ policies }: HotelPoliciesProps): React.ReactNode {
  if (!policies) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Hotel Policies</h3>
      
      <div className="flex flex-col gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded-full bg-gray-50 text-gray-500 shrink-0">
            <LuInfo className="size-4" />
          </span>
          <span className="font-medium text-gray-800">
            {policies.petsAllowed ? "✅ Pets Allowed" : "🚫 No Pets Allowed"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded-full bg-gray-50 text-gray-500 shrink-0">
            <LuClock className="size-4" />
          </span>
          <span>
            Check-In: <span className="font-semibold text-gray-800">{policies.checkInTime}</span> | 
            Check-Out: <span className="font-semibold text-gray-800">{policies.checkOutTime}</span>
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex items-center justify-center size-8 rounded-full bg-gray-50 text-gray-500 shrink-0">
            <LuBed className="size-4" />
          </span>
          <span className="mt-1">{policies.extraBedPolicy}</span>
        </div>
      </div>
    </div>
  );
}
