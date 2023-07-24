import { Action, handleActions } from "redux-actions";
import {
  fetchItemsAction,
  fetchAllItemsAction,
  addUploadedFile,
  removeUploadedFile,
  uploadDoneAction,
  fetchDropdownItemsAction,
} from "./actions";

const initialState: {
  uploadedFiles: any[];
  checkedIds: any[];
  isFetched: boolean;
  count: number;
  loading: boolean;
  items: any[];
  allItems: any[];
  image: any;
  uploadDone: any;
} = {
  items: [],
  allItems: [],
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
      state: State.Icons,
      action: Type.ReduxAction<Pick<State.Icons, "items">>
    ): State.Icons => ({
      ...state,
      ...action.payload,
    }),
    throw: (state: State.Icons): State.Icons => ({
      ...state,
    }),
  },
  [fetchAllItemsAction]: {
    next: (
      state: State.Icons,
      action: Type.ReduxAction<Pick<State.Icons, "items">>
    ): State.Icons => ({
      ...state,
      ...action.payload,
    }),
    throw: (state: State.Icons): State.Icons => ({
      ...state,
    }),
  },
  [fetchDropdownItemsAction]: {
    next: (
      state: State.Icons,
      action: Type.ReduxAction<Pick<State.Icons, "items">>
    ): State.Icons => ({
      ...state,
      ...action.payload,
    }),
    throw: (state: State.Icons): State.Icons => ({
      ...state,
    }),
  },
  [addUploadedFile]: (
    state: State.Icons,
    action: Type.ReduxAction<State.Icons>
  ): State.Icons => {
    return <Icons.Root>{
      ...state,
      uploadedFiles: [...state.uploadedFiles, action.payload],
    };
  },
  [removeUploadedFile]: (
    state: State.Icons,
    action: Type.ReduxAction<State.Icons>
  ): State.Icons => {
    return <Icons.Root>{
      ...state,
      uploadedFiles: state.uploadedFiles.filter(
        (file: any) => file.lastModified !== (action.payload as any).lastModified
      ),
    };
  },
  [uploadDoneAction]: {
    next: (state: State.Icons, action: Action<boolean>): State.Icons => ({
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
  fetchAllItemsAction,
  fetchDropdownItemsAction,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
