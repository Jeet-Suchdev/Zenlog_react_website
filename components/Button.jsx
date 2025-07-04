import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-[#76ABAE]",
  textColor = "text-[#222831]",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 md:px-6 md:py-2.5 rounded-xl font-sans font-bold text-base md:text-lg ${bgColor} ${textColor} hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#76ABAE] transition-all duration-300 ease-in-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
