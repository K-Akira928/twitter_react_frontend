import React from "react";
import { PostLayout } from "../templates/PostLayout";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { TweetForm } from "../organisms/tweets/form/TweetForm";

export const Post = () => {
  return (
    <PostLayout
      formHeader={
        <div className="flex justify-between items-start p-4">
          <div className="w-1/3">
            <Link to="/home">
              <RxCross2 size={25} />
            </Link>
          </div>
        </div>
      }
      formBody={<TweetForm />}
    />
  );
};
