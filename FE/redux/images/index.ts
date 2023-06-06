import { Action, handleActions } from "redux-actions";
import {
  fetchItemsAction,
  addUploadedFile,
  removeUploadedFile,
  uploadDoneAction,
} from "./actions";

const initialState: {
  uploadedFiles: any[];
  checkedIds: any[];
  isFetched: boolean;
  count: number;
  loading: boolean;
  items: any[];
  image: any;
  uploadDone: any;
} = {
  items: [],
  loading: false,
  isFetched: false,
  uploadedFiles: [],
  checkedIds: [],
  count: 0,
  image: null,
  uploadDone: null,
};

const ACTION_HANDLERS: any = {
  [fetchItemsAction]: {
    next: (
      state: State.Images,
      action: Type.ReduxAction<Pick<State.Images, "items">>
    ): State.Images => ({
      ...state,
      ...action.payload,
    }),
    throw: (state: State.Images): State.Images => ({
      ...state,
    }),
  },
  [addUploadedFile]: (
    state: State.Images,
    action: Type.ReduxAction<State.Images>
  ): State.Images => {
    return <Images.Root>{
      ...state,
      uploadedFiles: [...state.uploadedFiles, action.payload],
    };
  },
  [removeUploadedFile]: (
    state: State.Images,
    action: Type.ReduxAction<State.Images>
  ): State.Images => {
    return <Images.Root>{
      ...state,
      uploadedFiles: state.uploadedFiles.filter(
        (file) => file.lastModified !== (action.payload as any).lastModified
      ),
    };
  },
  [uploadDoneAction]: {
    next: (state: State.Images, action: Action<boolean>): State.Images => ({
      ...state,
      uploadDone: action.payload,
    }),
  },
};

export {
  fetchItemsAction,
  addUploadedFile,
  removeUploadedFile,
  uploadDoneAction,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
