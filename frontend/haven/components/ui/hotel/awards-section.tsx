import { Award } from "@/components/interface/hotel";
import { LuTrophy } from "react-icons/lu";

interface AwardsSectionProps {
  awards: Award[];
}

export default function AwardsSection({ awards }: AwardsSectionProps): React.ReactNode {
  const dummyAwards: Award[] = [
    {
      id: "award-1",
      name: "Travelers' Choice Best of the Best",
      category: "Overall",
      awardingBody: "TripAdvisor",
      year: 2023,
      rank: 1
    },
    {
      id: "award-2",
      name: "Excellence in Sustainable Tourism",
      category: "Sustainability",
      awardingBody: "Global Tourism Board",
      year: 2022,
      rank: 1
    },
  ];

  const displayAwards = (awards && awards.length > 0) ? awards : dummyAwards;

  return (
    <div className="mt-10 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Awards & Recognition</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayAwards.map((award, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 bg-linear-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="size-12 rounded-full bg-linear-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white shadow-sm shrink-0 mt-1">
                <LuTrophy className="size-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">{award.name}</h4>
              <span className="text-xs text-amber-700 font-semibold block">{award.awardingBody} · {award.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
