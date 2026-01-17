"use client";

import React from "react";

interface ButtonProps {
  type?: "button" | "submit";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  type = "button",
  children,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px",
        borderRadius: 6,
        border: "none",
        cursor: "pointer",
        backgroundColor: "#000",
        color: "#fff",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}
