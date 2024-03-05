import React, { memo } from "react";
import { ImageWithAction } from "../../../molecules/ImageWithAction";
import { RxCross2 } from "react-icons/rx";
import { IconWithCircleButton } from "../../../molecules/IconWithCircleButton";

export const TweetImagePreview = memo((props) => {
  const { imageFiles, length, handleDelete } = props;

  return (
    <div className={length > 1 && "w-full h-[290px] flex justify-between"}>
      {length === 4 ? (
        <div className="w-[49%] flex flex-col justify-between">
          <div className="h-[49%] relative">
            <ImageWithAction
              imageUrl={URL.createObjectURL(imageFiles[0].file)}
              action={
                <div className="w-[30px] h-[30px] z-20 absolute top-1 right-1">
                  <IconWithCircleButton
                    handleClick={() => handleDelete({ id: imageFiles[0].id })}
                    icon={<RxCross2 className="w-full" />}
                  />
                </div>
              }
            />
          </div>
          <div className="h-[49%] relative">
            <ImageWithAction
              imageUrl={URL.createObjectURL(imageFiles[1].file)}
              action={
                <div className="w-[30px] h-[30px] z-20 absolute top-1 right-1">
                  <IconWithCircleButton
                    handleClick={() => handleDelete({ id: imageFiles[1].id })}
                    icon={<RxCross2 className="w-full" />}
                  />
                </div>
              }
            />
          </div>
        </div>
      ) : (
        <div className={length === 1 ? "w-full relative" : "w-[49%] relative"}>
          <ImageWithAction
            imageUrl={URL.createObjectURL(imageFiles[0].file)}
            action={
              <div className="w-[30px] h-[30px] z-20 absolute top-1 right-1">
                <IconWithCircleButton
                  handleClick={() => handleDelete({ id: imageFiles[0].id })}
                  icon={<RxCross2 className="w-full" />}
                />
              </div>
            }
          />
        </div>
      )}
      {length > 1 &&
        (length === 2 ? (
          <div className="w-[49%] relative">
            <ImageWithAction
              imageUrl={URL.createObjectURL(imageFiles[1].file)}
              action={
                <div className="w-[30px] h-[30px] z-20 absolute top-1 right-1">
                  <IconWithCircleButton
                    handleClick={() => handleDelete({ id: imageFiles[1].id })}
                    icon={<RxCross2 className="w-full" />}
                  />
                </div>
              }
            />
          </div>
        ) : (
          <div className="w-[49%] flex flex-col justify-between">
            <div className="h-[49%] relative">
              <ImageWithAction
                imageUrl={
                  length === 3
                    ? URL.createObjectURL(imageFiles[1].file)
                    : URL.createObjectURL(imageFiles[2].file)
                }
                action={
                  <div className="w-[30px] h-[30px] z-20 absolute top-1 right-1">
                    <IconWithCircleButton
                      handleClick={
                        length === 3
                          ? () => handleDelete({ id: imageFiles[1].id })
                          : () => handleDelete({ id: imageFiles[2].id })
                      }
                      icon={<RxCross2 className="w-full" />}
                    />
                  </div>
                }
              />
            </div>
            <div className="h-[49%] relative">
              <ImageWithAction
                imageUrl={
                  length === 3
                    ? URL.createObjectURL(imageFiles[2].file)
                    : URL.createObjectURL(imageFiles[3].file)
                }
                action={
                  <div className="w-[30px] h-[30px] z-20 absolute top-1 right-1">
                    <IconWithCircleButton
                      handleClick={
                        length === 3
                          ? () => handleDelete({ id: imageFiles[2].id })
                          : () => handleDelete({ id: imageFiles[3].id })
                      }
                      icon={<RxCross2 className="w-full" />}
                    />
                  </div>
                }
              />
            </div>
          </div>
        ))}
    </div>
  );
});
