import { createAction } from "redux-actions";
import axios from "axios";
import { authHeader, toggleModalConfirmation } from "../../lib/functions";
import {
  setActivePageAction,
  setSuccessToastAction,
  showLoaderAction,
} from "../layouts/actions";
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
    ): Promise<{ item: Articles.ItemData }> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      const res = await axios.get(`${baseUrl}/countries/fetch-item/${id}`, {
        headers: {
          ...authHeader(state.user.user.email),
        },
      });
      if (res.status) {
        dispatch(showLoaderAction(false));
        // dispatch(setCountryData(data.item));
        dispatch(
          setActivePageAction({
            type: "countries",
            modifier: "edit",
          })
        );
      }
      return {
        item: res.data.item,
      };
    }
);

// export const fetchMarkersAction: any = createAction(
//   "orders/FETCH_MARKERS",
//   async (countryId: number) =>
//     async (
//       dispatch: Type.Dispatch,
//       getState: () => State.Root
//     ): Promise<{ item: null; markers: any }> => {
//       const state = getState();
//       dispatch(showLoaderAction(true));
//       const res = await axios.get(
//         `${baseUrl}/countries/fetch-markers/${countryId}`,
//         {
//           headers: {
//             ...authHeader(state.user.user.email),
//           },
//         }
//       );
//       if (res.data.markers) {
//         dispatch(showLoaderAction(false));
//       }
//       return {
//         item: null,
//         markers: res.data.markers,
//       };
//     }
// );

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
  "countries/FETCH_ACTIVE_ITEMS",
  async () =>
    (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ count: any; items: any }> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      return axios
        .get(`${baseUrl}/countries/fetch-active`, {
          headers: {
            ...authHeader(state.user.user.email),
          },
        })
        .then((res: any) => {
          dispatch(showLoaderAction(false));
          return {
            count: 0,
            items: res.data.items,
          };
        });
    }
);

export const crudAction: any = createAction(
  "countries/CRUD_ACTION",
  async (formData: any, id: number | null) =>
    async (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<void> => {
      const state = getState();
      const countrydata = state.countries.item;
      dispatch(showLoaderAction(true));
      // console.log(countrydata);
      return axios
        .post(
          `${baseUrl}/countries/update-item`,
          { data: formData, countryData: countrydata },
          {
            headers: {
              ...authHeader(state.user.user.email),
            },
          }
        )
        .then(async () => {
          dispatch(showLoaderAction(false));
          dispatch(setSuccessToastAction("Item has been updated"));
          await dispatch(fetchItemsAction());
        });
    }
);
export const addMarkerAction: any = createAction(
  "countries/ADD_MARKER",
  async (coordinates: any, countryId: number | null) =>
    async (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<void> => {
      const state = getState();
      const countryData = state.countries.item;
      dispatch(showLoaderAction(true));
      // console.log(countrydata);
      return axios
        .get(
          `${baseUrl}/countries/add-pointer?lat=${coordinates.lat}&lng=${coordinates.lng}&countryId=${countryId}`,
          {
            headers: {
              ...authHeader(state.user.user.email),
            },
          }
        )
        .then(async () => {
          dispatch(showLoaderAction(false));
          dispatch(setSuccessToastAction("Marker has been added"));
        });
    }
);
// export const addMarkerAction: any = createAction(
//   "countries/FETCH_ITEMS",
//   async (coordinates: any) =>
//     (
//       dispatch: Type.Dispatch,
//       getState: () => State.Root
//     ): Promise<{ count: any; items: any }> => {
//       const state = getState();
//       const { limit, offset, sort, column, query, filters } =
//       dispatch(showLoaderAction(true));
//       return axios
//         .get(
//           `${baseUrl}/countries/add-marker?lat=${coordinates.lat}&lng=${coordinates.lng}`,
//           {
//             headers: {
//             ...authHeader(state.user.user.email),
//           },
//         })
//         .then((res: any) => {
//           dispatch(showLoaderAction(false));
//           return {
//             count: res.data.count,
//             items: res.data.items,
//           };
//         });
//     }
// );
export const loadMapAction: any = createAction("countries/MAPLOADED_ACTION");
export const checkImageIdsAction: any = createAction(
  "countries/CHECK_IMAGE_IDS"
);
export const initImageIdsAction: any = createAction("countries/INIT_IMAGE_IDS");
export const checkVideoIdsAction: any = createAction(
  "countries/CHECK_VIDEO_IDS"
);
export const initVideoIdsAction: any = createAction("countries/INIT_VIDEO_IDS");
export const initMapAction: any = createAction("countries/INIT_MAP_ACTION");
export const setPaletteAction: any = createAction(
  "countries/SET_PALETTE_COLOR"
);
export const setOpacityAction: any = createAction("countries/SET_OPACITY");
