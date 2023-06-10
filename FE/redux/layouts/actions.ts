import { createAction } from "redux-actions";

// ------------------------------------
// Actions
// ------------------------------------
export const changeReloadAction: any = createAction(
  "layouts/CHANGE_RELOAD_ACTION"
);
export const startDownloadAction: any = createAction(
  "layouts/START_DOWNLOAD_ACTION"
);
export const setupFileNameAction: any = createAction("layouts/SETUP_FILE_NAME");
export const setupRowIdAction: any = createAction(
  "layouts/SETUP_ROW_ID_ACTION"
);
export const showLoaderAction: any = createAction("layouts/SHOW_LOADER_ACTION");
export const setErrorToastAction: any = createAction("layouts/SET_ERROR_TOAST");
export const setSuccessToastAction: any = createAction(
  "layouts/SET_SUCCESS_TOAST"
);
export const setInfoToastAction: any = createAction("layouts/SET_INFO_TOAST");
export const deleteToastAction: any = createAction("layouts/DELETE_TOAST");
export const showColorPopupAction: any = createAction(
  "layouts/SHOW_COLORS_FORM"
);
export const setPaginationAction: any = createAction("layouts/SET_PAGINATION");
export const initIdsAction: any = createAction("layouts/INIT_IDS");
export const checkIdsAction: any = createAction("layouts/CHECK_IDS");
export const checkAllIdsAction: any = createAction("layouts/CHECK_ALL_IDS");
export const uncheckAllIdsAction: any = createAction("layouts/UNCHECK_ALL_IDS");
export const toggleMenuAction: any = createAction("layouts/TOGGLE_MENU");
export const setSwitchHeaderAction: any = createAction(
  "layouts/SWITCH_HEADER_ACTION"
);
export const setActivePageAction: any = createAction("layouts/SET_ACTIVE_TAB");
export const setEditorContentAction: any = createAction(
  "layouts/SET_EDITOR_CONTENT_ACTION"
);
export const setSwitchToggleAction: any = createAction(
  "layouts/SWITCH_HEADER_TOGGLE"
);
export const setModalConfirmationMetaAction: any = createAction(
  "layouts/SET_MODAL_DELETE_CONFIRMATION"
);
export const toggleSubmenuAction: any = createAction("layouts/TOGGLE_SUBMENU");
