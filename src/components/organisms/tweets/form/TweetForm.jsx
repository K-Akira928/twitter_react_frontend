import React, { useCallback, useState } from "react";
import { RiImage2Line } from "react-icons/ri";
import { MdOutlineGifBox } from "react-icons/md";
import { LuListOrdered } from "react-icons/lu";
import { TbMoodSmile } from "react-icons/tb";
import { TbCalendarTime } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { postTweetCreate } from "../../../../apis/tweets";
import { patchImagesUpdate } from "../../../../apis/images";
import { useSelectImages } from "../../../../hooks/selectImages";
import { useTweetCreate } from "../../../../hooks/tweets";
import { REQUEST_STATE } from "../../../../constants";
import { postingActionTypes } from "../../../../apis/base";
import { TweetImagePreview } from "./TweetImagePreview";

export const TweetForm = (props) => {
  const { successAction } = props;

  const initialPostState = {
    status: REQUEST_STATE.INITIAL,
    data: [],
    errors: [],
  };

  const [imageFilesState, imageFilesDispatch] = useSelectImages([]);

  const [tweetContentFlag, setTweetContentFlag] = useState(true);

  const { postTweetState, postTweetDispatch, callback } =
    useTweetCreate(initialPostState);

  const [count, setCount] = useState(0);

  const handleTextareaChange = (e) => {
    e.target.value.trim()
      ? setTweetContentFlag(false)
      : setTweetContentFlag(true);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleInputFileChange = (e) => {
    imageFilesDispatch({
      type: "add",
      id: count,
      file: e.target.files[0],
    });
    setCount(count + 1);
    e.target.value = "";
  };

  const handleImagePreviewDelete = useCallback(({ id }) => {
    imageFilesDispatch({
      type: "delete",
      id: id,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    postTweetDispatch({
      type: postingActionTypes.POSTING,
    });

    postTweetCreate(formData).then((res) => {
      imageFilesState.length &&
        patchImagesUpdate(imageFilesState, res.data.data.tweet);
      postTweetDispatch({
        type: res.type,
        payload: res,
        callback: {
          success: () => {
            successAction();
            setTweetContentFlag(true);
            callback.success(e);
          },
        },
      });
    });

    imageFilesDispatch({ type: "reset" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full">
        <div className="px-2">
          <textarea
            className={`
            h-14
            pt-4
            text-xl
          bg-black
            resize-none
            w-full
            outline-none
          `}
            name="content"
            onChange={handleTextareaChange}
            type="textarea"
            placeholder="いまどうしてる？"
          />
        </div>
        {imageFilesState.length ? (
          <TweetImagePreview
            imageFiles={imageFilesState}
            length={imageFilesState.length}
            handleDelete={handleImagePreviewDelete}
          />
        ) : null}
        {postTweetState.errors?.content && (
          <small className="text-red-500 px-2">
            ※ツイート{postTweetState.errors?.content}
          </small>
        )}
        <div className="flex justify-between items-center py-3">
          <div className="text-orange-500 w-5/12 flex justify-between">
            <label
              className={`
              cursor-pointer
              size-8
              flex justify-center items-center
              hover:bg-orange-700 hover:bg-opacity-20 hover:rounded-full
              ${imageFilesState.length === 4 && "text-orange-800"}
            `}
            >
              <input
                className="hidden"
                name="images"
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleInputFileChange}
                disabled={imageFilesState.length === 4}
              />
              <RiImage2Line size={20} />
            </label>
            <button
              type="button"
              className={`
              size-8
              flex justify-center items-center
              hover:bg-orange-700 hover:bg-opacity-20 hover:rounded-full
            `}
            >
              <MdOutlineGifBox size={20} />
            </button>
            <button
              type="button"
              className={`
              size-8
              flex justify-center items-center
              hover:bg-orange-700 hover:bg-opacity-20 hover:rounded-full
            `}
            >
              <LuListOrdered size={20} />
            </button>
            <button
              type="button"
              className={`
              size-8
              flex justify-center items-center
              hover:bg-orange-700 hover:bg-opacity-20 hover:rounded-full
            `}
            >
              <TbMoodSmile size={20} />
            </button>
            <button
              type="button"
              className={`
              size-8
              flex justify-center items-center
              hover:bg-orange-700 hover:bg-opacity-20 hover:rounded-full
            `}
            >
              <TbCalendarTime size={20} />
            </button>
            <button
              type="button"
              className={`
              size-8
              flex justify-center items-center
              hover:bg-orange-700 hover:bg-opacity-20 hover:rounded-full
            `}
            >
              <HiOutlineLocationMarker size={20} />
            </button>
          </div>
          <button
            className="btn-primary w-3/12 h-9 disabled:bg-opacity-70"
            type="submit"
            disabled={tweetContentFlag && imageFilesState.length === 0}
          >
            ツイートする
          </button>
        </div>
      </div>
    </form>
  );
};
