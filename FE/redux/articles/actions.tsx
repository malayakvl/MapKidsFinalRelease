import { createAction } from "redux-actions";
import axios from "axios";
import { authHeader, toggleModalConfirmation } from "../../lib/functions";
import {
  setSuccessToastAction,
  setErrorToastAction,
  setInfoToastAction,
} from "../layouts";
// import { setUserAction } from "../user/";
import { showLoaderAction } from "../../redux/layouts/actions";
import { baseApiUrl } from "../../constants";
const baseUrl = `${baseApiUrl}/api`;
import { paginationSelectorFactory } from "../layouts/selectors";
import { PaginationType } from "../../constants";
import queryString from "query-string";

export const fetchItemsAction: any = createAction(
  "articles/FETCH_ITEMS",
  async () =>
    (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ count: any; items: any }> => {
      const state = getState();
      const { limit, offset, sort, column, query, filters } =
        paginationSelectorFactory(PaginationType.ARTICLES)(state);
      const queryFilter = JSON.stringify(filters);
      dispatch(showLoaderAction(true));
      return axios
        .get(
          `${baseUrl}/articles/fetch-items?${queryString.stringify({
            limit,
            offset,
            sort,
            column,
            query,
            queryFilter,
          })}`,
          {
            headers: {
              ...authHeader(state.user.user.email),
            },
          }
        )
        .then((res: any) => {
          dispatch(showLoaderAction(false));
          return {
            count: res.data.count,
            items: res.data.items,
          };
        });
    }
);
export const deleteItemAction: any = createAction(
  "articles/DELETE_ITEM",
  async (id: number) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      return axios
        .delete(`${baseUrl}/articles/delete/${id}`, {
          headers: {
            ...authHeader(state.user.user.email),
          },
        })
        .then(async () => {
          dispatch(showLoaderAction(false));
          await dispatch(fetchItemsAction());
          dispatch(setSuccessToastAction("Items has been deleted"));
          toggleModalConfirmation();
        });
    }
);
export const bulkDeleteAction: any = createAction(
  "articles/BULK_DELETE",
  async () =>
    async (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<void> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      return axios
        .post(
          `${baseUrl}/articles/bulk-delete`,
          { data: JSON.stringify(state.layouts.checkedIds) },
          {
            headers: {
              ...authHeader(state.user.user.email),
            },
          }
        )
        .then(async () => {
          dispatch(showLoaderAction(false));
          dispatch(setSuccessToastAction("Items has been deleted"));
          await dispatch(fetchItemsAction());
        });
    }
);
export const crudAction: any = createAction(
  "articles/CRUD_ACTION",
  async (formData: any) =>
    async (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<void> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      return axios
        .post(
          `${baseUrl}/articles/crud`,
          { data: JSON.stringify(state.layouts.checkedIds) },
          {
            headers: {
              ...authHeader(state.user.user.email),
            },
          }
        )
        .then(async () => {
          dispatch(showLoaderAction(false));
          dispatch(setSuccessToastAction("Items has been updated"));
          await dispatch(fetchItemsAction());
        });
    }
);

// export const uploadDoneAction: any = createAction('images/UPLOAD_DONE');
// export const addUploadedFile: any = createAction('images/ADD_UPLOADED_FILE');
// export const removeUploadedFile: any = createAction('images/REMOVE_UPLOADED_FILE');
