"use client";

import { useState } from "react";
import login_bg from "@/assets/images/login-bg.jpg";
import { LuUser, LuLock, LuEyeOff, LuEye, LuCircleCheck } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Simple validation
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 6;

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-4" style={{backgroundImage: `url(${login_bg.src})`}}>
            <div className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-3xl p-8 sm:p-10 w-full max-w-md shadow-2xl relative overflow-hidden">
                {/* Subtle top right gradient blob */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-100 rounded-full opacity-60 pointer-events-none blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-[#0f172a] text-center mb-8 leading-tight">
                        Welcome back<br/>to Haven.
                    </h1>
                    
                    {/* Google Button */}
                    <button className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white/50 hover:bg-white/80 rounded-full py-3 px-4 transition-colors">
                        <FcGoogle className="w-6 h-6" />
                        <span className="text-sm font-bold text-[#0f172a] cursor-pointer">Continue with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="w-full flex items-center my-6">
                        <div className="flex-1 border-gray-300 border-t"></div>
                        <span className="px-4 text-sm font-medium text-gray-500">Or with email</span>
                        <div className="flex-1 border-gray-300 border-t"></div>
                    </div>

                    {/* Form */}
                    <form className="w-full flex flex-col gap-5">
                        {/* Email Input */}
                        <div className={`flex items-center border rounded-full px-4 py-3 bg-white/60 backdrop-blur-sm transition-all focus-within:bg-white/80 ${isEmailValid ? 'border-green-500' : 'border-gray-300 focus-within:border-[#286f87]'}`}>
                            <LuUser className={`w-5 h-5 mr-3 shrink-0 ${isEmailValid ? 'text-green-500' : 'text-gray-500'}`} />
                            <input 
                                type="email" 
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-transparent outline-none text-sm text-[#0f172a] placeholder-gray-500 font-medium"
                            />
                            {isEmailValid && <LuCircleCheck className="w-5 h-5 fill-green-500 text-white ml-2 shrink-0" />}
                        </div>

                        {/* Password Input */}
                        <div className={`flex items-center border rounded-full px-4 py-3 bg-white/60 backdrop-blur-sm transition-all focus-within:bg-white/80 ${isPasswordValid ? 'border-green-500' : 'border-gray-300 focus-within:border-[#286f87]'}`}>
                            <LuLock className={`w-5 h-5 mr-3 shrink-0 ${isPasswordValid ? 'text-green-500' : 'text-gray-500'}`} />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="flex-1 bg-transparent outline-none text-sm text-[#0f172a] placeholder-gray-500 font-medium"
                            />
                            {isPasswordValid && <LuCircleCheck className="w-5 h-5 fill-green-500 text-white mx-2 shrink-0" />}
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                {showPassword ? <LuEye className="w-5 h-5 ml-1 shrink-0" /> : <LuEyeOff className="w-5 h-5 ml-1 shrink-0" />}
                            </button>
                        </div>

                        {/* Remember me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm mt-1 px-1">
                            <label className="flex items-center text-gray-800 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-400 bg-white/50 mr-2 accent-[#286f87]" />
                                <span className="font-semibold text-[#0f172a]">Remember me</span>
                            </label>
                            <Link href="#" className="font-bold text-[#0f172a] hover:text-[#286f87] transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Sign In Button */}
                        <button type="submit" className="mt-4 w-full bg-[#286f87] hover:bg-[#1f576b] text-white font-bold rounded-full py-3.5 transition-colors shadow-lg text-sm cursor-pointer">
                            SIGN IN
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-sm text-[#0f172a] font-bold">
                        New to Haven? <Link href="#" className="text-[#286f87] hover:underline cursor-pointer">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}