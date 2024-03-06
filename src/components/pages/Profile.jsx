import React, { useEffect } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ProfileLayout } from "../templates/ProfileLayout";
import { SideNav } from "../organisms/SideNav";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosMore, IoIosSearch } from "react-icons/io";
import { LuMail } from "react-icons/lu";
import { LuBellPlus } from "react-icons/lu";
import { REQUEST_STATE } from "../../constants";
import { useUsersShow } from "../../hooks/users";
import { fetchUsersShow } from "../../apis/users";
import { fetchingActionTypes } from "../../apis/base";
import { TweetCard } from "../organisms/tweets/card/TweetCard";
import { CiLocationOn } from "react-icons/ci";
import { PiLinkSimpleBold } from "react-icons/pi";

export const Profile = () => {
  const initialFetchState = {
    status: REQUEST_STATE.INITIAL,
    data: [],
  };

  const { name } = useParams();

  const location = useLocation();

  const [searchParams] = useSearchParams();
  const isTab = searchParams.get("tab") || "tweets";

  const { fetchUserState, fetchUserDispatch, callback } =
    useUsersShow(initialFetchState);

  useEffect(() => {
    fetchUserDispatch({ type: fetchingActionTypes.FETCHING });

    fetchUsersShow(name).then((res) => {
      fetchUserDispatch({
        type: res.type,
        payload: res,
        callback: {
          authFiled: callback.authFiled,
        },
      });
    });
  }, [location]);

  return (
    <ProfileLayout
      header={
        <>
          {fetchUserState.status !== REQUEST_STATE.LOADING &&
            REQUEST_STATE.INITIAL && (
              <nav
                className={`
              flex justify-between
              py-2
              backdrop-blur-sm
            `}
              >
                <div className="flex justify-center items-center px-4">
                  <Link className="mr-8" to="/home">
                    <FaArrowLeft />
                  </Link>
                  <div className="flex flex-col">
                    <span className="font-bold text-xl">{name}</span>
                    <small className="text-gray-400">
                      {fetchUserState.data.tweets?.length}件のツイート
                    </small>
                  </div>
                </div>
              </nav>
            )}
        </>
      }
      loading={
        <>
          {fetchUserState.status === REQUEST_STATE.LOADING && (
            <div className="flex justify-center py-10 h-screen">
              <div className="loading"></div>
            </div>
          )}
        </>
      }
      profile={
        <>
          {fetchUserState.status === REQUEST_STATE.OK && (
            <div className="border-b border-gray-400">
              <div className="w-full h-[200px] relative">
                <img
                  className="w-full h-full object-cover"
                  src={
                    fetchUserState.data.user.header ||
                    "https://placehold.jp/1500x500.png"
                  }
                  alt="header"
                />
                <div className="size-[135px] absolute -bottom-1/4 left-4">
                  <img
                    className="w-full h-full object-cover rounded-full border-4 border-black"
                    src={
                      fetchUserState.data.user.icon ||
                      "https://placehold.jp/400x400.png"
                    }
                    alt="header"
                  />
                </div>
              </div>
              <div className="w-full h-16 flex justify-end px-3 py-2">
                {fetchUserState.data.is_current_user ? (
                  <Link
                    to="/settings/profile"
                    className={`
                    h-[34px] text-sm px-5
                    flex justify-center items-center
                    transition border rounded-full
                    hover:bg-opacity-10 hover:bg-white
                    `}
                    state={{
                      backgroundLocation: location,
                      user: fetchUserState.data.user,
                    }}
                  >
                    プロフィールを編集
                  </Link>
                ) : (
                  <>
                    <button
                      className={`
                      size-[34px]
                      flex justify-center items-center
                      border rounded-full mr-3 transition
                      hover:bg-opacity-10 hover:bg-white
                    `}
                    >
                      <IoIosMore />
                    </button>
                    <button
                      className={`
                      size-[34px]
                      flex justify-center items-center
                      border rounded-full mr-3 transition
                      hover:bg-opacity-10 hover:bg-white
                    `}
                    >
                      <LuMail />
                    </button>
                    <button
                      className={`
                      size-[34px]
                      flex justify-center items-center
                      border rounded-full mr-3 transition
                      hover:bg-opacity-10 hover:bg-white
                    `}
                    >
                      <LuBellPlus />
                    </button>
                    <button
                      className={`
                      h-[34px] px-4
                      flex justify-center items-center
                      border rounded-full mr-3 transition
                      hover:bg-opacity-10 hover:bg-white
                    `}
                    >
                      フォロー中
                    </button>
                  </>
                )}
              </div>
              <div className="px-3 pb-4 flex flex-col">
                <span className="font-bold text-xl">
                  {fetchUserState.data.user?.nickname}
                </span>
                <span className="text-gray-400">
                  @{fetchUserState.data.user?.name}
                </span>
              </div>
              <div className="px-3">
                <span>{fetchUserState.data.user?.bio}</span>
              </div>
              <div className="px-3 py-2">
                <span className="text-gray-400 flex items-center">
                  {fetchUserState.data.user?.location && (
                    <>
                      <CiLocationOn />
                      <span className="mr-2">
                        {fetchUserState.data.user.location}
                      </span>
                    </>
                  )}
                  {fetchUserState.data.user?.website && (
                    <>
                      <PiLinkSimpleBold />
                      {
                        <a
                          className="text-orange-500 hover:underline"
                          href={fetchUserState.data.user?.website}
                        >
                          {fetchUserState.data.user?.website}
                        </a>
                      }
                    </>
                  )}
                </span>
              </div>
              <div className="px-3 flex">
                <div className="mr-3">
                  <span className="font-semibold mr-1">11</span>
                  <span className="text-gray-400">フォロー中</span>
                </div>
                <div>
                  <span className="font-semibold mr-1">22</span>
                  <span className="text-gray-400">フォロワー</span>
                </div>
              </div>
              <div className="flex h-[50px] my-1 mt-2">
                <div
                  className={`
                    w-1/4 h-full
                    relative
                    flex justify-center items-center
                    hover:bg-white hover:bg-opacity-5 hover:cursor-pointer transition
                  `}
                >
                  <span
                    className={`${
                      isTab === "tweets" &&
                      `before:bg-orange-500
                        before:h-1 before:w-1/2
                        before:absolute before:rounded-full
                        before:left-1/4 before:bottom-0`
                    }`}
                  >
                    ツイート
                  </span>
                </div>
                <div
                  className={`
                  w-1/4 h-full
                  flex justify-center items-center
                  hover:bg-white hover:bg-opacity-5 hover:cursor-pointer transition
                `}
                >
                  <span>返信</span>
                </div>
                <div
                  className={`
                  w-1/4 h-full
                  flex justify-center items-center
                  hover:bg-white hover:bg-opacity-5 hover:cursor-pointer transition
                `}
                >
                  <span>メディア</span>
                </div>
                <div
                  className={`
                  w-1/4 h-full
                  flex justify-center items-center
                  hover:bg-white hover:bg-opacity-5 hover:cursor-pointer transition
                `}
                >
                  <span>いいね</span>
                </div>
              </div>
            </div>
          )}
        </>
      }
      profileTweets={
        <>
          {fetchUserState.data?.tweets &&
            fetchUserState.data?.tweets.map((tweet) => (
              <div className="border-b border-gray-500 relative" key={tweet.id}>
                <TweetCard tweet={tweet} type="index" />
              </div>
            ))}
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
      sideNav={<SideNav />}
    />
  );
};
