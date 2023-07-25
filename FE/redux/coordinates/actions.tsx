import { createAction } from "redux-actions";
import axios from "axios";
import { authHeader } from "../../lib/functions";
import {
  setMarkerIdAction,
  showLoaderAction,
  showPhoneAction,
} from "../layouts/actions";
import { baseApiUrl } from "../../constants";
// import Coordinates from "./index";
const baseUrl = `${baseApiUrl}/api`;
// import { paginationSelectorFactory } from "../layouts/selectors";
// import { PaginationType } from "../../constants";
// import queryString from "query-string";

export const fetchItemsMarkersAction: any = createAction(
  "pointers/FETCH_ITEMS",
  async () =>
    (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ count: any; items: any }> => {
      const state = getState();
      // const { limit, offset, sort, column, query, filters } =
      //   paginationSelectorFactory(PaginationType.COUNTRIES)(state);
      // const queryFilter = JSON.stringify(filters);
      dispatch(showLoaderAction(true));
      return axios
        .get(`${baseUrl}/markers/list`, {
          headers: {
            ...authHeader(state.user.user.email),
          },
        })
        .then((res: any) => {
          dispatch(showLoaderAction(false));
          return {
            count: 1,
            items: res.data.items,
          };
        });
    }
);
export const fetchItemMarkerAction: any = createAction(
  "markers/FETCH_ITEM",
  async (id: number) =>
    async (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ item: any }> => {
      const state = getState();
      const selectedMarkerId = state.layouts.selectedMarkerId;
      if (selectedMarkerId === id) {
        dispatch(showPhoneAction(false));
        dispatch(setMarkerIdAction(null));
        return {
          item: null,
        };
      } else {
        dispatch(showLoaderAction(true));
        const res = await axios.get(`${baseUrl}/markers/fetch-item/${id}`, {
          headers: {
            ...authHeader(state.user.user.email),
          },
        });
        if (res.status) {
          dispatch(showLoaderAction(false));
          dispatch(setMarkerIdAction(res.data.item.id));
        }
        return {
          item: res.data.item,
        };
      }
    }
);
export const fetchItemDataMarkerAction: any = createAction(
  "markers/FETCH_BACKEND_ITEM",
  async (id: number) =>
    async (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ editedItem: any }> => {
      const state = getState();
      dispatch(showLoaderAction(true));
      const res = await axios.get(`${baseUrl}/markers/fetch-item/${id}`, {
        headers: {
          ...authHeader(state.user.user.email),
        },
      });
      if (res.status) {
        dispatch(showLoaderAction(false));
        dispatch(setMarkerIdAction(res.data.item.id));
      }
      return {
        editedItem: res.data.item,
      };
    }
);
export const setMainMarkerAction: any = createAction(
  "markers/SET_MAIN_MARKER",
  async (id: number) =>
    async (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<{ item: any }> => {
      const state = getState();
      const countryData = state.countries.item;
      dispatch(showLoaderAction(true));
      const res = await axios.get(
        `${baseUrl}/countries/set-main/${id}/${countryData?.id}`,
        {
          headers: {
            ...authHeader(state.user.user.email),
        },
        }
      );
      if (res.status) {
        dispatch(showLoaderAction(false));
      }
      return {
        item: res.data.item,
      };
    }
);

// export const updateImageIdsAction: any = createAction(
//   "markers/UPDATE_IMAGE_IDS",
//   async (id: number) =>
//         async (
//             dispatch: Type.Dispatch,
//             getState: () => State.Root
//         ): Promise<{ item: Articles.ItemData }> => {
//           const state = getState();
//           dispatch(showLoaderAction(true));
//           const res = await axios.get(`${baseUrl}/markers/fetch-item/${id}`, {
//             headers: {
//               ...authHeader(state.user.user.email),
//             },
//           });
//           if (res.status) {
//             dispatch(showLoaderAction(false));
//           }
//           return {
//             item: res.data.item,
//           };
//         }
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

export const updateImageIdsAction: any = createAction(
  "coordintate/UPDATE_IMAGE_IDS"
);
export const updateVideoIdsAction: any = createAction(
  "coordintate/UPDATE_VIDEO_IDS"
);
export const updateTitleAction: any = createAction("coordintate/UPDATE_TITLE");
export const updateIconAction: any = createAction("coordintate/UPDATE_ICON");
export const clearDataMarkerAction: any = createAction(
  "coordintate/CLEAR_DATA_MARKER"
);
