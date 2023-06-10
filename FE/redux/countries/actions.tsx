import { createAction } from "redux-actions";
import axios from "axios";
import { authHeader } from "../../lib/functions";
import { showLoaderAction } from "../layouts/actions";
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
// export const deleteItemAction: any = createAction(
//   "countries/DELETE_ITEM",
//   async (id: number) =>
//     (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
//       const state = getState();
//       dispatch(showLoaderAction(true));
//       return axios
//         .delete(`${baseUrl}/countries/delete/${id}`, {
//           headers: {
//             ...authHeader(state.user.user.email),
//           },
//         })
//         .then(async () => {
//           dispatch(showLoaderAction(false));
//           await dispatch(fetchItemsAction());
//           dispatch(setSuccessToastAction("Items has been deleted"));
//           toggleModalConfirmation();
//         });
//     }
// );
// export const bulkDeleteAction: any = createAction(
//   "countries/BULK_DELETE",
//   async () =>
//     async (
//       dispatch: Type.Dispatch,
//       getState: () => State.Root
//     ): Promise<void> => {
//       const state = getState();
//       dispatch(showLoaderAction(true));
//       return axios
//         .post(
//           `${baseUrl}/countries/bulk-delete`,
//           { data: JSON.stringify(state.layouts.checkedIds) },
//           {
//             headers: {
//               ...authHeader(state.user.user.email),
//             },
//           }
//         )
//         .then(async () => {
//           dispatch(showLoaderAction(false));
//           dispatch(setSuccessToastAction("Items has been deleted"));
//           await dispatch(fetchItemsAction());
//         });
//     }
// );
// export const crudAction: any = createAction(
//   "countries/CRUD_ACTION",
//   async (formData: any) =>
//     async (
//       dispatch: Type.Dispatch,
//       getState: () => State.Root
//     ): Promise<void> => {
//       const state = getState();
//       dispatch(showLoaderAction(true));
//       return axios
//         .post(
//           `${baseUrl}/countries/crud`,
//           { data: JSON.stringify(state.layouts.checkedIds) },
//           {
//             headers: {
//               ...authHeader(state.user.user.email),
//             },
//           }
//         )
//         .then(async () => {
//           dispatch(showLoaderAction(false));
//           dispatch(setSuccessToastAction("Items has been updated"));
//           await dispatch(fetchItemsAction());
//         });
//     }
// );

// export const uploadDoneAction: any = createAction('images/UPLOAD_DONE');
// export const addUploadedFile: any = createAction('images/ADD_UPLOADED_FILE');
// export const removeUploadedFile: any = createAction('images/REMOVE_UPLOADED_FILE');
