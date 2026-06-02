"use client";

import React, { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import registerBg from "@/assets/images/register-bg.jpg";

// react-icons
import {
    HiOutlineMail,
    HiOutlineLockClosed,
    HiOutlineUser,
    HiOutlineEye,
    HiOutlineEyeOff
} from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";

export default function RegisterPage(): React.ReactNode {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [strength, setStrength] = useState({ score: 0, label: "Weak", color: "bg-slate-200" });

    // Password Strength Logic
    useEffect(() => {
        const checkStrength = (pass: string) => {
            let score = 0;
            if (pass.length > 8) score++;
            if (/[A-Z]/.test(pass)) score++;
            if (/[0-9]/.test(pass)) score++;
            if (/[^A-Za-z0-9]/.test(pass)) score++;

            if (score === 0) return { score: 0, label: "Weak", color: "bg-slate-200" };
            if (score <= 2) return { score: 1, label: "Fair", color: "bg-amber-500" };
            if (score === 3) return { score: 2, label: "Good", color: "bg-green-500" };
            return { score: 3, label: "Strong", color: "bg-emerald-600" };
        };

        setStrength(checkStrength(password));
    }, [password]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Integration point for Haven Microservices Auth
    };

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center py-30 overflow-hidden">
            <Image
                src={registerBg}
                alt="Luxury Hotel View"
                placeholder="blur"
                fill
                priority
                className="object-cover z-0"
            // quality={100}
            />

            {/* Dark overlay to make white text pop against bright images */}
            <div className="absolute inset-0 bg-black/20 z-1" />

            <div className="relative z-10 w-full max-w-lg flex flex-col items-center px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        Join Haven
                    </h1>
                    <p className="text-lg font-bold text-white drop-shadow-md opacity-100">
                        Experience luxury, one click away.
                    </p>
                </div>

                {/* Registration Card */}
                <section className="w-full bg-white/25 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/40">
                    <h2 className="text-2xl font-black text-black text-center mb-8">
                        Create Account
                    </h2>

                    {/* Social Auth */}
                    <button
                        type="button"
                        className="flex items-center justify-center gap-3 py-3.5 mb-6 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-black shadow-lg active:scale-95 w-full cursor-pointer"
                    >
                        <FaGoogle className="text-red-500 text-lg" />
                        <span>Register with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="relative flex py-2 items-center mb-6">
                        <div className="grow border-t border-black/30"></div>
                        <span className="shrink mx-4 text-[10px] text-black uppercase tracking-[0.2em] font-black">
                            Or use email
                        </span>
                        <div className="grow border-t border-black/30"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div className="relative group">
                            <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-xl group-focus-within:text-[#145a6e]" />
                            <input
                                required
                                type="text"
                                placeholder="Full Name"
                                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative group">
                            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-xl group-focus-within:text-[#145a6e]" />
                            <input
                                required
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-xl group-focus-within:text-[#145a6e]" />
                            <input
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                placeholder="Create Password"
                                className="w-full pl-12 pr-12 py-4 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black p-1"
                            >
                                {showPassword ? <HiOutlineEyeOff className="text-xl" /> : <HiOutlineEye className="text-xl" />}
                            </button>
                        </div>

                        {/* Working Password Strength Meter */}
                        <div className="px-1">
                            <div className="flex justify-between items-center mb-1.5 text-[10px] font-black uppercase tracking-wider">
                                <span className="text-white">Security Strength</span>
                                <span className={strength.label === "Weak" ? "text-black" : strength.color.replace('bg-', 'text-')}>{strength.label}</span>
                            </div>
                            <div className="flex gap-1.5 h-1.5">
                                <div className={`flex-1 rounded-full transition-all duration-500 ${strength.score >= 1 ? strength.color : "bg-black/10"}`}></div>
                                <div className={`flex-1 rounded-full transition-all duration-500 ${strength.score >= 2 ? strength.color : "bg-black/10"}`}></div>
                                <div className={`flex-1 rounded-full transition-all duration-500 ${strength.score >= 3 ? strength.color : "bg-black/10"}`}></div>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-center gap-3 px-1">
                            <input
                                required
                                type="checkbox"
                                id="terms"
                                className="w-5 h-5 rounded border-transparent bg-white/50 text-[#145a6e] focus:ring-[#145a6e] cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-white font-bold cursor-pointer select-none">
                                I agree to the <span className="text-amber-400 underline decoration-2">Terms & Conditions</span>
                            </label>
                        </div>

                        {/* Main Button */}
                        <button
                            type="submit"
                            className="w-full py-4 bg-[#145a6e] hover:bg-black text-white font-black rounded-2xl shadow-xl transition-all transform active:scale-95 mt-2 uppercase tracking-widest text-sm cursor-pointer"
                        >
                            Create Account
                        </button>
                    </form>

                    <footer className="text-center text-white font-bold mt-8">
                        Already a member?{" "}
                        <Link
                            href="/login"
                            className="text-amber-400 hover:text-black underline decoration-2 underline-offset-4"
                        >
                            Sign In
                        </Link>
                    </footer>
                </section>
            </div>
        </main>
    );
}