import { images } from "../urls";
import { baseAxiosWithAuthHeaders } from "./base";

export const patchImagesUpdate = (imageFilesState, tweet) => {
  const imageFormData = new FormData();
  imageFilesState.forEach((imageFile) => {
    imageFormData.append("tweet[images][]", imageFile.file);
  });
  return baseAxiosWithAuthHeaders
    .patch(`${images}/${tweet.id}`, imageFormData)
    .then((res) => res)
    .catch((e) => e);
};
