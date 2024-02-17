import React from "react";

export const TextInput = (props) => {
  return (
    <input
      className={`
      h-14
      w-full
      bg-inherit
      rounded-sm
      outline-none
      outline-2
      outline-gray-400
      border-none
      px-4
      focus:border
      focus:outline-2
      focus:outline-sky-400
  `}
      {...props}
    />
  );
};
