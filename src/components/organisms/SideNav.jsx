import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { TextWithIcon } from "../molecules/TextWithIcon";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { TbBell } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { RiFileListLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import { RiQuillPenLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../store/currentUser";
import { IoIosMore } from "react-icons/io";

export const SideNav = () => {
  const location = useLocation();
  const currentUser = useRecoilValue(currentUserState);
  return (
    <>
      <div
        className={`
        w-11/12 h-[52px]
        flex justify-between
        md:w-full md:h-full
        md:pr-2
        md:flex md:flex-col
        md:gap-y-2
        xl:p-0
        xl:block
        xl:gap-0
      `}
      >
        <div
          className={`
          hidden
          md:w-[50px] md:h-[50px]
          md:flex md:justify-center md:items-center
          md:py-2
          xl:ps-4
          xl:justify-start
        `}
        >
          <FaXTwitter className="size-7" />
        </div>
        <Link
          className={`
          w-[50px] h-[50px]
          flex items-center justify-center
          xl:w-[260px] xl:h-[58px]
          xl:justify-start
        `}
          to="/home"
        >
          <TextWithIcon
            icon={<GoHomeFill className="size-7" />}
            text="ホーム"
          />
        </Link>
        <div
          className={`
          w-[50px] h-[50px]
          flex items-center justify-center
          xl:w-[260px] xl:h-[58px]
          xl:justify-start
        `}
        >
          <TextWithIcon
            icon={<IoSearch className="size-7" />}
            text="話題を検索"
          />
        </div>
        <Link
          className={`
          w-[50px] h-[50px]
          flex items-center justify-center
          xl:w-[260px] xl:h-[58px]
          xl:justify-start
        `}
          to={"/notifications"}
        >
          <TextWithIcon icon={<TbBell className="size-7" />} text="通知" />
        </Link>
        <div
          className={`
          w-[50px] h-[50px]
          flex items-center justify-center
          xl:w-[260px] xl:h-[58px]
          xl:justify-start
        `}
        >
          <TextWithIcon
            icon={<MdOutlineMail className="size-7" />}
            text="メッセージ"
          />
        </div>
        <div
          className={`
          hidden
          md:w-[50px] md:h-[50px]
          md:flex md:items-center md:justify-center
          xl:w-[260px] xl:h-[58px]
          xl:justify-start
        `}
        >
          <TextWithIcon
            icon={<RiFileListLine className="size-7" />}
            text="リスト"
          />
        </div>
        <div
          className={`
          hidden
          md:w-[50px] md:h-[50px]
          md:flex md:items-center md:justify-center
          xl:w-[260px] xl:h-[58px]
          xl:justify-start
        `}
        >
          <TextWithIcon
            icon={<FaRegBookmark className="size-7" />}
            text="ブックマーク"
          />
        </div>
        <div
          className={`
          hidden
          md:w-[50px] md:h-[50px]
          md:flex md:items-center md:justify-center
          xl:w-[260px] xl:h-[58px]
          xl:justify-start
        `}
        >
          <TextWithIcon
            icon={<IoPeopleOutline className="size-7" />}
            text="コミュニティ"
          />
        </div>
        <div
          className={`
          hidden
          md:w-[50px] md:h-[50px]
          md:flex md:items-center md:justify-center
          xl:w-[260px] xl:h-[58px]
          xl:justify-start
        `}
        >
          <TextWithIcon
            icon={<FaXTwitter className="size-7" />}
            text="プレミアム"
          />
        </div>
        <div
          className={`
          hidden
          md:w-[50px] md:h-[50px]
          md:flex md:items-center md:justify-center
          xl:w-[260px] xl:h-[58px]
          xl:justify-start
        `}
        >
          <Link to={`/${currentUser.name}`}>
            <TextWithIcon
              icon={<IoPersonOutline className="size-7" />}
              text="プロフィール"
            />
          </Link>
        </div>
        <div
          className={`
          hidden
          md:w-[50px] md:h-[50px]
          md:flex md:items-center md:justify-center
          xl:w-[260px] xl:h-[58px]
          xl:justify-start
        `}
        >
          <TextWithIcon
            icon={<CgMoreO className="size-7" />}
            text="もっと見る"
          />
        </div>
      </div>
      <div
        className={`
        w-[55px] h-[55px]
        btn-primary
        absolute right-4 -top-20
        md:hidden
      `}
      >
        <Link
          className="w-full h-full flex justify-center items-center"
          to="/post"
          state={{ backgroundLocation: location }}
        >
          <RiQuillPenLine className="size-7" />
        </Link>
      </div>
      <div className="hidden md:h-full md:w-full md:flex md:flex-col md:justify-between md:items-center md:mt-8 md:mr-2">
        <div className="h-[50px] w-[230px] flex justify-center items-center">
          <button
            className={`
            btn-primary
            w-[58px] h-[58px]
            xl:h-full xl:w-full
          `}
          >
            <Link
              className="w-full h-full flex justify-center items-center"
              to="/post"
              state={{
                backgroundLocation: location,
              }}
            >
              <RiQuillPenLine className="size-7 xl:hidden" />
              <span className="hidden xl:inline">ツイートする</span>
            </Link>
          </button>
        </div>
        <div
          className={`
          w-[58px] h-[58px]
          mb-4
          flex justify-center items-center
          xl:w-[230px]
          xl:h-[68px]
        `}
        >
          <div
            className={`
            w-full h-full
            cursor-pointer
            flex justify-around items-center
            hover:bg-gray-800 hover:bg-opacity-70 hover:rounded-full
            xl:px-3
          `}
          >
            <div className="xl:mr-3 w-3/12">
              <div className="size-[40px]">
                {currentUser.icon ? (
                  <img
                    className="object-cover rounded-full"
                    src={currentUser.icon}
                    alt="currentUserIcon"
                  />
                ) : (
                  <img
                    className="object-cover rounded-full"
                    src="https://placehold.jp/400x400.png"
                    alt="currentUserDefaultIcon"
                  />
                )}
              </div>
            </div>
            <div className=" w-full flex justify-between items-center">
              <div className="hidden xl:block">
                <div>
                  <span className="font-semibold">{currentUser.nickname}</span>
                </div>
                <div>
                  <span className="text-gray-400">@{currentUser.name}</span>
                </div>
              </div>
              <div>
                <IoIosMore size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
