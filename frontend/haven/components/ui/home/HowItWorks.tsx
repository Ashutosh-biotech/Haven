import React from "react";
import { LuMapPin, LuScale, LuCalendarCheck } from "react-icons/lu";

// STEP 1: Replace this div with your Browse/Search SVG
const BrowseIcon = (): React.ReactNode => (
  <div className="w-full h-full flex items-center justify-center text-teal-600 p-4">
    <LuMapPin className="w-8 h-8" />
  </div>
);

// STEP 2: Replace this div with your Compare/Balance SVG
const CompareIcon = (): React.ReactNode => (
  <div className="w-full h-full flex items-center justify-center text-teal-600 p-3">
    <LuScale className="w-8 h-8" />
  </div>
);

// STEP 3: Replace this div with your Calendar/Booking SVG
const BookIcon = (): React.ReactNode => (
  <div className="w-full h-full flex items-center justify-center text-teal-600 p-4">
    <LuCalendarCheck className="w-8 h-8" />
  </div>
);

interface Step {
  Icon: React.FC;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    Icon: BrowseIcon,
    title: "1. Browse Destinations",
    description: "Explore thousands of locations and discover the perfect hotel or resort across various brands on Haven.",
  },
  {
    Icon: CompareIcon,
    title: "2. Compare & Select",
    description: "Compare room rates, amenities, and verified guest reviews to find the ideal accommodation for your trip.",
  },
  {
    Icon: BookIcon,
    title: "3. Book Instantly",
    description: "Secure your dates quickly with our seamless booking process and receive immediate confirmation for your stay.",
  },
];

const HowItWorks: React.FC = (): React.ReactNode => {
  return (
    <section className="relative bg-linear-to-b from-teal-50 to-white py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-teal-200 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold tracking-wide uppercase mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Finding and booking your perfect stay with Haven takes just three easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300"
            >
              {/* Icon container - maintains size regardless of SVG content */}
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-50 border border-blue-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <step.Icon />
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step number badge */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;