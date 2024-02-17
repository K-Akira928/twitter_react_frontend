import React from "react";

export const SecondaryRoudedButton = (props) => {
  const { children } = props;
  return (
    <button
      className={`
      bg-white
      text-black
      font-bold
      rounded-full
      flex
      justify-center
      items-center
      w-full
      py-2
      transition-all
      duration-200
      hover:bg-opacity-95
      disabled:bg-opacity-90
      `}
      {...props}
    >
      {children}
    </button>
  );
};
