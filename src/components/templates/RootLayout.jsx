import React from "react";

export const RootLayout = (props) => {
  const { logo, callToActionHeading, flashMessages, callToActionContents } =
    props;
  return (
    <>
      <div
        className={`
        h-screen
        text-gray-300
        flex
        flex-col
        md:flex-row
        md:justify-center
        p-5
        gap-y-6
      `}
      >
        <div
          className={`
          w-11
          md:w-2/5
          flex
          justify-center
          items-center
        `}
        >
          {logo}
        </div>
        <div
          className={`
          flex
          justify-center
          items-start
          flex-col
          lg:w-[720px]
          gap-y-10
        `}
        >
          <div
            className={`
            flex
            flex-col
            gap-y-10
            text-wrap
          `}
          >
            {flashMessages}
            {callToActionHeading}
          </div>
          <div className="w-[266px] flex flex-col gap-y-3">
            {callToActionContents}
          </div>
        </div>
      </div>
    </>
  );
};
