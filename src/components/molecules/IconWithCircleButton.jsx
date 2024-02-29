import React from "react";

export const IconWithCircleButton = (props) => {
  const { handleClick, icon } = props;
  return (
    <button
      className={`
      w-full h-full
      bg-black
      rounded-full
      hover:bg-opacity-70
      `}
      onClick={handleClick}
      type="button"
    >
      {icon}
    </button>
  );
};
