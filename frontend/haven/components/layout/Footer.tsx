"use client";

import React, { useEffect, useState } from "react";
import { LuShieldCheck, LuLifeBuoy, LuCheck, LuBuilding2 } from "react-icons/lu";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

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
    icon: <FaFacebook className="w-5 h-5" />
  },
  {
    name: "Instagram",
    href: "#",
    icon: <FaInstagram className="w-5 h-5" />
  },
  {
    name: "Twitter",
    href: "#",
    icon: <FaTwitter className="w-5 h-5" />
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: <FaLinkedin className="w-5 h-5" />
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
              <div className="w-10 h-10 text-teal-500 flex items-center justify-center">
                <LuBuilding2 size={36} />
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
                <LuShieldCheck className="w-4 h-4 text-green-500" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <LuLifeBuoy className="w-4 h-4 text-blue-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <LuCheck className="w-4 h-4 text-teal-500" />
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