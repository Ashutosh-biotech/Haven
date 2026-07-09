"use client";

import { useState } from "react";
import { MediaItem } from "@/components/interface/hotel";

interface GalleryProps {
  gallery: MediaItem[];
}

export default function Gallery({ gallery }: GalleryProps): React.ReactNode {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const displayItems: MediaItem[] = gallery.slice(0, 5);

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative rounded-xl overflow-hidden group cursor-pointer h-[280px] shadow-lg">
        <img
          src={displayItems[activeIndex]?.url || ""}
          alt={displayItems[activeIndex]?.altText || "Hotel image"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {displayItems.slice(0, 4).map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative rounded-lg overflow-hidden h-[70px] cursor-pointer transition-all duration-300 ${
              activeIndex === idx
                ? "ring-2 ring-teal-500 ring-offset-2 ring-offset-white shadow-lg"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={item.url}
              alt={item.altText || item.tag}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <span className="absolute bottom-1 left-1 text-[10px] font-semibold text-white drop-shadow-md">
              {item.tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
