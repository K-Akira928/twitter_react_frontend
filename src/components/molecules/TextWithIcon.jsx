import React from "react";

export const TextWithIcon = (props) => {
  const { text, icon } = props;
  return (
    <div
      className={`
      flex items-center
      p-3
      hover:bg-gray-800
      hover:bg-opacity-70
      hover:rounded-full
    `}
    >
      <span className="xl:pr-4">{icon}</span>
      <span className="hidden xl:inline font-bold text-xl">{text}</span>
    </div>
  );
};
