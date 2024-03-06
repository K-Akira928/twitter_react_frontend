import React from "react";

export const EditProfileLayout = (props) => {
  const { handleSubmit, formHeader, formBody } = props;
  return (
    <form className="modal-parent z-30 text-white" onSubmit={handleSubmit}>
      <div className="modal-md-center overflow-y-scroll">
        <div className="h-[53px] flex justify-between items-center px-5">
          {formHeader}
        </div>
        <div className="px-5">{formBody}</div>
      </div>
    </form>
  );
};
