import React from "react";
import { PostLayout } from "../templates/PostLayout";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TweetForm } from "../organisms/tweets/form/TweetForm";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../store/currentUser";

export const Post = () => {
  const MAX_IMAGE_URL_LENGTH = 30;
  const currentUser = useRecoilValue(currentUserState);
  const location = useLocation();
  const redirectPath =
    location.state.backgroundLocation.pathname +
    location.state.backgroundLocation.search;
  const navigate = useNavigate();
  return (
    <PostLayout
      formHeader={
        <div className="flex justify-between items-start p-4">
          <div className="w-1/3">
            <Link to={redirectPath}>
              <RxCross2 size={25} />
            </Link>
          </div>
        </div>
      }
      commentTarget={
        location.state.parentTweet && (
          <>
            <div className="flex">
              <div className="w-1/12 relative flex flex-col items-center">
                <div className="size-[40px]">
                  {location.state.parentTweet.user.icon ? (
                    <img
                      className="rounded-full h-full w-full"
                      src={location.state.parentTweet.user.icon}
                      alt="userDefaultIcon"
                    />
                  ) : (
                    <img
                      className="rounded-full h-full w-full"
                      src="https://placehold.jp/400x400.png"
                      alt="userDefaultIcon"
                    />
                  )}
                </div>
                <div className="h-full w-[2px] mt-1 bg-gray-500"></div>
              </div>
              <div className="w-11/12">
                <span className="font-bold mr-1">
                  {location.state.parentTweet.user.nickname}
                </span>
                <span className="text-gray-400">
                  @{location.state.parentTweet.user.name}
                </span>
                <div>
                  <span>{location.state.parentTweet.content}</span>

                  {location.state.parentTweet.images.length ? (
                    <span className="break-words whitespace-pre-wrap">
                      {location.state.parentTweet.images[0].length >
                        MAX_IMAGE_URL_LENGTH &&
                        location.state.parentTweet.images[0].slice(
                          0,
                          MAX_IMAGE_URL_LENGTH
                        ) + "..."}
                    </span>
                  ) : null}
                  <div className="py-2">
                    <span className="text-gray-500">
                      返信先:
                      <span className="text-orange-500 ml-1">
                        @{location.state.parentTweet.user.name}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
      formBody={
        <TweetForm
          successAction={() =>
            navigate(
              `${redirectPath}${
                location.state.backgroundLocation.search.length
                  ? "&status=tweeted"
                  : "?status=tweeted"
              }`
            )
          }
          parentTweetId={location.state.parentTweet?.id || null}
          currentUser={currentUser}
          type={location.state.parentTweet ? "comment" : null}
        />
      }
    />
  );
};
