import { createSelector } from "reselect";
// import coordinates from "./index";

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  (state: State.Root) => state.coordinates,
  (coordinates: State.Coordinates): State.Coordinates => coordinates
);
export const markersSelector = createSelector(
  rootSelector,
  (coordinates: State.Coordinates): any => coordinates.items
);
export const markersDataSelector = createSelector(
  rootSelector,
  (coordinates: State.Coordinates): any => coordinates.item
);
export const checkedImageIdsSelector = createSelector(
  rootSelector,
  (coordinates: State.Coordinates): any[] => coordinates.item.images
);
export const checkedVideoIdsSelector = createSelector(
  rootSelector,
  (coordinates: State.Coordinates): any[] => coordinates.item.videos
);
