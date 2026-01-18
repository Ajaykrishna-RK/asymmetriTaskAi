"use client";

import React from "react";

interface AuthWrapperProps {
  title: string;
  children: React.ReactNode;
  footerText: string;
  footerActionText: string;
  onFooterAction: () => void;
}

export default function AuthWrapper({
  title,
  children,
  footerText,
  footerActionText,
  onFooterAction,
}: AuthWrapperProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {/* Title */}
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-800">
          {title}
        </h1>

        {/* Form */}
        {children}

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {footerText}{" "}
          <button
            onClick={onFooterAction}
            className="cursor-pointer font-medium text-blue-600 hover:underline"
          >
            {footerActionText}
          </button>
        </p>
      </div>
    </div>
  );
}
