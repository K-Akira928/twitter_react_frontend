import React from "react";

export const ImageWithAction = (props) => {
  const { imageUrl, action } = props;
  return (
    <>
      <img
        className="rounded-2xl w-full h-full object-cover"
        src={imageUrl}
        alt="selectImagePreview"
      />
      <div>{action}</div>
    </>
  );
};
