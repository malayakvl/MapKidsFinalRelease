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
export const articleItemSelector = createSelector(
  rootSelector,
  (articles: State.Articles): Articles.ItemData => articles.item
);
export const isFetchSelector = createSelector(
  rootSelector,
  (articles: State.Articles): boolean => articles.isFetched
);
