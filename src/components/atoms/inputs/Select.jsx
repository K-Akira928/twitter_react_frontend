import React, { memo } from "react";

export const Select = memo((props) => {
  const { children } = props;
  return (
    <select
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
    >
      {children}
    </select>
  );
});
