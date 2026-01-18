"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

export default function Button({
  type = "button",
  children,
  onClick,
  disabled,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "rounded-md px-4 cursor-pointer py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
        variant === "secondary" &&
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
        variant === "danger" &&
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
        className
      )}
    >
      {children}
    </button>
  );
}
