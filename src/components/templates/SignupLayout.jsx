import React from "react";

export const SignupLayout = (props) => {
  const { formHeader, handleSubmit, formBody } = props;

  return (
    <>
      <div
        className={`
        modal-parent
      `}
      >
        <div
          className={`
          modal-md-center
        `}
        >
          <div
            className={`
            h-full
            flex
            flex-col
            text-white
          `}
          >
            {formHeader}
            <form
              className={`
              h-full
              px-24
              py-4
              text-gray-300
              flex
              flex-col
              md:overflow-y-scroll
              `}
              onSubmit={handleSubmit}
            >
              {formBody}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
