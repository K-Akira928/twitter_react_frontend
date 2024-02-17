import React from "react";
import { RootLayout } from "../templates/RootLayout";
import { Link, useLocation } from "react-router-dom";

import { FaApple, FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { SecondaryRoudedButton } from "../atoms/buttons/SecondaryRoudedButton";
import { PrimaryRoundedButton } from "../atoms/buttons/PrimaryRoundedButton";
import { OutlineRoundedButton } from "../atoms/buttons/OutlineRoundedButton";

export const Root = () => {
  const location = useLocation();

  return (
    <>
      <RootLayout
        logo={<FaXTwitter className="md:w-3/5" size="100%" />}
        callToActionHeading={
          <>
            <h2 className="text-4xl md:text-6xl font-bold">
              すべての話題が、ここに。
            </h2>
            <h3 className="text-xl md:text-4xl font-bold">
              今すぐ参加しましょう。
            </h3>
          </>
        }
        flashMessages={
          <>
            {location.state && location.state.messages && (
              <div
                className={`
                h-8
                w-full
                text-white
                font-bold
                bg-lime-500
                flex justify-center
                items-center
                rounded-full
              `}
              >
                {location.state.messages}
              </div>
            )}
          </>
        }
        callToActionContents={
          <>
            <SecondaryRoudedButton>
              <FcGoogle className="mr-2" size={20} />
              Google で登録
            </SecondaryRoudedButton>
            <SecondaryRoudedButton>
              <FaApple className="mr-2" size={20} />
              Appleのアカウントで登録
            </SecondaryRoudedButton>
            <div
              className={`
              flex
              items-center
              after:border-t after:ml-1 after:flex-grow
              before:border-t before:mr-1 before:flex-grow
            `}
            >
              または
            </div>
            <Link to="/sign_up" state={{ backgroundLocation: location }}>
              <PrimaryRoundedButton>アカウントを作成</PrimaryRoundedButton>
            </Link>
            <small>
              アカウントを登録することにより、利用規約とプライバシーポリシー（Cookieの使用を含む）に同意したとみなされます。
            </small>
            <p className="font-bold mt-6">アカウントをお持ちの場合</p>
            <OutlineRoundedButton>ログイン</OutlineRoundedButton>
          </>
        }
      />
    </>
  );
};
