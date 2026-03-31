"use client";
import Images from './Image';
import Link from 'next/link';
import { useState } from 'react';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed left-0 right-0 top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-12">
                        <Link className="block text-teal-600 transition hover:text-teal-500" href="/">
                            <span className="sr-only">Home</span>
                            {/* If Images.HOTEL is an icon, text-teal-600 ensures it matches the theme */}
                            <div className="size-10 text-teal-600 drop-shadow-md">{Images.HOTEL}</div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-8 text-sm font-medium text-gray-200">
                                {['About', 'Careers', 'History', 'Services', 'Projects', 'Blog'].map((item) => (
                                    <li key={item} className="group relative">
                                        <Link
                                            href="#"
                                            className="inline-block py-2 text-xl transition-colors duration-300 hover:text-teal-400"
                                        >
                                            {item}
                                        </Link>
                                        {/* Animated underline on hover */}
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-0 bg-teal-400 transition-all duration-300 group-hover:w-full rounded" />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Auth Buttons & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex sm:items-center sm:gap-3">
                            {/* Login – Primary CTA */}
                            <Link
                                href="#"
                                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 transition-all duration-300 hover:bg-teal-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Login
                            </Link>

                            {/* Register – Glassmorphism secondary button (visible on dark bg) */}
                            <Link
                                href="#"
                                className="rounded-md bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-all duration-300 hover:bg-white/20 hover:ring-white/40 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Register
                            </Link>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle navigation menu"
                            className="rounded-sm p-2 text-gray-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 md:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur-xl">
                    <nav aria-label="Global Mobile" className="px-4 py-4 sm:px-6">
                        <ul className="space-y-3">
                            {['About', 'Careers', 'History', 'Services', 'Projects', 'Blog'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-200 transition hover:bg-white/10 hover:text-teal-400"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-2">
                                <Link
                                    href="#"
                                    className="block rounded-lg bg-teal-600 px-3 py-2.5 text-center text-base font-semibold text-white shadow-lg shadow-teal-600/30 transition hover:bg-teal-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="mt-2 block rounded-lg bg-white/10 px-3 py-2.5 text-center text-base font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
};