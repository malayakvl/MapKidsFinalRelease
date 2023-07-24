import { createAction } from "redux-actions";
import axios from "axios";
import { authHeader, toggleModalConfirmation } from "../../lib/functions";
import { setSuccessToastAction } from "../layouts";
import { showLoaderAction } from "../layouts/actions";
import { baseApiUrl } from "../../constants";
const baseUrl = `${baseApiUrl}/api`;
import { paginationSelectorFactory } from "../layouts/selectors";
import { PaginationType } from "../../constants";
import queryString from "query-string";

export const fetchItemsAction: any = createAction(
  "icons/FETCH_ITEMS",
  async () =>
    (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ count: any; items: any }> => {
      const state = getState();
      const { limit, offset, sort, column, query, filters } =
        paginationSelectorFactory(PaginationType.ICONS)(state);
      const queryFilter = JSON.stringify(filters);
      dispatch(showLoaderAction(true));
      return axios
        .get(
          `${baseUrl}/icons/fetch-items?${queryString.stringify({
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
export const fetchAllItemsAction: any = createAction(
  "icons/FETCH_ALL_ITEMS",
  async () =>
    (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ count: any; allItems: any }> => {
      const state = getState();
      // const { limit, offset, sort, column, query, filters } =
      //   paginationSelectorFactory(PaginationType.IMAGES)(state);
      // const queryFilter = JSON.stringify(filters);
      dispatch(showLoaderAction(true));
      return axios
        .get(`${baseUrl}/icons/fetch-all-items?${queryString.stringify({})}`, {
          headers: {
            ...authHeader(state.user.user.email),
          },
        })
        .then((res: any) => {
          dispatch(showLoaderAction(false));
          return {
            count: res.data.count,
            allItems: res.data.items,
          };
        });
    }
);
export const fetchDropdownItemsAction: any = createAction(
  "icons/FETCH_ITEMS_DROPSOWN",
  async () =>
    (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ count: any; allIconItems: any }> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      return axios
        .get(`${baseUrl}/icons/fetch-all-items?${queryString.stringify({})}`, {
          headers: {
            ...authHeader(state.user.user.email),
          },
        })
        .then((res: any) => {
          dispatch(showLoaderAction(false));
          return {
            count: res.data.count,
            allIconItems: res.data.items,
          };
        });
    }
);

export const deleteItemAction: any = createAction(
  "icons/DELETE_ITEM",
  async (id: number) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      return axios
        .delete(`${baseUrl}/icons/delete/${id}`, {
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
  "icons/BULK_DELETE",
  async () =>
    async (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<void> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      return axios
        .post(
          `${baseUrl}/icons/bulk-delete`,
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
export const uploadPhotosAction: any = createAction(
  "slide/UPLOAD_PHOTO_ACTION",
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      console.log(data);
      dispatch(showLoaderAction(true));
      return axios
        .post(`${baseUrl}/icons/upload-photos`, data, {
          headers: {
            ...authHeader(state.user.user.email),
          },
        })
        .then(async (res) => {
          // dispatch(updateCompanyLogoAction(res.data.fileName));
          dispatch(showLoaderAction(false));
          dispatch(uploadDoneAction(true));
          dispatch(setSuccessToastAction(`Upload complete succsessfully`));
        });
    }
);
export const updateImageTitleActon: any = createAction(
  "slide/UPDATE_ITEM_TITLE_ACTION",
  async (title: any, imageId: number) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      console.log(title);
      console.log(imageId);
      dispatch(showLoaderAction(true));
      return axios
        .post(
          `${baseUrl}/icons/update-title`,
          { data: { title: title, imageId: imageId } },
          {
            headers: {
              ...authHeader(state.user.user.email),
            },
          }
        )
        .then(async (res) => {
          // dispatch(updateCompanyLogoAction(res.data.fileName));
          dispatch(showLoaderAction(false));
          dispatch(uploadDoneAction(true));
          dispatch(setSuccessToastAction(`Upload complete succsessfully`));
        });
    }
);

export const uploadDoneAction: any = createAction("icons/UPLOAD_DONE");
export const addUploadedFile: any = createAction("icons/ADD_UPLOADED_FILE");
export const removeUploadedFile: any = createAction(
  "icons/REMOVE_UPLOADED_FILE"
);
