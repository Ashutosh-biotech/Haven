import { Award, Policies } from "@/components/interface/hotel";
import { LuStar, LuTrophy, LuInfo, LuClock, LuBed } from "react-icons/lu";

interface AwardsAndPoliciesProps {
  awards: Award[];
  policies: Policies;
}

export default function AwardsAndPolicies({ awards, policies }: AwardsAndPoliciesProps): React.ReactNode {
  const safeAwards: Award[] = awards || [];

  if (safeAwards.length === 0 && !policies) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
      {/* Awards */}
      {safeAwards.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <LuStar className="size-5 text-yellow-500 fill-yellow-500" />
            Awards & Policies
          </h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {safeAwards.slice(0, 4).map((award, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-linear-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl px-3 py-2 hover:shadow-md transition-shadow"
              >
                <div className="size-10 rounded-full bg-linear-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white shadow-sm">
                  <LuTrophy className="size-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-800 block leading-tight">{award.name}</span>
                  <span className="text-[10px] text-gray-500">{award.awardingBody} · {award.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Policies */}
      {policies && (
        <div className="border-t border-gray-100 pt-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <LuInfo className="size-4 text-gray-400" />
              {policies.petsAllowed ? "✅ Pets Allowed" : "🚫 No Pets"}
            </div>
            <div className="flex items-center gap-1.5">
              <LuClock className="size-4 text-gray-400" />
              Check-In: <span className="font-semibold text-gray-800">{policies.checkInTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <LuBed className="size-4 text-gray-400" />
              {policies.extraBedPolicy}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
