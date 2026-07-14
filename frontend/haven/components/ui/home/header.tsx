"use client";
import header_bg from "@/assets/images/header-bg.png";
import React, { useState } from 'react';
import { LuSearch } from 'react-icons/lu';

const today: string = new Date().toISOString().split("T")[0];

const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return "";
    const date: Date = new Date(dateString);
    const dayMonth: string = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const year: number = date.getFullYear();
    return `${dayMonth}, ${year}`;
};

export const Header: React.FC = (): React.ReactNode => {
    const [checkInDate, setCheckInDate] = useState<string>("");
    const [checkOutDate, setCheckOutDate] = useState<string>("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { id, value }: { id: string; value: string } = event.target;
        if (id === "check-in") {
            setCheckInDate(value);
            // Reset check-out if it's now before the new check-in
            if (checkOutDate && value >= checkOutDate) {
                setCheckOutDate("");
            }
        } else if (id === "check-out") {
            setCheckOutDate(value);
        }
    }

    return (
        <section
            style={{ backgroundImage: `url(${header_bg.src})` }}
            className="bg-cover bg-no-repeat bg-center min-h-screen"
        >
            <div className="flex flex-col items-center justify-center min-h-screen px-4 py-24 bg-linear-to-b from-black/80 to-black/10">
                <h1 className="text-6xl text-white font-extrabold tracking-widest drop-shadow-lg mb-3">
                    HAVEN
                </h1>
                <p className="text-white/80 text-2xl text-center max-w-md mb-10">
                    Hotel Booking Place — see and explore more about my project.
                </p>

                <form
                    onSubmit={(e): void => e.preventDefault()}
                    className="flex flex-wrap items-end bg-white rounded-2xl shadow-2xl p-6 gap-6 w-full max-w-4xl"
                >
                    {/* Destination */}
                    <div className="flex flex-col gap-2 flex-1 min-w-45">
                        <label htmlFor="destination" className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                            Destination
                        </label>
                        <div className="border rounded-lg px-3 py-2.5 border-slate-300 flex gap-2 items-center focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition">
                            <div className="size-5 text-slate-400 shrink-0"><LuSearch size={20} /></div>
                            <input
                                type="text"
                                id="destination"
                                placeholder="Where are you going?"
                                className="outline-none w-full text-sm text-slate-700 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Check In */}
                    <div className="flex flex-col gap-2 flex-1 min-w-40">
                        <label htmlFor="check-in" className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                            Check In
                        </label>
                        <div className="border rounded-lg px-3 py-2.5 border-slate-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition flex flex-col gap-1">
                            <input
                                type="date"
                                id="check-in"
                                onChange={handleChange}
                                min={today}
                                value={checkInDate}
                                className="outline-none w-full text-sm text-slate-700 bg-transparent"
                            />
                            {checkInDate && (
                                <span className="text-xs font-medium text-teal-700 pl-1">
                                    {formatDisplayDate(checkInDate)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Check Out */}
                    <div className="flex flex-col gap-2 flex-1 min-w-40">
                        <label htmlFor="check-out" className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                            Check Out
                        </label>
                        <div className="border rounded-lg px-3 py-2.5 border-slate-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition flex flex-col gap-1">
                            <input
                                type="date"
                                id="check-out"
                                onChange={handleChange}
                                min={checkInDate || today}
                                value={checkOutDate}
                                className="outline-none w-full text-sm text-slate-700 bg-transparent"
                            />
                            {checkOutDate && (
                                <span className="text-xs font-medium text-teal-700 pl-1">
                                    {formatDisplayDate(checkOutDate)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="rounded-lg bg-teal-600 px-8 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-teal-700 hover:shadow-lg active:scale-95 whitespace-nowrap"
                    >
                        Search
                    </button>
                </form>
            </div>
        </section>
    );
};