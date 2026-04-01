"use client";

import React, { useEffect, useState } from "react";
import Images from "@/components/ui/Image";

const cities = [
  { name: "Bengaluru", href: "/hotels-in-bengaluru" },
  { name: "Chennai", href: "/hotels-in-chennai" },
  { name: "Coorg", href: "/hotels-in-coorg" },
  { name: "Delhi", href: "/hotels-in-delhi" },
  { name: "Goa", href: "/hotels-in-goa" },
  { name: "Jaipur", href: "/hotels-in-jaipur" },
  { name: "Kolkata", href: "/hotels-in-kolkata" },
  { name: "Manali", href: "/hotels-in-manali" },
  { name: "Mumbai", href: "/hotels-in-mumbai" },
  { name: "New Delhi", href: "/hotels-in-new-delhi" },
  { name: "South Goa", href: "/hotels-in-south-goa" },
  { name: "Udaipur", href: "/hotels-in-udaipur" },
];

const propertyTypes = [
  { name: "Heritage Hotels", href: "/heritage-hotels" },
  { name: "Beach Resorts", href: "/beach-resorts" },
  { name: "Luxury Hotels", href: "/luxury-hotels" },
  { name: "Budget Hotels", href: "/budget-hotels" },
  { name: "Business Hotels", href: "/business-hotels" },
  { name: "Eco Resorts", href: "/eco-resorts" },
  { name: "Spa & Wellness", href: "/spa-wellness" },
  { name: "Palace Stays", href: "/palace-stays" },
];

const amenities = [
  { name: "Free WiFi", id: "wifi" },
  { name: "Swimming Pool", id: "pool" },
  { name: "Spa & Wellness", id: "spa" },
  { name: "Fitness Center", id: "gym" },
  { name: "Restaurant", id: "restaurant" },
  { name: "Airport Shuttle", id: "airport_shuttle" },
  { name: "Parking", id: "parking" },
  { name: "Kids Club", id: "kids_club" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Press", href: "/press" },
  { name: "Blog", href: "/blog" },
  { name: "Partner with Us", href: "/partners" },
  { name: "List Your Property", href: "/list-property" },
];

const supportLinks = [
  { name: "Help Center", href: "/help" },
  { name: "Contact Us", href: "/contact" },
  { name: "Cancellation Policy", href: "/cancellation" },
  { name: "Refund Policy", href: "/refunds" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 text-teal-500">
                {Images.HOTEL}
              </div>
              <span className="text-2xl font-bold text-white">Haven</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              India&apos;s most trusted hotel booking platform. Discover heritage palaces, 
              beach resorts, and boutique stays across 12+ cities with verified reviews 
              and instant confirmation.
            </p>
            
            <div className="space-y-3">
              <p className="text-sm font-semibold text-white">Subscribe for exclusive deals</p>
              {mounted ? (
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    suppressHydrationWarning
                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-teal-500 transition-colors text-white placeholder-slate-500"
                  />
                  <button
                    type="submit"
                    suppressHydrationWarning
                    className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="flex gap-2 h-[42px]">
                  <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg" />
                  <div className="w-24 bg-teal-600/50 rounded-lg" />
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Popular Cities</h3>
            <ul className="space-y-2.5">
              {cities.slice(0, 6).map((city) => (
                <li key={city.name}>
                  <a
                    href={city.href}
                    className="text-sm hover:text-teal-400 transition-colors"
                  >
                    Hotels in {city.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="/cities" className="text-sm text-teal-400 hover:text-teal-300">
                  View all 12+ cities →
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2.5">
              {propertyTypes.map((type) => (
                <li key={type.name}>
                  <a
                    href={type.href}
                    className="text-sm hover:text-teal-400 transition-colors"
                  >
                    {type.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Top Amenities</h3>
            <ul className="space-y-2.5">
              {amenities.map((amenity) => (
                <li key={amenity.id}>
                  <a
                    href={`/amenities/${amenity.id}`}
                    className="text-sm hover:text-teal-400 transition-colors"
                  >
                    {amenity.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2.5 mb-6">
              {companyLinks.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-teal-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2.5">
              {supportLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-teal-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500 uppercase tracking-wider">We Accept</span>
              <div className="flex items-center gap-3">
                <div className="h-8 px-3 bg-slate-800 rounded flex items-center gap-1.5 text-xs font-medium text-white">
                  <span className="text-green-400">UPI</span>
                </div>
                <div className="h-8 px-3 bg-slate-800 rounded flex items-center gap-1.5 text-xs font-medium text-white">
                  <span>Visa</span>
                </div>
                <div className="h-8 px-3 bg-slate-800 rounded flex items-center gap-1.5 text-xs font-medium text-white">
                  <span>Mastercard</span>
                </div>
                <div className="h-8 px-3 bg-slate-800 rounded flex items-center gap-1.5 text-xs font-medium text-white">
                  <span>RuPay</span>
                </div>
                <div className="h-8 px-3 bg-slate-800 rounded flex items-center gap-1.5 text-xs font-medium text-white">
                  <span>Paytm</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Verified Hotels</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Haven Hotels Pvt. Ltd. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="/terms" className="hover:text-slate-300 transition-colors">Terms</a>
              <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</a>
              <a href="/sitemap" className="hover:text-slate-300 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;