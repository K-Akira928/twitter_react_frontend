import React, { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { LuBookmark } from "react-icons/lu";
import { BiBarChart } from "react-icons/bi";
import { MdOutlineFileUpload } from "react-icons/md";
import { BsPin } from "react-icons/bs";
import { BsStars } from "react-icons/bs";
import { RiFileList2Fill } from "react-icons/ri";
import { BsFillPersonXFill } from "react-icons/bs";
import { BiSolidVolumeMute } from "react-icons/bi";
import { MdOutlineBlock } from "react-icons/md";
import { ImEmbed2 } from "react-icons/im";
import { RiFlag2Line } from "react-icons/ri";
import { TweetImages } from "./TweetImages";
import { Link, useLocation } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../../store/currentUser";

export const TweetCard = (props) => {
  const {
    tweet,
    type,
    handleTweetDelete,
    handleTweetRetweet,
    handleTweetFavorite,
  } = props;

  const currentUser = useRecoilValue(currentUserState);

  const [menuOepn, setMenuOpen] = useState(false);

  const location = useLocation();

  const handleTweetMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleTweetMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div
        className={`
      flex
      px-4 pt-3 pb-1
      ${
        type === "index" &&
        "hover:bg-white hover:bg-opacity-5 hover:cursor-pointer"
      }
      `}
      >
        {type === "index" && (
          <Link
            className="w-full h-full absolute top-0 left-0"
            to={`/tweets/${tweet.id}`}
          />
        )}
        <Link to={`/${tweet.user.name}`} className="size-[40px] mt-2 z-20">
          <div className="w-full h-full">
            {tweet.user.icon ? (
              <img
                className="rounded-full h-full w-full"
                src={tweet.user.icon}
                alt="userIcon"
              />
            ) : (
              <img
                className="rounded-full h-full w-full"
                src="https://placehold.jp/400x400.png"
                alt="userDefaultIcon"
              />
            )}
          </div>
        </Link>
        <div className="w-11/12 flex flex-col">
          <div className="flex justify-between">
            <div className="px-2 z-20">
              <Link to={`/${tweet.user.name}`} className="font-semibold mr-2">
                {tweet.user.nickname}
              </Link>
              {type === "index" ? (
                <>
                  <Link
                    to={`/${tweet.user.name}`}
                    className="text-gray-400 text-sm mr-2"
                  >
                    @{tweet.user.name}
                  </Link>
                  <span className="text-gray-400 text-sm">
                    {new Date(tweet.created_at).toLocaleDateString("ja-JP", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </>
              ) : (
                <div>
                  <Link to={`/${tweet.user.name}`} className="text-gray-400">
                    @{tweet.user.name}
                  </Link>
                </div>
              )}
            </div>
            {menuOepn ? (
              <>
                <div className="size-8"></div>
                <div
                  className="w-full h-full fixed top-0 left-0 hover:cursor-default z-30"
                  onClick={handleTweetMenuClose}
                ></div>
                <div className={`${type === "show" && "w-[400px] relative"}`}>
                  <div
                    className={`
                    z-40
                    bg-black
                    absolute top-3 right-3
                    drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]
                    rounded-2xl
                  `}
                  >
                    <div
                      className={`
                      flex flex-col justify-center
                      items-start font-bold text-[15px]
                      py-5 px-3 gap-y-5
                    `}
                    >
                      {currentUser.id === tweet.user.id ? (
                        <>
                          <button
                            className="text-red-500 w-full flex items-center gap-x-2"
                            onClick={handleTweetDelete}
                          >
                            <FaTrashCan />
                            削除
                          </button>
                          <span className="flex items-center gap-x-2">
                            <BsPin size={19} />
                            プロフィールに固定表示しない
                          </span>
                          <span className="flex items-center gap-x-2">
                            <BsStars size={19} />
                            プロフィールのハイライト
                          </span>
                          <span className="flex items-center gap-x-2">
                            <RiFileList2Fill size={19} />@{tweet.user.name}
                            さんをリストに追加/削除
                          </span>
                          <span className="flex items-center gap-x-2">
                            <BiMessageRounded size={19} />
                            返信できるユーザーを変更
                          </span>
                          <span className="flex items-center gap-x-2">
                            <BiBarChart size={19} />
                            ポストのエンゲージメントを表示
                          </span>
                          <span className="flex items-center gap-x-2">
                            <RiFlag2Line size={19} />
                            ポストのアナリティクスを表示
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="flex items-center gap-x-2">
                            <BsFillPersonXFill size={19} />@{tweet.user.name}
                            さんのフォローを解除
                          </span>
                          <span className="flex items-center gap-x-2">
                            <RiFileList2Fill size={19} />@{tweet.user.name}
                            さんをリストに追加/削除
                          </span>
                          <span className="flex items-center gap-x-2">
                            <BiSolidVolumeMute size={19} />@{tweet.user.name}
                            さんをミュート
                          </span>
                          <span className="flex items-center gap-x-2">
                            <MdOutlineBlock size={19} />@{tweet.user.name}
                            さんをブロック
                          </span>
                          <span className="flex items-center gap-x-2">
                            <BiBarChart size={19} />
                            ポストのエンゲージメントを表示
                          </span>
                          <span className="flex items-center gap-x-2">
                            <ImEmbed2 size={19} />
                            ポストを埋め込む
                          </span>
                          <span className="flex items-center gap-x-2">
                            <BiBarChart size={19} />
                            ポストを報告
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <button
                className={`
                size-8 z-20
                flex justify-center items-center
                rounded-full
                hover:bg-white hover:bg-opacity-5 hover:cursor-pointer
              `}
                onClick={() => {
                  handleTweetMenuOpen();
                }}
              >
                <IoIosMore className="size-5 text-gray-400" />
              </button>
            )}
          </div>
          {type === "index" && (
            <>
              <span className="px-2 break-words whitespace-pre-wrap">
                {tweet.parent && (
                  <div>
                    <span className="text-gray-400 mr-1">返信先:</span>
                    <span className="text-orange-500">
                      @{tweet.parent.user.name}
                    </span>
                  </div>
                )}
                {tweet.content}
                {tweet.images.length ? (
                  <div className="pt-4">
                    <TweetImages
                      images={tweet.images}
                      length={tweet.images.length}
                    />
                  </div>
                ) : null}
              </span>
              <div className="text-gray-400 flex justify-between mt-2 z-10">
                <div className="w-9/12 flex justify-between">
                  <Link
                    className={`
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                    to="/post"
                    state={{
                      backgroundLocation: location,
                      parentTweet: tweet,
                    }}
                  >
                    <BiMessageRounded className="w-[20px] h-[20px]" />
                  </Link>
                  <button
                    className={`
                    ${tweet.action.retweet.retweeted && "text-green-500"}
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-green-500 hover:bg-opacity-20 hover:text-green-500`}
                    to="/"
                    onClick={handleTweetRetweet}
                  >
                    <FaRetweet className="w-[20px] h-[20px]" />
                    {tweet.action.retweet.count > 0 && (
                      <span className="ml-1">{tweet.action.retweet.count}</span>
                    )}
                  </button>
                  <button
                    className={`
                    ${tweet.action.favorite.favorited && "text-pink-500"}
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-pink-500 hover:bg-opacity-20 hover:text-pink-500`}
                    onClick={handleTweetFavorite}
                  >
                    {tweet.action.favorite.favorited ? (
                      <MdFavorite className="w-[20px] h-[20px]" />
                    ) : (
                      <MdFavoriteBorder className="w-[20px] h-[20px]" />
                    )}
                    {tweet.action.favorite.count > 0 && (
                      <span className="ml-1">
                        {tweet.action.favorite.count}
                      </span>
                    )}
                  </button>
                  <Link
                    className={`
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                    to="/"
                  >
                    <BiBarChart className="w-[20px] h-[20px]" />
                  </Link>
                </div>

                <div className="w-2/12 flex justify-end">
                  <Link
                    className={`
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                    to="/"
                  >
                    <LuBookmark className="w-[20px] h-[20px]" />
                  </Link>
                  <Link
                    className={`
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                    to="/"
                  >
                    <MdOutlineFileUpload className="w-[20px] h-[20px]" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {type === "show" && (
        <>
          <div className="px-4 text-xl">
            {tweet.parent && (
              <div>
                <span className="text-orange-500">
                  @{tweet.parent.user.name}
                </span>
              </div>
            )}
            <span>{tweet.content}</span>
            {tweet.images.length ? (
              <div className="pt-4">
                <TweetImages
                  images={tweet.images}
                  length={tweet.images.length}
                />
              </div>
            ) : null}
            <div className="py-4">
              <span className="text-gray-400 my-4 text-base">
                {new Date(tweet.created_at).toLocaleDateString("ja-JP", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>
          </div>
          <div
            className={`
            text-gray-400
            mx-4 py-2
            flex justify-between
            border-t border-b border-gray-500
            `}
          >
            <div className="w-9/12 flex justify-between">
              <Link
                className={`
                size-9
                flex justify-center items-center
                rounded-full
                transition
                hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                to="/post"
                state={{
                  backgroundLocation: location,
                  parentTweet: tweet,
                }}
              >
                <BiMessageRounded className="w-[20px] h-[20px]" />
              </Link>
              <button
                className={`
                ${tweet.action.retweet.retweeted && "text-green-500"}
                size-9
                flex justify-center items-center
                rounded-full
                transition
                hover:bg-green-500 hover:bg-opacity-20 hover:text-green-500`}
                to="/"
                onClick={handleTweetRetweet}
              >
                <FaRetweet className="w-[20px] h-[20px]" />
                {tweet.action.retweet.count > 0 && (
                  <span className="ml-1">{tweet.action.retweet.count}</span>
                )}
              </button>
              <button
                className={`
                    ${tweet.action.favorite.favorited && "text-pink-500"}
                    size-9
                    flex justify-center items-center
                    rounded-full
                    transition
                    hover:bg-pink-500 hover:bg-opacity-20 hover:text-pink-500`}
                onClick={handleTweetFavorite}
              >
                {tweet.action.favorite.favorited ? (
                  <MdFavorite className="w-[20px] h-[20px]" />
                ) : (
                  <MdFavoriteBorder className="w-[20px] h-[20px]" />
                )}
                {tweet.action.favorite.count > 0 && (
                  <span className="ml-1">{tweet.action.favorite.count}</span>
                )}
              </button>
              <Link
                className={`
                size-9
                flex justify-center items-center
                rounded-full
                transition
                hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                to="/"
              >
                <BiBarChart className="w-[20px] h-[20px]" />
              </Link>
            </div>

            <div className="w-2/12 flex justify-end">
              <Link
                className={`
                size-9
                flex justify-center items-center
                rounded-full
                transition
                hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                to="/"
              >
                <LuBookmark className="w-[20px] h-[20px]" />
              </Link>
              <Link
                className={`
                size-9
                flex justify-center items-center
                rounded-full
                transition
                hover:bg-sky-500 hover:bg-opacity-20 hover:text-sky-500`}
                to="/"
              >
                <MdOutlineFileUpload className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
