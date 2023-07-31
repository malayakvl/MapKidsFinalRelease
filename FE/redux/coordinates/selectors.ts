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
export const countryItemBackSelector = createSelector(
  rootSelector,
  (countries: State.Countries): any => countries?.editedItem
);
export const imageCheckedIdsSelector = createSelector(
  rootSelector,
  (coordinates: State.Coordinates): any[] => coordinates.imagesSelectedIds
);
export const videoCheckedIdsSelector = createSelector(
  rootSelector,
  (coordinates: State.Coordinates): any[] => coordinates.videosSelectedIds
);
export const markerTitleSelector = createSelector(
  rootSelector,
  (coordinates: State.Coordinates): any[] => coordinates.title
);
export const mainTitleIdSelector = createSelector(
  rootSelector,
  (coordinates: State.Coordinates): number | null => coordinates.titleImageId
);
