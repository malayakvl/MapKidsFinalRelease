import { createSelector } from "reselect";

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  (state: State.Root) => state.countries,
  (countries: State.Countries): State.Countries => countries
);
export const paginatedItemsSelector = createSelector(
  rootSelector,
  (countries: State.Countries): any => countries.items
);
export const itemCountSelector = createSelector(
  rootSelector,
  (countries: State.Countries): number => countries.count
);
export const isFetchSelector = createSelector(
  rootSelector,
  (countries: State.Countries): boolean => countries.isFetched
);
