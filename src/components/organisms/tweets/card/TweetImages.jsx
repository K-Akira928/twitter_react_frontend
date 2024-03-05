import React from "react";
import { Link, useLocation } from "react-router-dom";

export const TweetImages = (props) => {
  const { images, length } = props;
  const location = useLocation();

  return (
    <div className={length > 1 && "w-full h-[290px] flex justify-between"}>
      {length === 4 ? (
        <div className="w-[49.5%] flex flex-col justify-between">
          <div className="h-[49%] relative">
            <Link
              to={`/photo/${0}`}
              state={{
                backgroundLocation: location,
                images: images,
              }}
              images={images}
            >
              <img
                className="w-full h-full object-cover rounded-ss-2xl hover:cursor-pointer"
                src={images[0]}
                alt=""
              />
            </Link>
          </div>
          <div className="h-[49%] relative">
            <Link
              to={`/photo/${1}`}
              state={{
                backgroundLocation: location,
                images: images,
              }}
              images={images}
            >
              <img
                className="w-full h-full object-cover rounded-es-2xl hover:cursor-pointer"
                src={images[2]}
                alt=""
              />
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={length === 1 ? "w-full relative" : "w-[49.5%] relative"}
        >
          <Link
            to={`/photo/${0}`}
            state={{
              backgroundLocation: location,
              images: images,
            }}
            images={images}
          >
            <img
              className={`w-full h-full object-cover hover:cursor-pointer ${
                length === 1 ? "rounded-2xl" : "rounded-s-2xl"
              }`}
              src={images[0]}
              alt=""
            />
          </Link>
        </div>
      )}
      {length > 1 &&
        (length === 2 ? (
          <div className="w-[49.5%] relative">
            <Link
              to={`/photo/${1}`}
              state={{
                backgroundLocation: location,
                images: images,
              }}
              images={images}
            >
              <img
                className="w-full h-full object-cover rounded-e-2xl hover:cursor-pointer"
                src={images[1]}
                alt=""
              />
            </Link>
          </div>
        ) : (
          <div className="w-[49.5%] flex flex-col justify-between">
            <div className="h-[49%] relative">
              <Link
                to={`/photo/${length === 3 ? "1" : "2"}`}
                state={{
                  backgroundLocation: location,
                  images: images,
                }}
                images={images}
              >
                <img
                  className="w-full h-full object-cover rounded-se-2xl hover:cursor-pointer"
                  src={images[1]}
                  alt=""
                />
              </Link>
            </div>
            <div className="h-[49%] relative">
              <Link
                to={`/photo/${length === 3 ? "2" : "3"}`}
                state={{
                  backgroundLocation: location,
                  images: images,
                }}
                images={images}
              >
                <img
                  className="w-full h-full object-cover rounded-ee-2xl hover:cursor-pointer"
                  src={length === 3 ? images[2] : images[3]}
                  alt=""
                />
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};
