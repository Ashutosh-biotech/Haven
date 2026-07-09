"use client";

import React, { useState, useEffect, useCallback } from "react";
import { LuMapPin, LuChevronLeft, LuChevronRight } from "react-icons/lu";

type Testimonial = {
    id: number,
    name: string,
    role: string,
    location: string,
    content: string,
    rating: number,
    initials: string,
    gradient: string,
    propertyType: string
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Heritage Enthusiast",
    location: "Jaipur, Rajasthan",
    content: "Found a stunning Palace Stay in Udaipur through Haven. The heritage property had all the modern amenities—WiFi, spa, and an incredible pool overlooking the lake. Booking was instant, and the airport shuttle made our arrival seamless.",
    rating: 5,
    initials: "PS",
    gradient: "from-amber-500 to-orange-600",
    propertyType: "Heritage Hotel",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Startup Founder",
    location: "Bengaluru, Karnataka",
    content: "As someone who travels between Mumbai, Delhi, and Bengaluru weekly, Haven's Tech Hotel filters are a lifesaver. Found a startup-friendly boutique hotel in Koramangala with high-speed WiFi and a business center. The gym was top-notch too!",
    rating: 5,
    initials: "AM",
    gradient: "from-blue-500 to-cyan-600",
    propertyType: "Business Hotel",
  },
  {
    id: 3,
    name: "Ananya Reddy",
    role: "Family Vacationer",
    location: "Chennai, Tamil Nadu",
    content: "Planned our Coorg plantation stay through Haven. The Nature Resort had everything—kids club for my children, laundry service, and a beautiful spa & wellness center. The mountain views from our room were breathtaking.",
    rating: 5,
    initials: "AR",
    gradient: "from-emerald-500 to-teal-600",
    propertyType: "Nature Resort",
  },
  {
    id: 4,
    name: "Rohan Kapoor",
    role: "Beach Lover",
    location: "Goa",
    content: "Haven helped us find the perfect Beach Resort in South Goa. The property offered water sports, beach access, and a party resort vibe we were looking for. Free parking and restaurant on-site made it ideal for our group trip.",
    rating: 5,
    initials: "RK",
    gradient: "from-violet-500 to-purple-600",
    propertyType: "Beach Property",
  },
  {
    id: 5,
    name: "Sneha Banerjee",
    role: "Wedding Planner",
    location: "Kolkata, West Bengal",
    content: "Organized a destination wedding in Manali using Haven. Found a luxury resort that doubled as a MICE venue with convention center facilities. The spa amenities and mountain resort setting made it magical for the couple.",
    rating: 5,
    initials: "SB",
    gradient: "from-pink-500 to-rose-600",
    propertyType: "Luxury Resort",
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Budget Backpacker",
    location: "New Delhi, NCR",
    content: "Needed a budget hotel near Delhi airport for a transit stay. Haven's filters helped me find an eco-friendly option with airport shuttle service. Clean rooms, free WiFi, and 24/7 restaurant—perfect for my early morning flight to Goa!",
    rating: 5,
    initials: "VS",
    gradient: "from-indigo-500 to-blue-600",
    propertyType: "Transit Hotel",
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }: { rating: number }): React.ReactNode => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const QuoteIcon: React.FC = (): React.ReactNode => (
  <svg className="w-10 h-10 text-orange-200 absolute top-6 right-6 opacity-50" fill="currentColor" viewBox="0 0 32 32">
    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
  </svg>
);

const PropertyBadge: React.FC<{ type: string }> = ({ type }: { type: string}): React.ReactNode => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-700 border border-teal-200">
    {type}
  </span>
);

const TestimonialsCarousel: React.FC = (): React.ReactNode => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const nextSlide = useCallback((): void => {
    setCurrentIndex((prev: number): number => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback((): void => {
    setCurrentIndex((prev: number): number => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect((): (() => void) | void => {
    if (!isAutoPlaying) return;
    const interval: NodeJS.Timeout = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative py-24 px-6 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Effects - Indian Inspired Colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-sm font-semibold tracking-wide uppercase mb-4 border border-teal-500/20">
            Trusted by Indian Travelers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover India with Haven
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From heritage palaces in Jaipur to beach resorts in Goa, find your perfect stay across 12+ cities
          </p>
          
          {/* City Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-3xl mx-auto">
            {["Mumbai", "Delhi", "Bengaluru", "Goa", "Jaipur", "Udaipur", "Manali", "Coorg"].map((city) => (
              <span key={city} className="px-3 py-1 text-xs text-slate-400 bg-white/5 rounded-full border border-white/10">
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full shrink-0 px-4"
                >
                  <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
                    <QuoteIcon />
                    
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                      {/* Avatar */}
                      <div className="shrink-0">
                        <div className={`w-20 h-20 rounded-2xl bg-linear-to-br ${testimonial.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300`}>
                          {testimonial.initials}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 justify-center md:justify-start">
                          <StarRating rating={testimonial.rating} />
                          <PropertyBadge type={testimonial.propertyType} />
                        </div>
                        
                        <blockquote className="mt-4 text-xl md:text-2xl text-white font-light leading-relaxed">
                          "{testimonial.content}"
                        </blockquote>
                        
                        <div className="mt-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                          <div>
                            <p className="font-semibold text-white text-lg">
                              {testimonial.name}
                            </p>
                            <p className="text-slate-400 text-sm">
                              {testimonial.role}
                            </p>
                          </div>
                          <span className="hidden md:block text-slate-600">•</span>
                          <p className="text-slate-500 text-sm flex items-center gap-1 justify-center md:justify-start">
                            <span className="size-6 mr-2 flex items-center justify-center"><LuMapPin className="size-5" /></span>
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => {
              prevSlide();
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label="Previous testimonial"
          >
            <LuChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => {
              nextSlide();
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label="Next testimonial"
          >
            <LuChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-teal-500 w-8" : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              {index === currentIndex && (
                <span className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-75" />
              )}
            </button>
          ))}
        </div>

        {/* Stats - India Focused */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/10">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">12+</p>
            <p className="text-slate-400 text-sm">Cities Covered</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">35+</p>
            <p className="text-slate-400 text-sm">Property Types</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">4.9</p>
            <p className="text-slate-400 text-sm">App Store Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</p>
            <p className="text-slate-400 text-sm">Indian Support</p>
          </div>
        </div>

        {/* Top Amenities */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-4">Popular amenities travelers love</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: "📶", name: "Free WiFi" },
              { icon: "🏊", name: "Swimming Pool" },
              { icon: "💆", name: "Spa & Wellness" },
              { icon: "🏋️", name: "Fitness Center" },
              { icon: "🍽️", name: "Restaurant" },
              { icon: "✈️", name: "Airport Shuttle" },
            ].map((amenity) => (
              <span key={amenity.name} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-slate-300 text-sm border border-white/10">
                <span>{amenity.icon}</span>
                {amenity.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;