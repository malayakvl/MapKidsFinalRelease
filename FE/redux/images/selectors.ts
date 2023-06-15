import { createSelector } from "reselect";

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  (state: State.Root) => state.images,
  (images: State.Images): State.Images => images
);
export const uploadFinish = createSelector(
  rootSelector,
  (images: State.Images): boolean | null => images.uploadDone
);
export const nonpaginatedItemsSelector = createSelector(
  rootSelector,
  (images: State.Images): any => images.allItems
);
export const isFetchedSelector = createSelector(
  rootSelector,
  (images: State.Images): boolean => images.isFetched
);
export const uploadedFilesSelector = createSelector(
  rootSelector,
  (images: State.Images): File[] => images.uploadedFiles
);
export const paginatedItemsSelector = createSelector(
  rootSelector,
  (images: State.Images): any => images.items
);
export const itemCountSelector = createSelector(
  rootSelector,
  (images: State.Images): number => images.count
);
// export const productItemSelector = createSelector(
//     rootSelector,
//     (products: State.Products): Products.Product => products.product
// );
export const isFetchSelector = createSelector(
  rootSelector,
  (images: State.Images): boolean => images.isFetched
);
