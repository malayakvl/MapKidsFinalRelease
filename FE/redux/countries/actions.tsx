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
        `${baseUrl}/countries/set-main/${id}/${countryData.id}`,
        {
          headers: {
            ...authHeader(state.user.user.email),
          },
        }
      );
      if (res.status) {
        dispatch(showLoaderAction(false));
        dispatch(fetchItemAction(countryData.id));
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
        .then(async (res) => {
          dispatch(showLoaderAction(false));
          dispatch(updateMarkerListAction(res.data.markersList));
          // dispatch()
          dispatch(setSuccessToastAction("Item has been updated"));
          await dispatch(fetchItemsAction());
        });
    }
);
export const updateColorAction: any = createAction(
  "countries/UPDATE_COLOR_ACTION",
  async (color: any, id: number | null) =>
    async (
      dispatch: Type.Dispatch,
      getState: () => State.Root
    ): Promise<void> => {
      const state = getState();
      const countrydata = state.countries.item;
      dispatch(showLoaderAction(true));
      return axios
        .post(
          `${baseUrl}/countries/update-color?color=${color.replace(
            "#",
            ""
          )}&countryId=${countrydata.id}`,
          { color: color, countryId: countrydata.id },
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
        .then(async (res) => {
          console.log("Markers list", res.data.markersList);
          dispatch(updateMarkerListAction(res.data.markersList));
          dispatch(showLoaderAction(false));
          // dispatch(updateMarker)
          dispatch(setSuccessToastAction("Marker has been added"));
        });
    }
);
export const updateOpacityAction: any = createAction(
  "countries/UPDATE_OPACITY_ACTION",
  async (opacity: any, countryId: number) =>
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
          `${baseUrl}/countries/update-opacity?opacity=${opacity}&countryId=${countrydata.id}`,
          { opacity: opacity, countryData: countrydata },
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
export const removeMarkerAction: any = createAction(
  "countries/REMOVE_MARKER_ACTION",
  async (markerId: number, countryId: number, countryMap: any) =>
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
          `${baseUrl}/countries/remove-marker?markerId=${markerId}&countryId=${countryId}`,
          {},
          {
            headers: {
              ...authHeader(state.user.user.email),
            },
          }
        )
        .then(async (res) => {
          dispatch(showLoaderAction(false));
          dispatch(updateMarkerListAction(res.data.markersList));
          dispatch(setSuccessToastAction("Item has been updated"));
          // dispatch(initMapAction(countryMap));
          dispatch(reloadMapAction(true));

          // dispatch(reloadMapAction(true));
          await dispatch(fetchItemsAction());
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
export const updateMarkerListAction: any = createAction(
  "countries/UPDATE_MARKERS"
);
export const checkImageIdsAction: any = createAction(
  "countries/CHECK_IMAGE_IDS"
);
export const initImageIdsAction: any = createAction("countries/INIT_IMAGE_IDS");
export const checkVideoIdsAction: any = createAction(
  "countries/CHECK_VIDEO_IDS"
);
export const initVideoIdsAction: any = createAction("countries/INIT_VIDEO_IDS");
export const initMapAction: any = createAction("countries/INIT_MAP_ACTION");
export const initRebuildMapAction: any = createAction(
  "countries/INIT_REBIOL_MAP_ACTION"
);
export const reloadMapAction: any = createAction("countries/RELOAD_MAP_ACTION");
export const mapRebuildedAction: any = createAction(
  "countries/REBUILDED_MAP_ACTION"
);
export const setPaletteAction: any = createAction(
  "countries/SET_PALETTE_COLOR"
);
export const setOpacityAction: any = createAction("countries/SET_OPACITY");
