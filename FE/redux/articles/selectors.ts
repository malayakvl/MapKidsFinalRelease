import { createSelector } from "reselect";

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  (state: State.Root) => state.articles,
  (articles: State.Articles): State.Articles => articles
);
export const uploadFinish = createSelector(
  rootSelector,
  (articles: State.Articles): boolean | null => articles.uploadDone
);
export const isFetchedSelector = createSelector(
  rootSelector,
  (articles: State.Articles): boolean => articles.isFetched
);
export const uploadedFilesSelector = createSelector(
  rootSelector,
  (articles: State.Articles): File[] => articles.uploadedFiles
);
export const paginatedItemsSelector = createSelector(
    rootSelector,
    (articles: State.Articles): any => articles.items
);
export const itemCountSelector = createSelector(
    rootSelector,
    (articles: State.Articles): number => articles.count
);
// export const productItemSelector = createSelector(
//     rootSelector,
//     (products: State.Products): Products.Product => products.product
// );
export const isFetchSelector = createSelector(
    rootSelector,
    (articles: State.Images): boolean => articles.isFetched
);
