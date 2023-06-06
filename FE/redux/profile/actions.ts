import { createAction } from "redux-actions";
import axios from "axios";
import { authHeader } from "../../lib/functions";
import {setSuccessToastAction, setErrorToastAction, setInfoToastAction} from "../layouts";
import { setUserAction } from "../user/";
import { showLoaderAction } from "../../redux/layouts/actions";
import { baseApiUrl } from "../../constants";
const baseUrl = `${baseApiUrl}/api`;
const baseAuthUrl = `${baseApiUrl}/auth`;

export const fetchProfileAction: any = createAction(
  "Profile/FETCH_PROFILE",
  async () =>
    async (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ profile: any }> => {
      const state = getState();
      const res = await axios.get(`${baseUrl}/profile`, {
        headers: {
          ...authHeader(state.user.user.email),
        },
      });
      return {
        profile: res.data,
      };
    }
);
export const updateProfileAction: any = createAction(
  "Profile/UPDATE_PROFILE",
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(`${baseUrl}/profile`, data, {
          headers: {
            ...authHeader(state.user.user.email),
          },
        })
        .then(async (res) => {
          window.localStorage.removeItem("user");
          window.localStorage.setItem("user", JSON.stringify(res.data.user));
          dispatch(setUserAction(res.data.user));
          dispatch(setSuccessToastAction(`Profile has been updated`));
        });
    }
);

export const changePasswordAction: any = createAction(
  "Profile/CHANGE_PASSWORD",
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(`${baseUrl}/profile`, data, {
          headers: {
            ...authHeader(state.user.user.email),
          },
        })
        .then(async () => {
          dispatch(setSuccessToastAction(`Password has been updated`));
        })
        .catch((e) => {
          dispatch(setExistEmailAction(`Email present, input another email`));
        });
    }
);

export const changePasswordInvitationAction: any = createAction(
  "Profile/CHANGE_PASSWORD_INVITATION",
  (data: any) =>
    async (dispatch: Type.Dispatch): Promise<any> => {
      dispatch(showLoaderAction(true));
      return axios
        .post(`${baseAuthUrl}/changePassword`, data)
        .then(({ data: { success, message } }) => {
          if (success) {
            dispatch(setSuccessToastAction("Password has been updated"));
            return true;
          } else if (message) {
            dispatch(setErrorToastAction(message));
          }
        })
        .catch((error) => {
          dispatch(
            setErrorToastAction(
              error.response.data.message ||
                error.request ||
                error.message ||
                "Error restore password"
            )
          );
        })
        .finally(() => dispatch(showLoaderAction(false)));
    }
);

export const restorePasswordAction: any = createAction(
  "Profile/RESTORE_PASSWORD",
  (data: any, locale: string) =>
    async (dispatch: Type.Dispatch): Promise<any> => {
      dispatch(showLoaderAction(true));
      const res = await fetch(
        `${baseAuthUrl}/restorePassword?locale=${locale}`,
        {
          method: "post",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );
      const resp = await res.json();
      dispatch(showLoaderAction(false));
      if (res.ok && resp.status) {
        return "yes";
      } else {
        return resp.error.message ? resp.error.message : resp.error;
      }
    }
);

export const saveAddressAction: any = createAction(
  "assetModels/ADD_ADDRESS",
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      const isNew = data.id;
      return axios
        .post(`${baseUrl}/address`, data, {
          headers: {
            ...authHeader(state.user.user.email),
          },
        })
        .then(async () => {
          dispatch(
            setSuccessToastAction(
              `Address has been ${isNew ? "updated" : "created"}`
            )
          );
        });
    }
);

export const setAddressAction: any = createAction("addresses/SET_ADDRESS");

export const setValidEmailStatusAction: any = createAction(
  "Profile/SET_VALID_STATUS"
);
export const setExistEmailAction: any = createAction("Profile/SET_EXIST_EMAIL");
