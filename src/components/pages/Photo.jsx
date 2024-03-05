import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

export const Photo = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const hanldeModalClose = (e) => {
    e.target === e.currentTarget &&
      navigate(
        location.state.backgroundLocation.pathname +
          location.state.backgroundLocation.search
      );
  };

  return (
    <div
      className="bg-black text-white z-30 modal-parent md:bg-slate-600 md:bg-opacity-50 flex justify-center items-center"
      onClick={hanldeModalClose}
    >
      <div
        className={`
        absolute
        md:bg-opacity-0
        md:max-h-none
        md:top-1/2
        md:left-1/2
        md:-translate-x-1/2
        md:-translate-y-1/2
        `}
      >
        <div className="h-full">
          <Link
            className={`
            absolute top-2 right-2
            z-40
            size-[40px]
            bg-black bg-opacity-50
            flex justify-center items-center
            rounded-full
            `}
            to={
              location.state.backgroundLocation.pathname +
              location.state.backgroundLocation.search
            }
          >
            <RxCross2 />
          </Link>
          {id !== "0" && (
            <Link
              className={`
              absolute left-2 top-1/2
              size-[40px]
              bg-black bg-opacity-50
              rounded-full
              flex justify-center items-center
              `}
              rounded-full
              to={`/photo/${Number(id) - 1}`}
              state={{
                backgroundLocation: location.state.backgroundLocation,
                images: location.state.images,
              }}
            >
              <FaArrowLeft />
            </Link>
          )}
          {location.state.images.length - 1 !== Number(id) && (
            <Link
              className={`
              absolute right-2 top-1/2
              size-[40px]
              bg-black bg-opacity-50
              rounded-full
              flex justify-center items-center
              `}
              to={`/photo/${Number(id) + 1}`}
              state={{
                backgroundLocation: location.state.backgroundLocation,
                images: location.state.images,
              }}
            >
              <FaArrowRight />
            </Link>
          )}
          <img
            className="max-h-screen"
            src={location.state.images[id]}
            alt="tweetImages"
          />
        </div>
      </div>
    </div>
  );
};
