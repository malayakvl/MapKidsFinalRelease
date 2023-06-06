import { Action, handleActions } from "redux-actions";
import {
  fetchItemsAction,
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
  uploadDone:null
};

const ACTION_HANDLERS: any = {
  [fetchItemsAction]: {
    next: (
      state: State.Articles,
      action: Type.ReduxAction<Pick<State.Articles, "items">>
    ): State.Articles => ({
      ...state,
      ...action.payload,
    }),
    throw: (state: State.Articles): State.Articles => ({
      ...state,
    }),
  },
};

export { fetchItemsAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
