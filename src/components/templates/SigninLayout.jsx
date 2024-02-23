import React from "react";

export const SigninLayout = (props) => {
  const { formHeader, formBody, handleSubmit, callToActionContents } = props;

  return (
    <>
      <div
        className={`
        modal-parent
        overflow-hidden
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
              gap-10
            `}
              onSubmit={handleSubmit}
            >
              {formBody}
            </form>
            <div
              className={`
              h-full
              px-24
              py-4
              text-gray-300
              flex
              flex-col
              items-center
            `}
            >
              {callToActionContents}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
