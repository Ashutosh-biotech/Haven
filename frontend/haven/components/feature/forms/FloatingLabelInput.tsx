"use client";

import React from "react";
import { IconType } from "react-icons";

interface FloatingLabelInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
    label: string;
    id: string;
    error?: string;
    containerClassName?: string;
    icon?: IconType;
    iconPosition?: "left" | "right";
    iconClassName?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
    label,
    id,
    className = "",
    containerClassName = "",
    error,
    type = "text",
    icon: Icon,
    iconPosition = "left",
    iconClassName = "",
    ...props
}) => {
    
    // Calculate precise horizontal padding depending on icon existence/placement
    const getPaddingClass = () => {
        if (!Icon) return "px-4";
        if (iconPosition === "left") return "pl-11 pr-4";
        return "pl-4 pr-11";
    };

    return (
        <div className={`relative w-full ${containerClassName}`}>
            {/* Left Icon */}
            {Icon && iconPosition === "left" && (
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center">
                    <Icon className={`text-xl text-white/40 peer-focus:text-[#145a6e] transition-colors duration-200 ${iconClassName}`} />
                </div>
            )}

            <input
                id={id}
                type={type}
                placeholder=" " // Keep this single space! It triggers the CSS :placeholder-shown state natively
                className={`
                    peer w-full pt-6 pb-2 text-white bg-transparent border-2 rounded-2xl outline-none transition-all duration-200
                    ${getPaddingClass()}
                    ${error 
                        ? "border-red-500 focus:border-red-500 text-red-200" 
                        : "border-white/20 focus:border-[#145a6e] focus:bg-white/5"
                    } 
                    ${className}
                `}
                {...props}
            />

            {/* Label - pure CSS floating mechanism, no JS required */}
            <label
                htmlFor={id}
                className={`
                    absolute transition-all duration-200 pointer-events-none origin-top-left font-medium
                    ${iconPosition === "left" && Icon ? "left-11" : "left-4"}
                    
                    /* Default state: centered and matching text size */
                    top-1/2 -translate-y-1/2 text-sm text-white/40
                    
                    /* Floated state: shifts up when focused OR when text is present */
                    peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-[#145a6e] peer-focus:font-semibold
                    peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#145a6e]
                `}
            >
                {label}
            </label>

            {/* Right Icon */}
            {Icon && iconPosition === "right" && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center">
                    <Icon className={`text-xl text-white/40 peer-focus:text-[#145a6e] transition-colors duration-200 ${iconClassName}`} />
                </div>
            )}

            {/* Error Message */}
            {error && (
                <p className="mt-1.5 ml-2 text-xs font-medium text-red-400 tracking-wide animate-fadeIn">
                    {error}
                </p>
            )}
        </div>
    );
};

export default FloatingLabelInput;