import React from "react";
import { SignupLayout } from "../templates/SignupLayout";
import { Link, Navigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaXTwitter } from "react-icons/fa6";
import { BirthdayForm } from "../organisms/users/BirthdayForm";
import { postRgistrationCreate, usersActionTypes } from "../../apis/users";
import { usePostUserReducer } from "../../hooks/users";
import { REQUEST_STATE } from "../../constants";

export const Signup = () => {
  const initialPostState = {
    status: REQUEST_STATE.INITIAL,
    data: [],
  };

  const [postState, dispatch] = usePostUserReducer(initialPostState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    dispatch({ type: usersActionTypes.POSTING });

    postRgistrationCreate(formData).then((res) => {
      dispatch({
        type: res.type,
        payload: res,
      });
    });
  };

  return (
    <>
      {postState.status === "OK" && (
        <Navigate to="/" replace={true} state={postState.data} />
      )}

      <SignupLayout
        formHeader={
          <div className="flex justify-between items-center p-4">
            <div className="w-1/3">
              <Link to="/">
                <RxCross2 size={25} />
              </Link>
            </div>
            <div className="w-1/3 flex justify-center">
              <FaXTwitter size={35} />
            </div>
            <div className="w-1/3"></div>
          </div>
        }
        handleSubmit={handleSubmit}
        formBody={
          <>
            <h3 className="text-3xl font-bold mb-6">アカウントを作成</h3>
            <div>
              <input
                className="form-input-text"
                placeholder="ユーザー名"
                name="name"
                type="text"
              />
              <div className="h-10">
                {postState.data.name && (
                  <small className="text-red-500">
                    ※ユーザー名{postState.data.name}
                  </small>
                )}
              </div>
            </div>
            <div>
              <input
                className="form-input-text"
                placeholder="表示名"
                name="nickname"
                type="text"
              />
              <div className="h-10">
                {postState.data.nickname && (
                  <small className="text-red-500">
                    ※表示名{postState.data.nickname}
                  </small>
                )}
              </div>
            </div>
            <div>
              <input
                className="form-input-text"
                placeholder="メール"
                name="email"
                type="text"
              />
              <div className="h-10">
                {postState.data.email && (
                  <small className="text-red-500">
                    ※メールアドレス{postState.data.email}
                  </small>
                )}
              </div>
            </div>
            <div>
              <input
                className="form-input-text"
                placeholder="電話番号"
                name="phone"
                type="text"
              />
              <div className="h-10">
                {postState.data.phone && (
                  <small className="text-red-500">
                    ※電話番号{postState.data.phone}
                  </small>
                )}
              </div>
            </div>
            <div>
              <p className="font-bold mb-3">生年月日</p>
            </div>
            <div>
              <BirthdayForm />
              <div className="h-10">
                {postState.data.birthday && (
                  <small className="text-red-500">
                    ※生年月日{postState.data.birthday}
                  </small>
                )}
              </div>
            </div>
            <div>
              <input
                className="form-input-text"
                placeholder="パスワード"
                name="password"
                type="password"
              />
              <div className="h-10">
                {postState.data.password && (
                  <small className="text-red-500">
                    ※パスワード{postState.data.password}
                  </small>
                )}
              </div>
            </div>
            <div>
              <input
                className="form-input-text"
                placeholder="確認パスワード"
                name="password_confirmation"
                type="password"
              />
              <div className="h-10">
                {postState.data.password_confirmation && (
                  <small className="text-red-500">
                    ※確認パスワード{postState.data.password_confirmation}
                  </small>
                )}
              </div>
            </div>
            <div className="mt-auto">
              <button className="btn-secondary" type="submit">
                登録
              </button>
            </div>
          </>
        }
      />
    </>
  );
};
