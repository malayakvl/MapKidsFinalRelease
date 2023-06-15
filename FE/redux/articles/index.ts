import { handleActions } from "redux-actions";
import {
  fetchItemsAction,
  crudAction,
  fetchItemAction,
  setEmptyFormAction,
} from "./actions";

const initialState: {
  uploadedFiles: any[];
  checkedIds: any[];
  isFetched: boolean;
  count: number;
  loading: boolean;
  items: any[];
  item: any;
  image: any;
  uploadDone: any;
} = {
  items: [],
  item: null,
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
  [fetchItemAction]: {
    next: (
      state: State.Articles,
      action: Type.ReduxAction<Pick<State.Articles, "item">>
    ): State.Articles => ({
      ...state,
      ...action.payload,
      loading: false,
      isFetched: true,
    }),
    throw: (state: State.Articles): State.Articles => ({
      ...state,
      loading: false,
      isFetched: true,
    }),
  },
  [setEmptyFormAction]: {
    next: (state: State.Articles): State.Articles => ({
      ...state,
      item: {
        id: null,
        title: "",
        status: true,
        title_image: "",
        article_text: "",
        created_at: null,
        updated_at: null,
      },
    }),
  },
};

export { fetchItemsAction, crudAction, fetchItemAction, setEmptyFormAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
