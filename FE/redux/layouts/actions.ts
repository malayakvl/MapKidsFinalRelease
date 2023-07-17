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
export const checkTitleAction: any = createAction("layouts/CHECK_TITLE");
export const initTitleAction: any = createAction("layouts/INIT_TITLE");
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
export const setModalMarkerConfirmationMetaAction: any = createAction(
  "layouts/SET_MODAL_MARKER_ADD"
);
export const toggleSubmenuAction: any = createAction("layouts/TOGGLE_SUBMENU");
export const initImageIdsAction: any = createAction(
  "layouts/INIT_ALL_IMAGE_IDS"
);
export const checkImageIdsAction: any = createAction(
  "layouts/CHECK_ALL_IMAGE_IDS"
);
export const showPhoneAction: any = createAction("layouts/SHOW_PHONE");
export const showImageGalleryAction: any = createAction(
  "layouts/SHOW_IMAGE_GALLERY"
);
export const showVideoGalleryAction: any = createAction(
  "layouts/SHOW_VIDEO_GALLERY"
);
export const initMapAction: any = createAction("layouts/FRONTEND_INIT_MAP");
export const setFrameTypeAction: any = createAction(
  "layouts/SET_IMG_FRAME_TYPE"
);
export const setImgIndexAction: any = createAction("layouts/SET_IMG_INDEX");
export const setVideoIndexAction: any = createAction("layouts/SET_VIDEO_INDEX");
export const initFrameTypeAction: any = createAction("layouts/FRAME_TYPE");
export const setFrontSelectedCountryAction: any = createAction(
  "layouts/SET_FRONT_SELECTED_COUNTRY"
);
export const setMarkerIdAction: any = createAction(
  "layouts/SET_SELECTED_MARKER_ID"
);
