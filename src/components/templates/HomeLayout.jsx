import React from "react";

export const HomeLayout = (props) => {
  const {
    sideNav,
    header,
    tweetForm,
    bodyContents,
    sideContentsHeader,
    sideContentsBody,
  } = props;
  return (
    <>
      <div
        className={`
        text-white
        md:flex
        md:justify-center
      `}
      >
        <div
          className={`
          md:grid
          md:grid-cols-[68px_600px]
          md:grid-rows-[68px-1fr]
          lg:grid-cols-[68px_600px_330px]
          xl:grid-cols-[260px_600px_370px]
        `}
        >
          <div
            className={`
            sticky
            top-0
            z-30
            md:col-start-2 md:col-end-3
            md:row-start-1 md:row-end-2
          `}
          >
            {header}
          </div>
          <div
            className={`
            h-[2000px]
            md:border-r md:border-gray-500
            lg:col-start-2
          `}
          >
            <div className="hidden md:block md:px-5 md:py-2 md:border-b md:border-gray-500">
              {tweetForm}
            </div>
            {bodyContents}
          </div>
          <div
            className={`
            hidden
            lg:sticky
            lg:top-0
            lg:block
            lg:col-start-3 lg:col-end-4
            lg:row-start-1
          `}
          >
            {sideContentsHeader}
          </div>
          <div
            className={`
            hidden
            lg:block
            h-full
          `}
          >
            {sideContentsBody}
          </div>
          <nav
            className={`
            flex justify-center items-center
            sticky bottom-0
            border-t border-gray-500
            md:border-t-0
            md:h-screen
            md:sticky
            md:top-0
            md:col-start-1 md:row-start-1
            md:row-span-2
            md:flex md:flex-col md:justify-between md:items-center
            md:border-r
            md:border-gray-500
          `}
          >
            {sideNav}
          </nav>
        </div>
      </div>
    </>
  );
};
