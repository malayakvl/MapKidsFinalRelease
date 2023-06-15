import { createSelector } from "reselect";

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  (state: State.Root) => state.videos,
  (videos: State.Videos): State.Videos => videos
);
export const isFetchedSelector = createSelector(
  rootSelector,
  (videos: State.Videos): boolean => videos.isFetched
);
export const paginatedItemsSelector = createSelector(
  rootSelector,
  (videos: State.Videos): any => videos.items
);
export const itemCountSelector = createSelector(
  rootSelector,
  (videos: State.Videos): number => videos.count
);
export const nonpaginatedItemsSelector = createSelector(
  rootSelector,
  (videos: State.Videos): any => videos.allItems
);
// export const productItemSelector = createSelector(
//     rootSelector,
//     (products: State.Products): Products.Product => products.product
// );
export const isFetchSelector = createSelector(
  rootSelector,
  (videos: State.Videos): boolean => videos.isFetched
);
