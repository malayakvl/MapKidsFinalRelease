import { Action, handleActions } from "redux-actions";
import {
  fetchItemsAction,
  fetchItemAction,
  loadMapAction,
  checkImageIdsAction,
  initImageIdsAction,
  checkVideoIdsAction,
  initVideoIdsAction,
  crudAction,
  setPaletteAction,
  initMapAction,
  setOpacityAction,
  addMarkerAction,
  activeItemAction,
  updateMarkerListAction,
  removeMarkerAction,
  reloadMapAction,
  mapRebuildedAction,
  initRebuildMapAction,
  setMainMarkerAction,
  clearItemAaction,
} from "./actions";

const initialState: {
  checkedIds: any[];
  isFetched: boolean;
  mapLoaded: boolean;
  count: number;
  loading: boolean;
  items: any[];
  item: any;
  editedItem: any;
  images: any[];
  videos: any[];
  uploadDone: any;
  checkedImageIds: number[];
  checkedVideoIds: number[];
  fillColor: any;
  fill_color: any;
  fill_opacity: any;
  fillOpacity: any;
  countryMap: any;
  countryCenter: any;
  reloadMap: boolean;
  rebuildMap: boolean;
  countryMapRebuild: any;
  markersUpdated: any;
} = {
  items: [],
  item: null,
  editedItem: null,
  loading: false,
  mapLoaded: false,
  isFetched: false,
  checkedIds: [],
  count: 0,
  images: [],
  videos: [],
  uploadDone: null,
  checkedImageIds: [],
  checkedVideoIds: [],
  fill_color: null,
  fill_opacity: null,
  fillColor: null,
  fillOpacity: null,
  countryMap: null,
  countryCenter: null,
  reloadMap: false,
  rebuildMap: false,
  countryMapRebuild: null,
  markersUpdated: [],
};

const ACTION_HANDLERS: any = {
  [fetchItemsAction]: {
    next: (
      state: State.Countries,
      action: Type.ReduxAction<Pick<State.Countries, "items">>
    ): State.Countries => ({
      ...state,
      ...action.payload,
    }),
    throw: (state: State.Countries): State.Countries => ({
      ...state,
    }),
  },
  [activeItemAction]: {
    next: (
      state: State.Countries,
      action: Type.ReduxAction<Pick<State.Countries, "items">>
    ): State.Countries => ({
      ...state,
      ...action.payload,
    }),
    throw: (state: State.Countries): State.Countries => ({
      ...state,
    }),
  },
  [fetchItemAction]: {
    next: (
      state: State.Countries,
      action: Type.ReduxAction<Pick<State.Countries, "item">>
    ): State.Countries => ({
      ...state,
      ...action.payload,
      loading: false,
      isFetched: true,
    }),
    throw: (state: State.Countries): State.Countries => ({
      ...state,
      loading: false,
      isFetched: true,
    }),
  },
  [loadMapAction]: {
    next: (
      state: State.Countries,
      action: Action<boolean>
    ): State.Countries => ({
      ...state,
      mapLoaded: action.payload,
    }),
  },
  [clearItemAaction]: {
    next: (
      state: State.Countries,
      action: Action<boolean>
    ): State.Countries => ({
      ...state,
      editedItem: null,
    }),
  },
  [initImageIdsAction]: (
    state: State.Countries,
    action: Type.ReduxAction<State.Countries>
  ): State.Countries => {
    return <Countries.Root>(<unknown>{
      ...state,
      checkedImageIds: action.payload,
    });
  },
  [checkImageIdsAction]: (
    state: State.Countries,
    action: Type.ReduxAction<State.Countries>
  ): State.Countries => {
    return <Countries.Root>{
      ...state,
      checkedImageIds: state.checkedImageIds.map((data) =>
        (data as any).id === action.payload
          ? { ...data, checked: !data.checked }
          : data
      ),
    };
  },
  [initVideoIdsAction]: (
    state: State.Countries,
    action: Type.ReduxAction<State.Countries>
  ): State.Countries => {
    return <Countries.Root>(<unknown>{
      ...state,
      checkedVideoIds: action.payload,
    });
  },
  [checkVideoIdsAction]: (
    state: State.Countries,
    action: Type.ReduxAction<State.Countries>
  ): State.Countries => {
    return <Countries.Root>{
      ...state,
      checkedVideoIds: state.checkedVideoIds.map((data) =>
        (data as any).id === action.payload
          ? { ...data, checked: !data.checked }
          : data
      ),
    };
  },
  [setPaletteAction]: {
    next: (state: State.Countries, action: Action<any>): State.Countries => ({
      ...state,
      fill_color: action.payload,
    }),
  },
  [setOpacityAction]: {
    next: (state: State.Countries, action: Action<any>): State.Countries => ({
      ...state,
      fill_opacity: action.payload,
    }),
  },
  [initMapAction]: {
    next: (state: State.Countries, action: Action<any>): State.Countries => ({
      ...state,
      countryMap: action.payload,
    }),
  },
  [addMarkerAction]: {
    next: (state: State.Countries, action: Action<any>): State.Countries => ({
      ...state,
      countryMap: action.payload,
    }),
  },
  [updateMarkerListAction]: {
    next: (state: State.Countries, action: Action<any>): State.Countries => ({
      ...state,
      markers: action.payload,
    }),
  },
  [reloadMapAction]: {
    next: (state: State.Countries, action: Action<any>): State.Countries => ({
      ...state,
      reloadMap: action.payload,
    }),
  },
  [mapRebuildedAction]: {
    next: (state: State.Countries, action: Action<any>): State.Countries => ({
      ...state,
      mapRebuilded: action.payload,
    }),
  },
  [initRebuildMapAction]: {
    next: (state: State.Countries, action: Action<any>): State.Countries => ({
      ...state,
      countryMapRebuild: action.payload,
    }),
  },
  [setMainMarkerAction]: {
    next: (state: State.Countries, action: Action<any>): State.Countries => ({
      ...state,
      markersUpdated: action.payload,
    }),
  },

  // [setMarkerListAction]: {
  //   next: (state: State.Countries, action: Action<any>): State.Countries => ({
  //     ...state,
  //     markers: action.payload,
  //   }),
  // },
  // [fetchMarkersAction]: {
  //   next: (
  //     state: State.Countries,
  //     action: Type.ReduxAction<Pick<State.Countries, "items">>
  //   ): State.Countries => ({
  //     ...state,
  //     ...action.payload,
  //   }),
  //   throw: (state: State.Countries): State.Countries => ({
  //     ...state,
  //   }),
  // },
};

export {
  fetchItemsAction,
  fetchItemAction,
  loadMapAction,
  initImageIdsAction,
  checkImageIdsAction,
  initVideoIdsAction,
  checkVideoIdsAction,
  crudAction,
  setPaletteAction,
  initMapAction,
  setOpacityAction,
  addMarkerAction,
  activeItemAction,
  updateMarkerListAction,
  removeMarkerAction,
  reloadMapAction,
  mapRebuildedAction,
  initRebuildMapAction,
  setMainMarkerAction,
  clearItemAaction,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
