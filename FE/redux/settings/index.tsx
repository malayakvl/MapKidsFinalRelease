import { Action, handleActions } from "redux-actions";
import { fetchItemAction, submitFormAction } from "./actions";

const initialState: {
  per_page: number;
  isFetched: boolean;
  loading: boolean;
  email_notification: string;
  data: any;
} = {
  isFetched: false,
  loading: false,
  email_notification: "",
  per_page: 10,
  data: {
    email_notification: "",
    count_per_page: 15,
  },
};

const ACTION_HANDLERS: any = {
  [fetchItemAction]: {
    next: (
      state: State.Settings,
      action: Type.ReduxAction<Pick<State.Settings, "settings">>
    ): State.Settings =>
      ({
        ...state,
        ...action.payload,
        loading: false,
        isFetched: true,
      } as Settings.Root),
    throw: (
      state: State.Settings
    ): {
      settings: Settings.Settings;
      isFetched: boolean;
      loading: boolean;
    } => ({
      ...state,
      loading: false,
      isFetched: false,
    }),
  },
};

export { fetchItemAction, submitFormAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
