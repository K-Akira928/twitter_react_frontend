import React from "react";

export const SignupLayout = (props) => {
  const { fromHeader, handleSubmit, formBody } = props;

  return (
    <>
      <div
        className={`
        w-screen
        h-screen
        fixed
        top-0
        left-0
        md:bg-slate-600
        md:bg-opacity-50
        md:overflow-hidden
        overflow-y-scroll
      `}
      >
        <div
          className={`
          bg-black
          absolute
          w-full
          md:w-[600px]
          md:h-[700px]
          md:rounded-3xl
          md:left-1/2
          md:top-1/2
          md:-translate-x-1/2
          md:-translate-y-1/2
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
            {fromHeader}
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
