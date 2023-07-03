import { Action, handleActions } from "redux-actions";
import {
  fetchItemsAction,
  fetchItemAction,
  loadMapAction,
  checkImageIdsAction,
  initImageIdsAction,
  checkVideoIdsAction,
  initVideoIdsAction,
  setPaletteAction,
  initMapAction,
  setOpacityAction,
} from "./actions";

const initialState: {
  items: any[];
} = {
  items: [],
};

const ACTION_HANDLERS: any = {
  [fetchItemsAction]: {
    next: (
      state: State.Coordinates,
      action: Type.ReduxAction<Pick<State.Coordinates, "items">>
    ): State.Coordinates => ({
      ...state,
      ...action.payload,
    }),
    throw: (state: State.Countries): State.Coordinates => ({
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
  setPaletteAction,
  initMapAction,
  setOpacityAction,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
