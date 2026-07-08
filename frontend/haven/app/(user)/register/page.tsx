"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import registerBg from "@/assets/images/register-bg.jpg";
import {
    HiOutlineMail,
    HiOutlineLockClosed,
    HiOutlineUser,
    HiOutlineEye,
    HiOutlineEyeOff,
    HiOutlinePhone,
    HiOutlineHome,
    HiOutlineOfficeBuilding,
    HiOutlineGlobeAlt,
    HiOutlineMap,
    HiArrowRight,
    HiArrowLeft
} from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";

interface StrengthType {
    score: number;
    label: string;
    color: string;
}

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

export default function RegisterPage(): React.ReactNode {
    const [step, setStep] = useState<number>(1);
    
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        repeatPassword: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "India",
        postcode: "",
        isDefaultAddress: false,
        agreeTerms: false
    });

    const strength: StrengthType = checkStrength(formData.password);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const nextStep = () => {
        if (step === 1) {
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
                alert("Please fill out all required fields.");
                return;
            }
        }
        if (step === 2) {
            if (!formData.password || !formData.repeatPassword) {
                alert("Please complete password fields.");
                return;
            }
            if (formData.password !== formData.repeatPassword) {
                alert("Passwords do not match!");
                return;
            }
        }
        setStep(prev => Math.min(prev + 1, 3));
    };

    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreeTerms) {
            alert("You must agree to the Terms & Conditions.");
            return;
        }
        window.alert("Account creation requested! Payload: " + JSON.stringify(formData, null, 2));
    };

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center py-16 overflow-hidden">
            <Image
                src={registerBg}
                alt="Luxury Hotel View"
                placeholder="blur"
                fill
                priority
                className="object-cover z-0"
            />

            <div className="absolute inset-0 bg-black/20 z-1" />

            <div className="relative z-10 w-full max-w-xl flex flex-col items-center px-4">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-black mb-2 tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        Join Haven
                    </h1>
                    <p className="text-base font-bold text-white drop-shadow-md opacity-90">
                        Step {step} of 3: {step === 1 ? "Basics" : step === 2 ? "Security" : "Your Space"}
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <div className={`h-2 rounded-full transition-all duration-300 ${step >= 1 ? "w-8 bg-[#145a6e]" : "w-2 bg-white/40"}`} />
                        <div className={`h-2 rounded-full transition-all duration-300 ${step >= 2 ? "w-8 bg-[#145a6e]" : "w-2 bg-white/40"}`} />
                        <div className={`h-2 rounded-full transition-all duration-300 ${step >= 3 ? "w-8 bg-[#145a6e]" : "w-2 bg-white/40"}`} />
                    </div>
                </div>

                <section className="w-full bg-white/25 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-white/40 transition-all duration-500">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {step === 1 && (
                            <div className="space-y-4 animate-fadeIn">
                                <h2 className="text-xl font-black text-black text-center mb-4">Account Essentials</h2>
                                
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-3 py-3 mb-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-black shadow shadow-black/10 active:scale-95 w-full cursor-pointer text-sm"
                                >
                                    <FaGoogle className="text-red-500 text-base" />
                                    <span>Register with Google</span>
                                </button>

                                <div className="relative flex py-1 items-center mb-4">
                                    <div className="grow border-t border-black/20"></div>
                                    <span className="shrink mx-3 text-[9px] text-black uppercase tracking-[0.2em] font-black">Or use email</span>
                                    <div className="grow border-t border-black/20"></div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                        <input
                                            required
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="First Name *"
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                        <input
                                            required
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Last Name *"
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email Address *"
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                    />
                                </div>

                                <div className="relative group">
                                    <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Phone Number *"
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4 animate-fadeIn">
                                <h2 className="text-xl font-black text-black text-center mb-4">Set Credentials</h2>
                                
                                <div className="relative group">
                                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                    <input
                                        required
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create Password *"
                                        className="w-full pl-11 pr-12 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black p-1"
                                    >
                                        {showPassword ? <HiOutlineEyeOff className="text-lg" /> : <HiOutlineEye className="text-lg" />}
                                    </button>
                                </div>

                                <div className="relative group">
                                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                    <input
                                        required
                                        name="repeatPassword"
                                        value={formData.repeatPassword}
                                        onChange={handleInputChange}
                                        type={showRepeatPassword ? "text" : "password"}
                                        placeholder="Repeat Password *"
                                        className="w-full pl-11 pr-12 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black p-1"
                                    >
                                        {showRepeatPassword ? <HiOutlineEyeOff className="text-lg" /> : <HiOutlineEye className="text-lg" />}
                                    </button>
                                </div>

                                <div className="px-1">
                                    <div className="flex justify-between items-center mb-1.5 text-[9px] font-black uppercase tracking-wider">
                                        <span className="text-white">Security Strength</span>
                                        <span className={strength.label === "Weak" ? "text-black" : strength.color.replace('bg-', 'text-')}>{strength.label}</span>
                                    </div>
                                    <div className="flex gap-1.5 h-1.5">
                                        <div className={`flex-1 rounded-full transition-all duration-500 ${strength.score >= 1 ? strength.color : "bg-black/10"}`}></div>
                                        <div className={`flex-1 rounded-full transition-all duration-500 ${strength.score >= 2 ? strength.color : "bg-black/10"}`}></div>
                                        <div className={`flex-1 rounded-full transition-all duration-500 ${strength.score >= 3 ? strength.color : "bg-black/10"}`}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4 animate-fadeIn">
                                <h2 className="text-xl font-black text-black text-center mb-4">Delivery & Contact Address</h2>
                                
                                <div className="relative group">
                                    <HiOutlineHome className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                    <input
                                        type="text"
                                        name="address1"
                                        value={formData.address1}
                                        onChange={handleInputChange}
                                        placeholder="Address Line 1"
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                    />
                                </div>

                                <div className="relative group">
                                    <HiOutlineHome className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                    <input
                                        type="text"
                                        name="address2"
                                        value={formData.address2}
                                        onChange={handleInputChange}
                                        placeholder="Address Line 2"
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <HiOutlineOfficeBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="City"
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <HiOutlineMap className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            placeholder="State"
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <HiOutlineGlobeAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all text-sm appearance-none"
                                        >
                                            <option value="India">India</option>
                                            <option value="United States">United States</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="United Arab Emirates">UAE</option>
                                        </select>
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="postcode"
                                            value={formData.postcode}
                                            onChange={handleInputChange}
                                            placeholder="Postcode"
                                            className="w-full px-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2.5 px-1 pt-2">
                                    <label className="flex items-center gap-3 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            name="isDefaultAddress"
                                            checked={formData.isDefaultAddress}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 rounded border-transparent bg-white/50 text-[#145a6e] focus:ring-[#145a6e]"
                                        />
                                        <span className="text-white text-xs font-bold">Set as permanent default address</span>
                                    </label>

                                    <label htmlFor="agreeTerms" className="flex items-center gap-3 cursor-pointer select-none">
                                        <input
                                            required
                                            type="checkbox"
                                            id="agreeTerms"
                                            name="agreeTerms"
                                            checked={formData.agreeTerms}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 rounded border-transparent bg-white/50 text-[#145a6e] focus:ring-[#145a6e]"
                                        />
                                        <span className="text-white text-xs font-bold">
                                            I agree to the <span className="text-amber-400 underline decoration-2">Terms & Conditions</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 pt-4 border-t border-black/10 mt-6">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex items-center justify-center gap-2 flex-1 py-3.5 bg-black/40 hover:bg-black/60 text-white font-black rounded-2xl transition-all active:scale-95 text-xs uppercase tracking-wider cursor-pointer"
                                >
                                    <HiArrowLeft className="text-base" />
                                    <span>Back</span>
                                </button>
                            )}

                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex items-center justify-center gap-2 flex-1 py-3.5 bg-[#145a6e] hover:bg-[#0f4352] text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 text-xs uppercase tracking-wider cursor-pointer"
                                >
                                    <span>Continue</span>
                                    <HiArrowRight className="text-base" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="flex-1 py-3.5 bg-[#145a6e] hover:bg-black text-white font-black rounded-2xl shadow-xl transition-all transform active:scale-95 uppercase tracking-widest text-xs cursor-pointer"
                                >
                                    Complete Registration
                                </button>
                            )}
                        </div>
                    </form>

                    <footer className="text-center text-white font-bold mt-6 text-sm">
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