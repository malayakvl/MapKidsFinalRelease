import { Action, handleActions } from "redux-actions";
import { fetchItemsAction } from "./actions";

const initialState: {
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
  checkedIds: [],
  count: 0,
  image: null,
  uploadDone: null,
};

const ACTION_HANDLERS: any = {
  [fetchItemsAction]: {
    next: (
      state: State.Countries,
      action: Type.ReduxAction<Pick<State.Countries, "items">>
    ): State.Countries => ({
      ...state,
      ...action.payload,
    }),
    throw: (state: State.Countries): State.Countries => ({
      ...state,
    }),
  },
};

export { fetchItemsAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
