"use client";

import React, {useState} from 'react';
import {
    LuShieldCheck,
    LuLock,
    LuShieldAlert,
    LuMail,
    LuKeyRound,
    LuEye,
    LuEyeOff,
    LuShield,
    LuCircleHelp,
    LuX,
    LuCircleAlert,
    LuCircleCheckBig,
    LuInfo
} from "react-icons/lu";

// Define structures for Alert messages
interface AlertState {
    show: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
}

export default function App() {
    // Form states
    const [email, setEmail] = useState<string>('admin@Haven Admin.com');
    const [password, setPassword] = useState<string>('admin123');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitBtnText, setSubmitBtnText] = useState<string>('Sign In as Admin');

    // Forgot password modal state
    const [forgotModalOpen, setForgotModalOpen] = useState<boolean>(false);
    const [forgotModalVisible, setForgotModalVisible] = useState<boolean>(false); // for transitions
    const [forgotEmail, setForgotEmail] = useState<string>('');

    // Feedback alert state
    const [alert, setAlert] = useState<AlertState>({
        show: false,
        type: 'info',
        title: '',
        message: '',
    });

    // Alert controller helper
    const showAlert = (type: 'success' | 'error' | 'info', title: string, message: string) => {
        setAlert({
            show: true,
            type,
            title,
            message,
        });
    };

    const hideAlert = () => {
        setAlert(prev => ({ ...prev, show: false }));
    };

    // Modal Open Handler with smooth animation delay
    const handleOpenForgotModal = () => {
        setForgotModalOpen(true);
        setTimeout(() => {
            setForgotModalVisible(true);
        }, 10);
    };

    // Modal Close Handler with smooth animation delay
    const handleCloseForgotModal = () => {
        setForgotModalVisible(false);
        setTimeout(() => {
            setForgotModalOpen(false);
        }, 300);
    };

    // Handle Login Authentication
    const handleLoginSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        hideAlert();

        if (!email || !password) {
            showAlert('error', 'Authentication Failed', 'Please input both your email and password to access the gateway.');
            return;
        }

        setIsSubmitting(true);
        setSubmitBtnText('Verifying Integrity...');

        // Mock API Auth request (simulated with setTimeout)
        setTimeout(() => {
            if (email === 'admin@Haven Admin.com' && password === 'admin123') {
                showAlert('success', 'Authorization Success', 'Welcome back, Admin. Establishing secure session tunnel...');
                setSubmitBtnText('Access Granted');
                setIsSubmitting(false);

                // Simulated redirect
                setTimeout(() => {
                    showAlert('info', 'Next.js Routing Sandbox', 'Next Router redirect (`router.push`) would trigger here.');
                    setSubmitBtnText('Sign In as Admin');
                }, 1500);
            } else {
                showAlert('error', 'Access Denied', 'The email or password you input does not match our secure records.');
                setIsSubmitting(false);
                setSubmitBtnText('Sign In as Admin');
            }
        }, 1800);
    };

    // Handle Forgot Password dispatch
    const handleForgotSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleCloseForgotModal();

        if (forgotEmail) {
            showAlert(
                'success',
                'Recovery Dispatched',
                `A cryptographic password recovery link has been safely transmitted to ${forgotEmail}. Please check your inbox.`
            );
            setForgotEmail('');
        }
    };

    return (
        <div className="dark bg-gray-950 text-slate-100 min-h-screen flex flex-col justify-between selection:bg-slate-500 selection:text-white transition-colors duration-300">

            {/* Header */}
            <header className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="bg-linear-to-tr from-slate-600 to-gray-600 p-2 rounded-xl text-white shadow-lg shadow-slate-500/20">
                        <LuShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-xl tracking-tight bg-linear-to-r from-slate-400 to-gray-400 bg-clip-text text-transparent">
            Haven Admin
          </span>
                </div>
                <div className="text-xs text-gray-500 font-medium select-none">
                    SECURE SERVER GATEWAY
                </div>
            </header>

            {/* Form Container Grid */}
            <main className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-0 bg-gray-900 rounded-3xl shadow-2xl border border-gray-800/50 overflow-hidden min-h-137.5">

                    {/* Left Brand Panel - Hidden on small viewports */}
                    <div className="hidden md:flex md:col-span-5 bg-linear-to-tr from-slate-600 via-slate-700 to-gray-800 p-10 flex-col justify-between text-white relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-slate-500/20 rounded-full blur-3xl"></div>

                        <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/10 mb-6">
                v2.4.0 Stable
              </span>
                            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
                                Powering your control center.
                            </h2>
                            <p className="mt-4 text-slate-100 font-light leading-relaxed">
                                Access real-time analytics, user management, global settings, and seamless security systems.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-sm text-slate-100/90">
                                <LuLock className="w-4 h-4 text-slate-300" />
                                <span>AES-256 Bit Encryption</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-slate-100/90">
                                <LuShieldAlert className="w-4 h-4 text-slate-300" />
                                <span>Ip-restricted Auth Active</span>
                            </div>
                            <p className="text-xs text-slate-200/60 pt-4 border-t border-white/10">
                                © 2026 Haven Admin Inc. All rights reserved.
                            </p>
                        </div>
                    </div>

                    {/* Right Card Panel - Dynamic Forms */}
                    <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">

                        {/* Dynamic Alerts inside layout */}
                        {alert.show && (
                            <div className={`mb-6 p-4 rounded-xl flex items-start space-x-3 transition-all duration-300 border ${
                                alert.type === 'success'
                                    ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/20'
                                    : alert.type === 'error'
                                        ? 'bg-rose-950/30 text-rose-400 border-rose-800/20'
                                        : 'bg-amber-950/30 text-amber-400 border-amber-800/20'
                            }`}>
                                <div className="mt-0.5 shrink-0">
                                    {alert.type === 'success' && <LuCircleCheckBig className="w-5 h-5" />}
                                    {alert.type === 'error' && <LuCircleAlert className="w-5 h-5" />}
                                    {alert.type === 'info' && <LuInfo className="w-5 h-5" />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                                    <p className="text-xs mt-0.5 opacity-90">{alert.message}</p>
                                </div>
                                <button onClick={hideAlert} className="text-slate-400 hover:text-slate-200 transition-colors">
                                    <LuX className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* Form Heading */}
                        <div className="mb-10">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Admin Access Portal</h1>
                            <p className="text-sm text-gray-400 mt-2">Welcome back! Please enter your administrative credentials.</p>
                        </div>

                        {/* Secure Login Form */}
                        <form onSubmit={handleLoginSubmit} className="space-y-6">

                            {/* Email Input Field */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 z-10">
                                    <LuMail className="w-5 h-5" />
                                </div>

                                <input
                                    type="email"
                                    id="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="peer block w-full pl-10 pr-4 py-3 bg-gray-800/40 border border-gray-700/80 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all text-sm"
                                />

                                <label
                                    htmlFor="email"
                                    className="absolute left-3 -top-2.5 px-1.5 bg-gray-900 text-xs font-semibold text-slate-400 transition-all duration-200 pointer-events-none origin-left
                  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-10 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:font-normal
                  peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:bg-gray-900 peer-focus:px-1.5 peer-focus:font-semibold"
                                >
                                    Email Address
                                </label>
                            </div>

                            {/* Password Input Field */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 z-10">
                                    <LuKeyRound className="w-5 h-5" />
                                </div>

                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="peer block w-full pl-10 pr-12 py-3 bg-gray-800/40 border border-gray-700/80 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all text-sm"
                                />

                                <label
                                    htmlFor="password"
                                    className="absolute left-3 -top-2.5 px-1.5 bg-gray-900 text-xs font-semibold text-slate-400 transition-all duration-200 pointer-events-none origin-left
                  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-10 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:font-normal
                  peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:bg-gray-900 peer-focus:px-1.5 peer-focus:font-semibold"
                                >
                                    Password
                                </label>

                                {/* Eye Toggle button */}
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-slate-200 transition-colors z-10"
                                >
                                    {passwordVisible ? <LuEyeOff className="w-5 h-5" /> : <LuEye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Keep Signed In & Forgot Password */}
                            <div className="flex items-center justify-between pt-1">
                                <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded text-slate-600 bg-gray-800 border-gray-700 focus:ring-slate-500 focus:ring-offset-0"
                                    />
                                    <span className="text-xs text-gray-400 font-medium">Keep me signed in</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={handleOpenForgotModal}
                                    className="text-xs font-semibold text-slate-400 hover:text-slate-300 transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Sign-In Submit button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full cursor-pointer bg-linear-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 disabled:opacity-80 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                <span>{submitBtnText}</span>
                                {isSubmitting && (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                )}
                            </button>
                        </form>

                        {/* Gateway Footer support details */}
                        <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <LuShield className="w-3.5 h-3.5" />
                Secure Gateway
              </span>
                            <a href="#" className="hover:underline hover:text-slate-300">Need immediate help?</a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Global Footer info */}
            <footer className="py-6 text-center text-xs text-gray-600">
                <p>© 2026 Haven Admin Dashboard Engine. All security measures are recorded.</p>
            </footer>

            {/* Floating Forgot Password Modal Backdrop */}
            {forgotModalOpen && (
                <div className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
                    forgotModalVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                    {/* Modal Box */}
                    <div className={`bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl shadow-2xl p-6 transform transition-transform duration-300 ${
                        forgotModalVisible ? 'scale-100' : 'scale-95'
                    }`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-slate-950/50 p-2.5 rounded-xl text-slate-400">
                                <LuCircleHelp className="w-6 h-6" />
                            </div>
                            <button
                                type="button"
                                onClick={handleCloseForgotModal}
                                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-slate-200 transition-colors"
                            >
                                <LuX className="w-5 h-5" />
                            </button>
                        </div>

                        <h3 className="text-lg font-bold text-white">Recover Password</h3>
                        <p className="text-xs text-gray-400 mt-1">Provide your admin email and we will send you security-recovery steps.</p>

                        <form onSubmit={handleForgotSubmit} className="mt-6 space-y-5">
                            <div className="relative">
                                <input
                                    type="email"
                                    id="forgotEmail"
                                    required
                                    placeholder=" "
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    className="peer block w-full px-3 py-2.5 bg-gray-800/40 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all placeholder-transparent"
                                />
                                <label
                                    htmlFor="forgotEmail"
                                    className="absolute left-3 -top-2 px-1 bg-gray-900 text-xs font-semibold text-slate-400 transition-all duration-200 pointer-events-none origin-left
                  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:font-normal
                  peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:bg-gray-900 peer-focus:px-1 peer-focus:font-semibold"
                                >
                                    Registered Admin Email
                                </label>
                            </div>

                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleCloseForgotModal}
                                    className="flex-1 py-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-slate-200 font-semibold text-sm transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 px-4 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-semibold text-sm transition-colors"
                                >
                                    Send Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}