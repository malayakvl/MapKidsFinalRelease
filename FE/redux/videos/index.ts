import { Action, handleActions } from "redux-actions";
import { fetchItemsAction, submitFormAction } from "./actions";

const initialState: {
  checkedIds: any[];
  isFetched: boolean;
  count: number;
  loading: boolean;
  items: any[];
  image: any;
} = {
  items: [],
  loading: false,
  isFetched: false,
  checkedIds: [],
  count: 0,
  image: null,
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
    throw: (state: State.Images): State.Videos => ({
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

export { fetchItemsAction, submitFormAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
