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
export const activeCountriesSelector = createSelector(
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
export const countryItemSelector = createSelector(
  rootSelector,
  (countries: State.Countries): Countries.ItemData => countries.item
);
export const mapLoadedSelector = createSelector(
  rootSelector,
  (countries: State.Countries): boolean => countries.mapLoaded
);
export const checkedImageIdsSelector = createSelector(
  rootSelector,
  (countries: State.Countries): Countries.CheckedIds[] =>
    countries.checkedImageIds
);
export const checkedVideoIdsSelector = createSelector(
  rootSelector,
  (countries: State.Countries): Countries.CheckedIds[] =>
    countries.checkedVideoIds
);
export const layerFillSelector = createSelector(
  rootSelector,
  (countries: State.Countries): any => countries.fill_color
);
export const layerOpacitySelector = createSelector(
  rootSelector,
  (countries: State.Countries): any => countries.fill_opacity
);
export const countryMapSelector = createSelector(
  rootSelector,
  (countries: State.Countries): any => countries.countryMap
);
