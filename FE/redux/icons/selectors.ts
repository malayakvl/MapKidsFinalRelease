import { createSelector } from "reselect";

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  (state: State.Root) => state.icons,
  (icons: State.Icons): State.Icons => icons
);
export const uploadFinish = createSelector(
  rootSelector,
  (icons: State.Icons): boolean | null => icons.uploadDone
);
export const nonpaginatedItemsSelector = createSelector(
  rootSelector,
  (icons: State.Icons): any => icons.allItems
);
export const dropdownIconItemsSelector = createSelector(
  rootSelector,
  (icons: State.Icons): any => icons.allIconItems
);
export const isFetchedSelector = createSelector(
  rootSelector,
  (icons: State.Icons): boolean => icons.isFetched
);
export const uploadedFilesSelector = createSelector(
  rootSelector,
  (icons: State.Icons): File[] => icons.uploadedFiles
);
export const paginatedItemsSelector = createSelector(
  rootSelector,
  (icons: State.Icons): any => icons.items
);
export const itemCountSelector = createSelector(
  rootSelector,
  (icons: State.Icons): number => icons.count
);
export const isFetchSelector = createSelector(
  rootSelector,
  (icons: State.Icons): boolean => icons.isFetched
);
