import { createAction } from "redux-actions";
import axios from "axios";
import { authHeader, toggleModalConfirmation } from "../../lib/functions";
import { setSuccessToastAction, showLoaderAction } from "../layouts/actions";
import { baseApiUrl } from "../../constants";
const baseUrl = `${baseApiUrl}/api`;
import { paginationSelectorFactory } from "../layouts/selectors";
import { PaginationType } from "../../constants";
import queryString from "query-string";

export const fetchItemsAction: any = createAction(
  "countries/FETCH_ITEMS",
  async () =>
    (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ count: any; items: any }> => {
      const state = getState();
      const { limit, offset, sort, column, query, filters } =
        paginationSelectorFactory(PaginationType.COUNTRIES)(state);
      const queryFilter = JSON.stringify(filters);
      dispatch(showLoaderAction(true));
      return axios
        .get(
          `${baseUrl}/countries/fetch-items?${queryString.stringify({
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
export const fetchItemAction: any = createAction(
  "orders/FETCH_ITEM",
  async (id: number) =>
    async (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ item: Countries.Item }> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      const res = await axios.get(`${baseUrl}/countries/`, {
        headers: {
          ...authHeader(state.user.user.email),
        },
      });
      if (res.status) {
        dispatch(showLoaderAction(false));
      }
      return {
        item: res.data.item,
      };
    }
);

export const unactiveItemAction: any = createAction(
  "countries/UNACTIVE_ITEM",
  async (id: number) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      return axios
        .delete(`${baseUrl}/countries/unactive/${id}`, {
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
export const activeItemAction: any = createAction(
  "countries/CTIVE_ITEM",
  async (id: number) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      return axios
        .delete(`${baseUrl}/countries/active/${id}`, {
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
