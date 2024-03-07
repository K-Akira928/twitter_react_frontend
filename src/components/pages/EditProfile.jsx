import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { REQUEST_STATE } from "../../constants";
import { patchUsersUpdate } from "../../apis/users";
import { useUsersUpdate } from "../../hooks/users";
import { patchActionTypes } from "../../apis/base";
import { EditProfileLayout } from "../templates/EditProfileLayout";

export const EditProfile = () => {
  const initialPatchState = {
    status: REQUEST_STATE.INITIAL,
    data: [],
  };

  const { patchUserState, patchUserDispatch, callback } =
    useUsersUpdate(initialPatchState);

  const navigate = useNavigate();

  const location = useLocation();

  const [headerImage, setHeaderImage] = useState(
    location.state.user.header || null
  );
  const [iconImage, setIconImage] = useState(location.state.user.icon || null);

  const handleTextareaChange = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const hadnleHeaderChange = (e) => {
    const headerImage = URL.createObjectURL(e.target.files[0]);
    setHeaderImage(headerImage);
  };

  const hadnleIconChange = (e) => {
    const iconImage = URL.createObjectURL(e.target.files[0]);
    setIconImage(iconImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    patchUserDispatch({ type: patchActionTypes.PATCHING });

    patchUsersUpdate(location.state.user.name, formData).then((res) => {
      patchUserDispatch({
        type: res.type,
        payload: res.data,
        callback: {
          success: () => {
            navigate(
              location.state.backgroundLocation.pathname +
                location.state.backgroundLocation.search
            );
          },
          authFiled: callback.authFiled,
        },
      });
    });
  };

  return (
    <EditProfileLayout
      handleSubmit={handleSubmit}
      formHeader={
        <>
          <div className="flex items-center">
            <Link
              to={
                location.state.backgroundLocation.pathname +
                location.state.backgroundLocation.search
              }
              className="mr-8"
            >
              <RxCross2 size={25} />
            </Link>
            <span className="text-xl font-bold">プロフィールを編集</span>
          </div>
          <div className="w-[62px] h-8">
            <button
              className="btn-secondary h-full disabled:bg-opacity-70"
              type="submit"
              disabled={patchUserState.status === REQUEST_STATE.LOADING}
            >
              保存
            </button>
          </div>
        </>
      }
      formBody={
        <>
          <div className="w-full h-[200px] relative">
            <label>
              <input
                className="hidden"
                type="file"
                name="user[header]"
                accept="image/jpeg, image/png"
                onChange={hadnleHeaderChange}
              />
              <div>
                <div
                  className={`
                  size-[50px]
                  flex justify-center items-center
                bg-black bg-opacity-50 rounded-full
                  absolute
                  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                  hover:cursor-pointer
                  `}
                >
                  <MdOutlineAddAPhoto size={30} />
                </div>
              </div>
            </label>
            <img
              className="w-full h-full object-cover"
              src={headerImage || "https://placehold.jp/1500x500.png"}
              alt="header"
            />
            <div className="size-[135px] absolute -bottom-1/4 left-4">
              <label>
                <input
                  className="hidden"
                  type="file"
                  name="user[icon]"
                  accept="image/jpeg, image/png"
                  onChange={hadnleIconChange}
                />
                <div>
                  <div
                    className={`
                    size-[50px]
                    flex justify-center items-center
                  bg-black bg-opacity-50 rounded-full
                    absolute
                    left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    hover:cursor-pointer
                    `}
                  >
                    <MdOutlineAddAPhoto size={30} />
                  </div>
                </div>
              </label>
              <img
                className="w-full h-full object-cover rounded-full border-4 border-black"
                src={iconImage || "https://placehold.jp/400x400.png"}
                alt="icon"
              />
            </div>
          </div>
          <div className="relative mt-20 mb-10">
            <input
              name="user[nickname]"
              className="form-input-text pt-3"
              type="text"
              placeholder={location.state.user.nickname || "名前"}
              defaultValue={location.state.user.nickname}
            />
            <small className="absolute top-0 left-0 text-gray-400">名前</small>
          </div>
          <div className="relative my-10">
            <textarea
              name="user[bio]"
              className="form-input-text resize-none pt-6"
              type="text"
              placeholder={location.state.user.bio || "自己紹介"}
              onChange={handleTextareaChange}
              defaultValue={location.state.user.bio}
            />
            <small className="absolute top-0 left-0 text-gray-400">
              自己紹介
            </small>
          </div>
          <div className="relative my-10">
            <input
              name="user[location]"
              className="form-input-text pt-3"
              type="text"
              placeholder={location.state.user.location || "場所"}
              defaultValue={location.state.user.location}
            />
            <small className="absolute top-0 left-0 text-gray-400">場所</small>
          </div>
          <div className="relative my-10">
            <input
              name="user[website]"
              className="form-input-text pt-3"
              type="text"
              placeholder={location.state.user.website || "ウェブサイト"}
              defaultValue={location.state.user.website}
            />
            <small className="absolute top-0 left-0 text-gray-400">
              ウェブサイト
            </small>
          </div>
          <div className="relative my-10">
            <input
              name="user[phone]"
              className="form-input-text pt-3"
              type="text"
              placeholder={location.state.user.phone || "電話番号"}
              defaultValue={location.state.user.phone}
            />
            <small className="absolute top-0 left-0 text-gray-400">
              電話番号
            </small>
          </div>
        </>
      }
    />
  );
};
