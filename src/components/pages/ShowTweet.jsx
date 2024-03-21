import React, { useEffect } from "react";
import { ShowTweetLayout } from "../templates/ShowTweetLayout";
import { useNavigate, useParams } from "react-router-dom";
import { SideNav } from "../organisms/SideNav";
import { IoIosSearch } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import {
  useTweetAction,
  useTweetCommentsIndex,
  useTweetsShow,
} from "../../hooks/tweets";
import { REQUEST_STATE } from "../../constants";
import { fetchingActionTypes } from "../../apis/base";
import {
  deleteTweetsDestroy,
  favoriteTweetsToggle,
  fetchTweetsShow,
  fetchTweetsShowComments,
  retweetTweetsToggle,
} from "../../apis/tweets";
import { TweetCard } from "../organisms/tweets/card/TweetCard";
import { TweetForm } from "../organisms/tweets/form/TweetForm";

export const ShowTweet = () => {
  const initialFetchState = {
    status: REQUEST_STATE.INITIAL,
    data: [],
  };

  const navigate = useNavigate();

  const { id } = useParams();

  const { fetchTweetState, fetchTweetDispatch, callback } =
    useTweetsShow(initialFetchState);

  const {
    fetchTweetCommentsState,
    fetchTweetCommentsDispatch,
    fetchTweetCommentsCallback,
  } = useTweetCommentsIndex(initialFetchState);

  const [comments, commentsDispatch] = useTweetAction();
  const [parent, parentDispatch] = useTweetAction();

  const handleFetchTweet = async () => {
    await fetchTweetsShow(id).then((res) => {
      fetchTweetDispatch({
        type: res.type,
        payload: res,
        callback: {
          success: () => {
            res.data.tweet.parent &&
              parentDispatch({
                type: "set",
                data: new Array(res.data.tweet.parent),
              });
          },
          authFiled: callback.authFiled,
        },
      });
    });
  };

  const handleFetchComments = async () => {
    await fetchTweetsShowComments(id).then((res) => {
      fetchTweetCommentsDispatch({
        type: res.type,
        payload: res,
        callback: {
          success: () => {
            commentsDispatch({
              type: "set",
              data: res.data.comments,
            });
          },
          authFiled: fetchTweetCommentsCallback.authFiled,
        },
      });
    });
  };

  useEffect(() => {
    handleFetchComments();
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
    });

    fetchTweetDispatch({ type: fetchingActionTypes.FETCHING });
    fetchTweetCommentsDispatch({ type: fetchingActionTypes.FETCHING });

    Promise.all([handleFetchTweet(), handleFetchComments()]);
  }, [id]);

  const handlePrevClick = () => {
    navigate(-1 || "/home");
  };

  return (
    <ShowTweetLayout
      sideNav={<SideNav />}
      header={
        <>
          <nav
            className={`
            flex justify-between
            py-4
            backdrop-blur-sm
          `}
          >
            <div className="flex justify-center items-center px-4">
              <button className="mr-8" onClick={handlePrevClick}>
                <FaArrowLeft />
              </button>
              <span className="font-bold text-xl">ツイートする</span>
            </div>
          </nav>
        </>
      }
      loading={
        <>
          {fetchTweetState.status === REQUEST_STATE.LOADING && (
            <div className="flex justify-center py-10 h-screen">
              <div className="loading"></div>
            </div>
          )}
        </>
      }
      bodyContents={
        fetchTweetState.status === REQUEST_STATE.OK && (
          <>
            {fetchTweetState.data.tweet.parent && (
              <div className="relative">
                <TweetCard
                  tweet={fetchTweetState.data.tweet.parent}
                  type="index"
                />
              </div>
            )}
            <div className="h-full">
              <TweetCard tweet={fetchTweetState.data.tweet} type="show" />
            </div>
            <div className="px-4 pt-3 flex">
              <div className="w-1/12"></div>
              <div className="w-full pl-3">
                <span className="text-gray-400">
                  返信先:
                  <span className="ml-1 text-orange-500">
                    @{fetchTweetState.data.tweet.user.name}
                  </span>
                  <span className="text-gray-400">さん</span>
                </span>
              </div>
            </div>
          </>
        )
      }
      commentForm={
        fetchTweetState.status === REQUEST_STATE.OK && (
          <TweetForm
            successAction={handleFetchComments}
            parentTweetId={fetchTweetState.data.tweet.id}
            type="comment"
          />
        )
      }
      comments={
        fetchTweetCommentsState.status === REQUEST_STATE.OK &&
        comments.map((commentTweet) => (
          <div
            className="border-b border-gray-500 relative"
            key={commentTweet.id}
          >
            <TweetCard tweet={commentTweet} type="index" />
          </div>
        ))
      }
      sideContentsHeader={
        <div className="h-full flex justify-center items-center bg-black">
          <div
            className={`
            h-5/6
            w-10/12
            flex items-center
            bg-zinc-900
            text-gray-400
            rounded-full
            ps-3
          `}
          >
            <IoIosSearch className="h-full size-6 mr-3" />
            <span>検索</span>
          </div>
        </div>
      }
      sideContentsBody={
        <div className="sticky top-0 -z-10">
          <div className="w-full flex justify-center mt-2">
            <div
              className={`
                w-10/12
                bg-zinc-900
                rounded-xl
              `}
            >
              <div className="p-3">
                <h4 className="font-bold text-lg mb-1">
                  プレミアムにサブスクライブ
                </h4>
                <span>
                  サブスクライブして新機能を利用しましょう。資格を満たしている場合、広告収益配分を受け取れます。
                </span>
                <button className="btn-primary w-4/12 mt-2 h-10">
                  購入する
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-2">
            <div
              className={`
                w-10/12
                bg-zinc-900
                rounded-xl
                mt-3
              `}
            >
              <div className="p-3">
                <h4 className="font-bold text-xl mb-1">いまどうしてる？</h4>
                <ul>
                  <li className="py-4 font-bold">PHP</li>
                  <li className="py-4 font-bold">Ruby</li>
                  <li className="py-4 font-bold">React</li>
                  <li className="py-4 font-bold">Rails</li>
                  <li className="py-4 font-bold">Go</li>
                </ul>
                <small className="text-orange-500">さらに表示</small>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-2">
            <div
              className={`
                w-10/12
                bg-zinc-900
                rounded-xl
                mt-3
              `}
            >
              <div className="p-3">
                <h4 className="font-bold text-xl mb-1">おすすめユーザー</h4>
                <ul>
                  <li className="py-4 font-bold">TestUser1</li>
                  <li className="py-4 font-bold">TestUser2</li>
                  <li className="py-4 font-bold">TestUser3</li>
                  <li className="py-4 font-bold">TestUser4</li>
                  <li className="py-4 font-bold">TestUser5</li>
                </ul>
                <small className="text-orange-500">さらに表示</small>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};
