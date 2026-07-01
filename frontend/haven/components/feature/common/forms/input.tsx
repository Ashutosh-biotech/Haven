"use client";

import React, {useState} from "react";

interface FloatingLabelInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id?: string;
    className?: string;
    containerClassName?: string;
    error?: string;
    type?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
                                                                   label,
                                                                   id,
                                                                   className = "",
                                                                   containerClassName = "",
                                                                   error,
                                                                   type = "text",
                                                                   ...props
                                                               }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);

        if (props.onFocus) {
            props.onFocus(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        setHasValue(!!e.target.value);

        if (props.onBlur) {
            props.onBlur(e);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(!!e.target.value);

        if (props.onChange) {
            props.onChange(e);
        }
    };

    const isLabelFloating = isFocused || hasValue;

    return (
        <div className={`relative ${containerClassName}`}>
            <input
                id={id}
                type={type}
                className={`
          peer
          w-full
          px-3
          pt-5
          pb-2
          text-white
          bg-transparent
          border-2
          border-white
          rounded-md
          outline-none
          transition-all
          duration-200
          placeholder-transparent
          ${className}
        `}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                {...props}
            />

            <label
                htmlFor={id}
                className={`
          absolute
          left-3
          transition-all
          duration-200
          pointer-events-none
          ${
                    isLabelFloating
                        ? "text-sm -top-2.5 bg-gray-900 px-1 text-white"
                        : "text-base top-3.5 text-gray-400"
                }
        `}
            >
                {label}
            </label>

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default FloatingLabelInput;