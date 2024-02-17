import React from "react";

export const OutlineRoundedButton = (props) => {
  const { children } = props;
  return (
    <button
      className={`
      text-orange-500
      border
      border-gray-200
      font-bold
      rounded-full
      flex
      justify-center
      items-center
      w-full
      py-2
      transition-all
      duration-200
      hover:bg-slate-900
      hover:bg-opacity-70
  `}
    >
      {children}
    </button>
  );
};
