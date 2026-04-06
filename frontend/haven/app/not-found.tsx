"use client";

import Link from 'next/link';
import { LuBuilding2, LuArrowLeft } from 'react-icons/lu';
import React from "react";

export default function NotFound(): React.ReactNode {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      
      {/* Visual Anchor: The 404 Number */}
      <div className="relative mb-2">
        {/* Shadow layer for depth */}
        <span className="absolute -inset-1 blur-2xl bg-blue-100 opacity-50 rounded-full"></span>
        
        <h1 className="relative text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none tracking-tighter text-slate-900 select-none animate-bounce-subtle">
          4<span className="text-blue-600">0</span>4
        </h1>
      </div>

      <div className="max-w-xl w-full z-10">
        {/* Brand Icon - Small and clean above the text */}
        <div className="inline-flex items-center justify-center p-3 mb-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <LuBuilding2 className="w-8 h-8 text-blue-600" />
        </div>

        {/* Clear Messaging */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 px-4">
          This room does not exist.
        </h2>
        <p className="text-slate-500 text-lg mb-10 px-4 max-w-md mx-auto">
          We could not find the page you are looking for. Let’s get you back to your <span className="text-blue-600 font-bold">Haven</span>.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
          <Link 
            href="/" 
            className="w-full sm:w-auto px-10 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-bold shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
          >
            <LuArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Safety
          </Link>

          <Link 
            href="/support" 
            className="w-full sm:w-auto px-10 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all duration-200"
          >
            Contact Concierge
          </Link>
        </div>

        {/* Contextual Links */}
        <div className="mt-16 pt-8 border-t border-slate-200 w-full max-w-sm mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
            Quick Relocation
          </p>
          <div className="flex justify-center gap-8 text-xs font-bold text-slate-500">
            <Link href="/hotels" className="hover:text-blue-600 transition-colors">HOTELS</Link>
            <Link href="/offers" className="hover:text-blue-600 transition-colors">OFFERS</Link>
            <Link href="/locations" className="hover:text-blue-600 transition-colors">CITIES</Link>
          </div>
        </div>
      </div>
    </main>
  );
}