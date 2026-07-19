"use client";

import React, { useState, useEffect } from "react";
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
    HiOutlineMap,
    HiArrowRight,
    HiArrowLeft
} from "react-icons/hi";
import { FaGoogle, FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { fetchCountries, CountryData } from "@/lib/services/country.service";
import SearchableSelect from "@/components/feature/forms/SearchableSelect";
import {UserRegistrationFormData} from "@/components/interface/user-registration-form-data";
import {RegisterUser} from "@/lib";
import {redirect} from "next/navigation";
import Routes from "@/router/routes";

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

// Dummy JSON mapping for states based on Country Name
const DUMMY_STATES: Record<string, string[]> = {
    "Afghanistan": ["Badakhshan", "Balkh", "Kabul", "Kandahar"],
    "India": ["Delhi", "Maharashtra", "Karnataka", "Haryana", "Tamil Nadu"],
    "United States": ["California", "New York", "Texas", "Florida"],
    "default": ["State 1", "State 2", "State 3", "State 4"] // Fallback for countries not in map
};

export default function RegisterPage(): React.ReactNode {
    const [step, setStep] = useState<number>(1);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

    // Country Fetching State
    const [countries, setCountries] = useState<CountryData[]>([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState<boolean>(true);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    const [formData, setFormData] = useState<UserRegistrationFormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
        password: "",
        repeatPassword: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: null as CountryData | null,
        postcode: 0,
        isDefaultAddress: false,
        agreeTerms: false
    });

    const strength: StrengthType = checkStrength(formData.password);
    const currentStatesList = formData.country ? (DUMMY_STATES[formData.country.name] || DUMMY_STATES["default"]) : [];

    useEffect(() => {
        const loadCountries = async () => {
            setIsLoadingCountries(true);
            const data = await fetchCountries();
            setCountries(data);
            setIsLoadingCountries(false);
        };
        loadCountries();
    }, []);

    const handleStandardInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            if (!formData.firstName) return toast.error("Please enter your first name.");
            if (!formData.lastName) return toast.error("Please enter your last name.");
            if (!formData.email) return toast.error("Please enter your email address.");
            if (!formData.country) return toast.error("Please select a country for your phone code.");
            if (!formData.phone) return toast.error("Please enter your phone number.");
        }
        if (step === 2) {
            if (!formData.password || !formData.repeatPassword) return toast.error("Please complete password fields.");
            if (formData.password !== formData.repeatPassword) return toast.error("Passwords do not match!");
            if (strength.score < 3) return toast.error("Password did not meet conditions.");
        }
        setStep(prev => Math.min(prev + 1, 3));
    };

    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (step === 3) {
            if (!formData.address1) return toast.error("Please enter your address line 1.");
            if (!formData.city) return toast.error("Please enter your city.");
            if (!formData.state) return toast.error("Please select your state.");
            if (!formData.postcode) return toast.error("Please enter your postcode.");
            if (!formData.agreeTerms) return toast.error("You must agree to the Terms & Conditions.");
        }
        setFormSubmitted(true);
        if(await RegisterUser(formData)){
            toast.success("Account creation requested! Payload logged to console.");
            redirect(Routes.login())
        } else {
            toast.error("Something went wrong.");
        }
        setFormSubmitted(false);
    };

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center py-20 overflow-hidden">
            <ToastContainer />
            <Image
                src={registerBg}
                alt="Luxury Hotel View"
                placeholder="blur"
                fill
                priority
                className="object-cover z-0"
            />

            <div className="absolute inset-0 bg-black/40 z-1" />

            <div className="relative z-10 w-full max-w-xl flex flex-col items-center px-4">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-black mb-2 tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        Join Haven
                    </h1>
                    <p className="text-base font-bold text-white drop-shadow-md opacity-90">
                        Step {step} of 3: {step === 1 ? "Basics" : step === 2 ? "Security" : "Your Space"}
                    </p>

                    <div className="flex items-center justify-center gap-2 mt-4">
                        <div className={`h-2 rounded-full transition-all duration-300 ${step >= 1 ? "w-8 bg-amber-400" : "w-2 bg-white/40"}`} />
                        <div className={`h-2 rounded-full transition-all duration-300 ${step >= 2 ? "w-8 bg-amber-400" : "w-2 bg-white/40"}`} />
                        <div className={`h-2 rounded-full transition-all duration-300 ${step >= 3 ? "w-8 bg-amber-400" : "w-2 bg-white/40"}`} />
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
                                            onChange={handleStandardInputChange}
                                            placeholder="First Name"
                                            maxLength={80}
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
                                            onChange={handleStandardInputChange}
                                            placeholder="Last Name"
                                            maxLength={80}
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
                                        onChange={handleStandardInputChange}
                                        placeholder="Email Address"
                                        maxLength={255}
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                    />
                                </div>

                                <div className="relative group">
                                    <SearchableSelect
                                        options={countries}
                                        selected={formData.country}
                                        placeholder="Select Country"
                                        isLoading={isLoadingCountries}
                                        onChange={(selectedCountry) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                country: selectedCountry,
                                                state: ""
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="relative flex items-center bg-white/80 border border-transparent rounded-2xl focus-within:ring-2 focus-within:ring-[#145a6e] focus-within:bg-white transition-all overflow-hidden">
                                    <div className="pl-4 pr-3 py-3.5 flex items-center bg-black/5 border-r border-black/10 select-none min-w-[70px] justify-center">
                                        <span className="text-black font-bold text-sm tracking-wide flex w-16">
                                            {formData.country ? `${formData.country.emoji} +${formData.country.phonecode}` : <HiOutlinePhone className="text-lg text-black/60" />}
                                        </span>
                                    </div>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleStandardInputChange}
                                        placeholder="Phone Number"
                                        maxLength={20}
                                        disabled={!formData.country}
                                        className="w-full pl-3 pr-4 py-3.5 bg-transparent outline-none text-black font-medium placeholder:text-black/40 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4 animate-fadeIn">
                                {/* ... [Password section remains perfectly unchanged] ... */}
                                <h2 className="text-xl font-black text-black text-center mb-4">Set Credentials</h2>

                                <div className="relative group">
                                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                    <input
                                        required
                                        name="password"
                                        value={formData.password}
                                        onChange={handleStandardInputChange}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create Password"
                                        maxLength={255}
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
                                        onChange={handleStandardInputChange}
                                        type={showRepeatPassword ? "text" : "password"}
                                        placeholder="Repeat Password"
                                        maxLength={255}
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
                                        required
                                        type="text"
                                        name="address1"
                                        value={formData.address1}
                                        onChange={handleStandardInputChange}
                                        placeholder="Address Line 1"
                                        maxLength={255}
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                    />
                                </div>

                                <div className="relative group">
                                    <HiOutlineHome className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                    <input
                                        type="text"
                                        name="address2"
                                        value={formData.address2}
                                        onChange={handleStandardInputChange}
                                        placeholder="Address Line 2"
                                        maxLength={255}
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="relative group">
                                        <HiOutlineOfficeBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                        <input
                                            required
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleStandardInputChange}
                                            placeholder="City"
                                            maxLength={100}
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all placeholder:text-black/40 text-sm"
                                        />
                                    </div>

                                    {/* Switched to Dynamic Select based on Country Dummy JSON */}
                                    <div className="relative group">
                                        <HiOutlineMap className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-lg group-focus-within:text-[#145a6e]" />
                                        <select
                                            required
                                            name="state"
                                            value={formData.state}
                                            onChange={handleStandardInputChange}
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium outline-none transition-all text-sm appearance-none cursor-pointer"
                                        >
                                            <option value="">Select State</option>
                                            {currentStatesList.map((stateName, idx) => (
                                                <option key={idx} value={stateName}>{stateName}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="relative group">
                                        <input
                                            required
                                            type="number"
                                            name="postcode"
                                            value={formData.postcode}
                                            onChange={handleStandardInputChange}
                                            placeholder="Postcode"
                                            maxLength={20}
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
                                            onChange={handleStandardInputChange}
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
                                            onChange={handleStandardInputChange}
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
                                    disabled={formSubmitted}
                                    className="flex items-center justify-center gap-2 flex-1 py-3.5 bg-black/40 disabled:bg-black/40 disabled:cursor-not-allowed hover:bg-black/60 text-white font-black rounded-2xl transition-all active:scale-95 disabled:active:scale-100 text-xs uppercase tracking-wider cursor-pointer"
                                >
                                    {formSubmitted ?
                                        "Please Wait !!!" :
                                        <>
                                            <HiArrowLeft className="text-base" />
                                            <span>Back</span>
                                        </> }
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
                                    disabled={formSubmitted}
                                    className={(formSubmitted && "flex justify-center gap-3 ") + "flex-1 py-3.5 bg-[#145a6e] disabled:bg-[#24a2c7] disabled:cursor-not-allowed hover:bg-black text-white font-black rounded-2xl shadow-xl transition-all transform active:scale-95 disabled:active:scale-100 uppercase tracking-widest text-xs cursor-pointer"}
                                >
                                    {formSubmitted ?
                                        <>
                                            <FaSpinner className={"text-base animate-spin"} />
                                            <span>Processing</span>
                                        </> :
                                        "Complete Registration"}
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