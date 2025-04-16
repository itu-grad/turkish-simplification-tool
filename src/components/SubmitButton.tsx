"use client";
import React from "react";

interface SubmitButtonProps {
    isLoading: boolean;
    text?: string;
    type?: "button" | "submit";
    onClick?: () => void;
}

export default function SubmitButton({
    isLoading,
    text = "Send",
    type = "submit",
    onClick,
}: SubmitButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="mt-6 p-3 bg-button-bg text-secondary-bg rounded-md transition-all duration-300 hover:scale-105 hover:bg-button-hover-bg active:scale-95 cursor-pointer disabled:opacity-50"
            disabled={isLoading}
        >
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
            ) : (
                text
            )}
        </button>
    );
}
