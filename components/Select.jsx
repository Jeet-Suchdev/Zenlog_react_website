import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-[#31363F] text-[#EEEEEE] font-sans outline-none focus:bg-[#222831] focus:ring-2 focus:ring-[#76ABAE] w-full shadow-sm transition-all duration-300 ease-in-out ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
