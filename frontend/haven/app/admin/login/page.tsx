"use client";

import React, {useState} from "react";
import {BiLoaderAlt} from "react-icons/bi";
import {HiOutlineShieldCheck} from "react-icons/hi2";

export default function AdminLoginPage() {
    const [adminId, setAdminId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);

        try {
            // Simulating secure admin authentication request
            await new Promise((resolve) => setTimeout(resolve, 2200));
            console.log("Admin authenticated successfully:", {adminId});
            alert("Access Granted. Redirecting to Admin Console...");
        } catch (error) {
            console.error("Authentication failure:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-teal-950 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-teal-900 p-8 shadow-2xl border border-teal-800/50">

                {/* Admin Header Layout */}
                <div className="text-center">
                    <div
                        className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-950 border border-teal-700/50 text-teal-400 mb-4">
                        <HiOutlineShieldCheck className="h-6 w-6"/>
                    </div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                        Control Panel
                    </h2>
                    <p className="mt-1.5 text-xs text-teal-400/80 uppercase tracking-widest font-mono">
                        Authorized Personnel Only
                    </p>
                </div>

                {/* Secure Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md">
                        {/* Admin ID / Email Field */}
                        <div>
                            <label htmlFor="admin-id"
                                   className="block text-xs font-semibold uppercase tracking-wider text-teal-300 mb-1.5">
                                Admin Identifier
                            </label>
                            <input
                                id="admin-id"
                                name="adminId"
                                type="text"
                                required
                                disabled={isLoading}
                                value={adminId}
                                onChange={(e) => setAdminId(e.target.value)}
                                className="w-full rounded-lg border border-teal-700 bg-teal-950/50 px-4 py-2.5 text-white font-mono placeholder-teal-700 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 disabled:cursor-not-allowed disabled:opacity-40 transition-all text-sm"
                                placeholder="admin_username or email"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password"
                                   className="block text-xs font-semibold uppercase tracking-wider text-teal-300 mb-1.5">
                                Security Passkey
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                disabled={isLoading}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-teal-700 bg-teal-950/50 px-4 py-2.5 text-white placeholder-teal-700 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 disabled:cursor-not-allowed disabled:opacity-40 transition-all text-sm"
                                placeholder="••••••••••••"
                            />
                        </div>
                    </div>

                    {/* Form Action Controls */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-teal-950 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-teal-900 disabled:cursor-not-allowed disabled:bg-teal-800 disabled:text-teal-950/40 transition-colors shadow-lg shadow-teal-500/10"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <BiLoaderAlt className="h-4 w-4 animate-spin text-teal-950"/>
                                    Verifying Credentials...
                                </span>
                            ) : (
                                "Authenticate"
                            )}
                        </button>
                    </div>
                </form>

                {/* Security Warning Footer */}
                <div className="mt-4 border-t border-teal-800/60 pt-4 text-center">
                    <p className="text-[10px] text-teal-500/60 leading-relaxed font-mono">
                        IP logging is active. Unauthorized access attempts are monitored and will be prosecuted.
                    </p>
                </div>

            </div>
        </div>
    );
}