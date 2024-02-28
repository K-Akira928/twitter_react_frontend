import { useReducer } from "react";

export const useSelectImages = (initialState) => {
  const imageFile = (id, file) => {
    return {
      id: id,
      file: file,
    };
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "add": {
        return [...state, imageFile(action.id, action.file)];
      }
      case "delete": {
        return [...state].filter((state) => state.id !== action.id);
      }
      case "reset": {
        return [];
      }
      default:
        throw new Error();
    }
  };

  const [imageFilesState, imageFilesDispatch] = useReducer(
    reducer,
    initialState
  );

  return [imageFilesState, imageFilesDispatch];
};
