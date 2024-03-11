import React from "react";

export const PostLayout = (props) => {
  const { formHeader, formBody, commentTarget } = props;
  return (
    <div className="h-screen z-30 text-white modal-parent overflow-hidden">
      <div className="modal-md-center md:h-auto">
        {formHeader}
        <div
          className={`
          md:h-full
          px-8 md:py-4
        `}
        >
          {commentTarget}
          <div className="flex">{formBody}</div>
        </div>
      </div>
    </div>
  );
};
