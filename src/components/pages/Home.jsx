import React, { useEffect, useMemo } from "react";
import { HomeLayout } from "../templates/HomeLayout";
import { SideNav } from "../organisms/SideNav";
import { IoIosSearch } from "react-icons/io";
import { TweetForm } from "../organisms/tweets/form/TweetForm";
import { TweetCard } from "../organisms/tweets/card/TweetCard";
import { useTweetAction, useTweetsIndex } from "../../hooks/tweets";
import { REQUEST_STATE } from "../../constants";
import { fetchingActionTypes } from "../../apis/base";
import { deleteTweetsDestroy, fetchTweetsIndex } from "../../apis/tweets";
import { Pagination } from "../organisms/Pagination";
import { useSearchParams } from "react-router-dom";

export const Home = () => {
  const initialFetchState = {
    status: REQUEST_STATE.INITIAL,
    data: [],
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 0;

  const { fetchTweetsState, fetchTweetsDispatch, callback } =
    useTweetsIndex(initialFetchState);

  const handleFetchTweets = async () => {
    await fetchTweetsDispatch({ type: fetchingActionTypes.FETCHING });

    await fetchTweetsIndex(currentPage).then((res) => {
      fetchTweetsDispatch({
        type: res.type,
        payload: res,
        callback: {
          authFiled: callback.authFiled,
        },
      });
    });
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    handleFetchTweets();
    searchParams.get("status") === "tweeted" && setSearchParams();
    setSearchParams({ page: currentPage });
  }, [currentPage, searchParams.get("status")]);

  const sideNavMemo = useMemo(() => <SideNav />, []);

  return (
    <HomeLayout
      sideNav={sideNavMemo}
      header={
        <>
          <div
            className={`
            flex
            justify-between
            px-8
            py-3
            md:hidden
          `}
          >
            <div>icon</div>
            <div>icon</div>
            <div>settings</div>
          </div>
          <nav
            className={`
            flex
            justify-between
            border-b border-gray-500
            md:border-r md:border-gray-500
            py-4
            backdrop-blur-sm
          `}
          >
            <span className="w-1/2 flex justify-center items-center">
              おすすめ
            </span>
            <span className="w-1/2 flex justify-center items-center">
              フォロー中
            </span>
          </nav>
        </>
      }
      tweetForm={<TweetForm successAction={handleFetchTweets} />}
      loading={
        <>
          {fetchTweetsState.status === REQUEST_STATE.LOADING && (
            <div className="flex justify-center py-10 h-screen">
              <div className="loading"></div>
            </div>
          )}
        </>
      }
      bodyContents={
        fetchTweetsState.status === REQUEST_STATE.OK &&
        fetchTweetsState.data.tweets.map((tweet) => (
          <div className="border-b border-gray-500 relative" key={tweet.id}>
            <TweetCard tweet={tweet} type="index" />
          </div>
        ))
      }
      pagination={
        <>
          {fetchTweetsState.status === REQUEST_STATE.OK && (
            <Pagination
              next={fetchTweetsState.data.next}
              afterNext={fetchTweetsState.data.after_next}
            />
          )}
        </>
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
