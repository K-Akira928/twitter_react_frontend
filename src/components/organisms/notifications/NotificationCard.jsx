import React from "react";
import { MdFavorite } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { Link } from "react-router-dom";

export const NotificationCard = (props) => {
  const { notice } = props;
  return (
    <div
      className={`
      flex
      px-4 py-4
      border-b border-gray-500
    `}
    >
      <div className="w-[40px] flex justify-center">
        {notice.type === "いいね" ? (
          <MdFavorite className="text-pink-500" size={32} />
        ) : (
          <IoPerson className="text-sky-500" size={32} />
        )}
      </div>
      <div className="px-2 flex flex-col">
        <div className="size-[32px]">
          {notice.user.icon ? (
            <img
              className="rounded-full h-full w-full"
              src={notice.user.icon}
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
        <div>
          {notice.type === "いいね" ? (
            <div>
              <Link className="font-semibold" to={`/${notice.user.name}`}>
                {notice.user.nickname}
              </Link>
              さんがあなたのツイートをいいねしました
              <div>
                <Link
                  className="text-gray-500"
                  to={`/tweets/${notice.tweet.id}`}
                >
                  <span>{notice.tweet.content}</span>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <Link className="font-semibold" to={`/${notice.user.name}`}>
                {notice.user.nickname}
              </Link>
              さんにフォローされました
              <div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
