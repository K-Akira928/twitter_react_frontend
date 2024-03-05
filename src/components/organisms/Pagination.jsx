import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export const Pagination = (props) => {
  const { next, afterNext } = props;

  const [searchParams] = useSearchParams();

  const currentPageNum = searchParams.get("page") || 0;

  const pageNum = {
    beforePrevPage: Number(currentPageNum) - 2,
    prevPage: Number(currentPageNum) - 1,
    currentPage: Number(currentPageNum),
    nextPage: Number(currentPageNum) + 1,
    afterNextPage: Number(currentPageNum) + 2,
  };

  return (
    <div className="text-white  flex justify-center">
      <div className="h-10 flex justify-around w-8/12 md:w-1/2">
        <div className="size-8">
          {pageNum.prevPage >= 0 ? (
            <>
              <Link
                className="size-8 bg-black font-bold rounded-full flex justify-center items-center hover:bg-gray-500"
                to={`/home?page=${pageNum.prevPage}`}
              >
                前
              </Link>
            </>
          ) : (
            <div className="size-8"></div>
          )}
        </div>

        {pageNum.beforePrevPage >= 0 ? (
          <Link
            className="size-8 bg-black font-bold rounded-full flex justify-center items-center hover:bg-gray-500"
            to={`/home?page=${pageNum.beforePrevPage}`}
          >
            {pageNum.beforePrevPage}
          </Link>
        ) : (
          <div className="size-8 font-bold flex justify-center items-center">
            {pageNum.currentPage === 1 && "…"}
          </div>
        )}

        {pageNum.prevPage >= 0 ? (
          <Link
            className="size-8 bg-black font-bold rounded-full flex justify-center items-center hover:bg-gray-500"
            to={`/home?page=${pageNum.prevPage}`}
          >
            {pageNum.prevPage}
          </Link>
        ) : (
          <div className="size-8"></div>
        )}

        <div className="size-8 bg-orange-500 font-bold rounded-full flex justify-center items-center">
          <span>{pageNum.currentPage}</span>
        </div>

        {next && (
          <Link
            className="size-8 bg-black font-bold rounded-full flex justify-center items-center hover:bg-gray-500"
            to={`/home?page=${pageNum.nextPage}`}
          >
            {pageNum.nextPage}
          </Link>
        )}

        {afterNext ? (
          <Link
            className="size-8 bg-black font-bold rounded-full flex justify-center items-center hover:bg-gray-500"
            to={`/home?page=${pageNum.afterNextPage}`}
          >
            {pageNum.afterNextPage}
          </Link>
        ) : (
          <div className="size-8"></div>
        )}

        {next ? (
          <Link
            className="size-8 bg-black font-bold rounded-full flex justify-center items-center hover:bg-gray-500"
            to={`/home?page=${pageNum.nextPage}`}
          >
            次
          </Link>
        ) : (
          <div className="size-8"></div>
        )}
      </div>
    </div>
  );
};
