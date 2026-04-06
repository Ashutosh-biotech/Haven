import React from "react";

export default function Loading(): React.ReactNode {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
        <div className="h-6 w-32 bg-gray-200 rounded-md" />
        <div className="flex gap-4">
          <div className="h-8 w-20 bg-gray-200 rounded-md" />
          <div className="h-8 w-20 bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="h-75 bg-gray-200 w-full" />

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Section Title */}
        <div className="h-6 w-48 bg-gray-200 rounded-md" />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Image */}
              <div className="h-40 bg-gray-200 w-full" />

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
                <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
                <div className="h-6 w-1/3 bg-gray-200 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}