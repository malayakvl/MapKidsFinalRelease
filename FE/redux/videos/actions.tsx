import { createAction } from "redux-actions";
import axios from "axios";
import { authHeader, toggleModalConfirmation } from "../../lib/functions";
import { setSuccessToastAction, setErrorToastAction } from "../layouts";
import { showLoaderAction } from "../../redux/layouts/actions";
import { baseApiUrl } from "../../constants";
const baseUrl = `${baseApiUrl}/api`;
import { paginationSelectorFactory } from "../layouts/selectors";
import { PaginationType } from "../../constants";
import queryString from "query-string";

export const fetchItemsAction: any = createAction(
  "videos/FETCH_ITEMS",
  async () =>
    (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ count: any; items: any }> => {
      const state = getState();
        const { limit, offset, sort, column, query, filters } = paginationSelectorFactory(
            PaginationType.VIDEOS
        )(state);
        const queryFilter = JSON.stringify(filters);
        dispatch(showLoaderAction(true));
            return axios
                .get(
                    `${baseUrl}/videos/fetch-items?${queryString.stringify({
                        limit,
                        offset,
                        sort,
                        column,
                        query,
                        queryFilter
                    })}`,
                    {
                        headers: {
                            ...authHeader(state.user.user.email)
                        }
                    }
                )
                .then((res: any) => {
                    dispatch(showLoaderAction(false));
                    return {
                        count: res.data.count,
                        items: res.data.items
                    };
                });
        },
);
export const submitFormAction: any = createAction(
    'chatbot/ADD_UPDATE_DATA',
    async (data: any) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            const isNew = data.id;
            dispatch(showLoaderAction(true));
            return axios
                .post(`${baseUrl}/chatbot`, data, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async () => {
                    dispatch(
                        setSuccessToastAction(
                            isNew ? 'Scenario has been update' : 'Record has been created'
                        )
                    );
                    dispatch(fetchItemsAction('users'));
                    dispatch(setEmptyFormAction());
                    // dispatch(showFormAction(false));
                    dispatch(showLoaderAction(false));
                })
                .catch((e) => {
                    dispatch(setErrorToastAction(e.response.data.error));
                    dispatch(showLoaderAction(false));
                });
        }
);
export const deleteItemAction: any = createAction(
    'videos/DELETE_ITEM',
    async (id: number) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            dispatch(showLoaderAction(true));
            return axios
                .delete(`${baseUrl}/images/delete/${id}`, {
                    headers: {
                        ...authHeader(state.user.user.email)
                    }
                })
                .then(async () => {
                    dispatch(showLoaderAction(false));
                    await dispatch(fetchItemsAction());
                    dispatch(setSuccessToastAction('Items has been deleted'));
                    toggleModalConfirmation();
                });
        }
);
export const bulkDeleteAction: any = createAction(
    'videos/BULK_DELETE',
    async () =>
        async (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            dispatch(showLoaderAction(true));
            return axios
                .post(
                    `${baseUrl}/images/bulk-delete`,
                    { data: JSON.stringify(state.layouts.checkedIds) },
                    {
                        headers: {
                            ...authHeader(state.user.user.email)
                        }
                    }
                )
                .then(async () => {
                    dispatch(showLoaderAction(false));
                    dispatch(setSuccessToastAction('Items has been deleted'));
                    await dispatch(fetchItemsAction());
                });
        }
);
export const setEmptyFormAction: any = createAction('video/EMPTY_FORM');
