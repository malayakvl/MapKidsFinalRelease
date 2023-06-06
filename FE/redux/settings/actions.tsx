import { createAction } from "redux-actions";
import { authHeader } from "../../lib/functions";
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
import { showLoaderAction } from "../layouts/actions";
import { setErrorToastAction, setSuccessToastAction } from "../layouts";

export const fetchItemAction: any = createAction(
  "settings/FETCH_ITEM",
  async () =>
    (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ data: Settings.Settings }> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      return axios
        .get(`${baseUrl}/settings/fetch-item`, {
          headers: {
            ...authHeader(state.user.user.email),
          },
        })
        .then((res: any) => {
          dispatch(showLoaderAction(false));
          return res.data;
        });
    }
);
export const submitFormAction: any = createAction(
  "settings/ADD_UPDATE_DATA",
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      return axios
        .post(`${baseUrl}/settings`, data, {
          headers: {
            ...authHeader(state.user.user.email),
          },
        })
        .then(async () => {
          dispatch(setSuccessToastAction("Record has been updated"));
          dispatch(fetchItemAction());
          dispatch(showLoaderAction(false));
        })
        .catch((e) => {
          dispatch(setErrorToastAction(e.response.data.error));
          dispatch(showLoaderAction(false));
        });
    }
);
