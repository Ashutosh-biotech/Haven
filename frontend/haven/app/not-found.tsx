"use client";

import Link from 'next/link';

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
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
            />
          </svg>
        </div>

        {/* Clear Messaging */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 px-4">
          This room doesn't exist.
        </h2>
        <p className="text-slate-500 text-lg mb-10 px-4 max-w-md mx-auto">
          We couldn't find the page you're looking for. Let’s get you back to your <span className="text-blue-600 font-bold">Haven</span>.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
          <Link 
            href="/" 
            className="w-full sm:w-auto px-10 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-bold shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
          >
            <svg 
              className="w-5 h-5 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
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

      {/* Tailwind Custom Keyframes */}
      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 4s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}