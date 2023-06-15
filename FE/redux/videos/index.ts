import { handleActions } from "redux-actions";
import {
  fetchItemsAction,
  submitFormAction,
  fetchAllItemsAction,
} from "./actions";

const initialState: {
  checkedIds: any[];
  isFetched: boolean;
  count: number;
  loading: boolean;
  items: any[];
  image: any;
  allItems: any[];
} = {
  items: [],
  loading: false,
  isFetched: false,
  checkedIds: [],
  count: 0,
  image: null,
  allItems: [],
};

const ACTION_HANDLERS: any = {
  [fetchItemsAction]: {
    next: (
      state: State.Videos,
      action: Type.ReduxAction<Pick<State.Videos, "items">>
    ): State.Videos => ({
      ...state,
      ...action.payload,
    }),
    throw: (state: State.Videos): State.Videos => ({
      ...state,
    }),
  },
  [fetchAllItemsAction]: {
    next: (
      state: State.Videos,
      action: Type.ReduxAction<Pick<State.Videos, "allItems">>
    ): State.Videos => ({
      ...state,
      ...action.payload,
    }),
    throw: (state: State.Videos): State.Videos => ({
      ...state,
    }),
  },
  [submitFormAction]: (
    state: State.Videos,
    action: Type.ReduxAction<State.Videos>
  ): State.Videos => {
    return <Videos.Root>{
      ...state,
    };
  },
};

export { fetchItemsAction, submitFormAction, fetchAllItemsAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
