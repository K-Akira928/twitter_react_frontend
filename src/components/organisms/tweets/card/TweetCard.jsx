import React from "react";
import { IoIosMore } from "react-icons/io";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { LuBookmark } from "react-icons/lu";
import { BiBarChart } from "react-icons/bi";
import { MdOutlineFileUpload } from "react-icons/md";
import { TweetImages } from "./TweetImages";

export const TweetCard = (props) => {
  const { tweet } = props;

  return (
    <div className="flex px-4 pt-3 pb-1 hover:bg-white hover:bg-opacity-5 hover:cursor-pointer">
      <div className="w-1/12">
        <div className="w-11/12">
          {tweet.user.icon ? (
            <img
              className="rounded-full"
              src={tweet.user.icon}
              alt="userIcon"
            />
          ) : (
            <img
              className="rounded-full"
              src="https://placehold.jp/400x400.png"
              alt="userDefaultIcon"
            />
          )}
        </div>
      </div>
      <div className="w-11/12 flex flex-col">
        <div className="flex justify-between">
          <div className="px-2">
            <span className="font-semibold mr-2">{tweet.user.nickname}</span>
            <span className="text-gray-400 text-sm mr-2">
              @{tweet.user.name}
            </span>
            <span className="text-gray-400 text-sm">
              {new Date(tweet.created_at).toLocaleDateString("ja-JP", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="h-full flex items-center pr-2">
            <IoIosMore className="size-5 text-gray-400" />
          </div>
        </div>
        <span className="px-2 break-words whitespace-pre-wrap">
          {tweet.content}
          {tweet.images.length ? (
            <div className="pt-4">
              <TweetImages images={tweet.images} length={tweet.images.length} />
            </div>
          ) : null}
        </span>
        <div className="text-gray-400 flex justify-between mt-2">
          <div className="w-9/12 flex justify-between">
            <a
              className={`
              size-9
              flex justify-center items-center
              rounded-full
              transition
              hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
              href="/"
            >
              <BiMessageRounded className="w-[20px] h-[20px]" />
            </a>
            <a
              className={`
              size-9
              flex justify-center items-center
              rounded-full
              transition
              hover:bg-green-500 hover:bg-opacity-20 hover:text-green-500`}
              href="/"
            >
              <FaRetweet className="w-[20px] h-[20px]" />
            </a>
            <a
              className={`
              size-9
              flex justify-center items-center
              rounded-full
              transition
              hover:bg-pink-500 hover:bg-opacity-20 hover:text-pink-500`}
              href="/"
            >
              <MdFavoriteBorder className="w-[20px] h-[20px]" />
            </a>
            <a
              className={`
              size-9
              flex justify-center items-center
              rounded-full
              transition
              hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
              href="/"
            >
              <BiBarChart className="w-[20px] h-[20px]" />
            </a>
          </div>

          <div className="w-2/12 flex justify-end">
            <a
              className={`
              size-9
              flex justify-center items-center
              rounded-full
              transition
              hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
              href="/"
            >
              <LuBookmark className="w-[20px] h-[20px]" />
            </a>
            <a
              className={`
              size-9
              flex justify-center items-center
              rounded-full
              transition
              hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
              href="/"
            >
              <MdOutlineFileUpload className="w-[20px] h-[20px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
