import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-[#31363F] text-[#EEEEEE] font-sans outline-none focus:bg-[#222831] focus:ring-2 focus:ring-[#76ABAE] w-full placeholder:text-[#EEEEEE]/50 shadow-sm transition-all duration-300 ease-in-out ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
