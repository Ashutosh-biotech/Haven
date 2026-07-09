"use client";

import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSearch, HiChevronDown } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";

export interface SelectOption {
    id: string;
    name: string;
    emoji?: string;
    phonecode?: string;
}

interface SearchableSelectProps<T> {
    options: T[];
    selected: T | null;
    onChange: (option: T | null) => void;
    placeholder: string;
    isLoading?: boolean;
}

export default function SearchableSelect<T extends SelectOption>({
    options,
    selected,
    onChange,
    placeholder,
    isLoading = false
}: SearchableSelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-close dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Reset search when dropdown closes
    useEffect(() => {
        if (!isOpen) setSearchQuery("");
    }, [isOpen]);

    // Filter elements based on query string
    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div ref={containerRef} className="relative w-full text-sm">
            {isLoading ? (
                <div className="w-full py-3.5 flex items-center justify-center bg-white/60 rounded-2xl text-black/60 font-bold gap-2 border border-transparent">
                    <FaSpinner className="animate-spin text-[#145a6e]" /> Loading options...
                </div>
            ) : (
                /* Select Trigger Button */
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full pl-4 pr-10 py-3.5 bg-white/80 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#145a6e] focus:bg-white text-black font-medium text-left outline-none transition-all cursor-pointer flex items-center justify-between select-none"
                >
                    <span className={selected ? "text-black" : "text-black/40"}>
                        {selected ? `${selected.emoji ? selected.emoji + " " : ""}${selected.name}` : placeholder}
                    </span>
                    <HiChevronDown className={`text-black/60 text-lg transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
            )}

            {/* Dropdown Options Box */}
            {isOpen && !isLoading && (
                <div className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-xl overflow-hidden max-h-60 flex flex-col animate-fadeIn">
                    {/* Search Field */}
                    <div className="relative border-b border-slate-100 p-2 shrink-0 bg-slate-50/50">
                        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 text-base" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-black outline-none focus:border-[#145a6e] text-xs font-medium"
                            autoFocus
                        />
                    </div>

                    {/* Scrollable List */}
                    <ul className="overflow-y-auto grow py-1 custom-scrollbar">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li key={option.id}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onChange(option);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors flex items-center gap-2 hover:bg-[#145a6e]/10 hover:text-[#145a6e] cursor-pointer ${
                                            selected?.id === option.id ? "bg-[#145a6e] text-white hover:bg-[#145a6e] hover:text-white" : "text-black/80"
                                        }`}
                                    >
                                        {option.emoji && <span>{option.emoji}</span>}
                                        <span>{option.name}</span>
                                        {option.phonecode && (
                                            <span className={`ml-auto text-[10px] opacity-60 font-mono ${selected?.id === option.id ? "text-white" : "text-slate-500"}`}>
                                                +{option.phonecode}
                                            </span>
                                        )}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-4 text-center text-xs font-medium text-black/40">
                                No results found
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}