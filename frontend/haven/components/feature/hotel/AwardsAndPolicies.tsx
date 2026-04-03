import { Award, Policies } from "@/components/interface/hotel";

interface AwardsAndPoliciesProps {
  awards: Award[];
  policies: Policies;
}

export default function AwardsAndPolicies({ awards, policies }: AwardsAndPoliciesProps) {
  const safeAwards = awards || [];

  if (safeAwards.length === 0 && !policies) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
      {/* Awards */}
      {safeAwards.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Awards & Policies
          </h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {safeAwards.slice(0, 4).map((award, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-linear-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl px-3 py-2 hover:shadow-md transition-shadow"
              >
                <div className="size-10 rounded-full bg-linear-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 3h14a2 2 0 012 2v3a4 4 0 01-3 3.87V15a5 5 0 01-10 0v-3.13A4 4 0 013 8V5a2 2 0 012-2zm0 2v3a2 2 0 002 2h1v3a3 3 0 006 0v-3h1a2 2 0 002-2V5H5z" />
                  </svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {policies.petsAllowed ? "✅ Pets Allowed" : "🚫 No Pets"}
            </div>
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              Check-In: <span className="font-semibold text-gray-800">{policies.checkInTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              {policies.extraBedPolicy}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
