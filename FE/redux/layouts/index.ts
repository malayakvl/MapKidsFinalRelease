import { Action, handleActions } from "redux-actions";
import {
  setErrorToastAction,
  setSuccessToastAction,
  setInfoToastAction,
  deleteToastAction,
  showLoaderAction,
  changeReloadAction,
  showColorPopupAction,
  startDownloadAction,
  setupFileNameAction,
  setupRowIdAction,
  setPaginationAction,
  checkIdsAction,
  initIdsAction,
  checkAllIdsAction,
  uncheckAllIdsAction,
  setModalConfirmationMetaAction,
  setModalMarkerConfirmationMetaAction,
  toggleMenuAction,
  toggleSubmenuAction,
  setActivePageAction,
  setEditorContentAction,
  initImageIdsAction,
  checkImageIdsAction,
  showPhoneAction,
  showImageGalleryAction,
  showVideoGalleryAction,
  initMapAction,
  setFrameTypeAction,
  setImgIndexAction,
  setVideoIndexAction,
  initFrameTypeAction,
  setFrontSelectedCountryAction,
  checkTitleAction,
  initTitleAction,
  setMarkerIdAction,
} from "./actions";
import { PaginationType } from "../../constants";

const initPagination = {
  limit: 25,
  offset: 0,
  sort: "DESC",
  column: "created_at",
  query: "",
};

// @ts-ignore
const initialState: State.Layouts = {
  pagination: {
    [PaginationType.IMAGES]: {
      ...initPagination,
      sort: "DESC",
      column: "created_at",
      filters: {
        created_at: [],
      },
    },
    [PaginationType.ICONS]: {
      ...initPagination,
      sort: "DESC",
      column: "created_at",
      filters: {
        created_at: [],
      },
    },
    [PaginationType.VIDEOS]: {
      ...initPagination,
      sort: "DESC",
      column: "created_at",
      filters: {
        created_at: [],
      },
    },
    [PaginationType.LOCATIONS]: {
      ...initPagination,
      sort: "DESC",
      column: "created_at",
      filters: {
        created_at: [],
      },
    },
    [PaginationType.ARTICLES]: {
      ...initPagination,
      sort: "DESC",
      column: "created_at",
      filters: {
        created_at: [],
      },
    },
    [PaginationType.COUNTRIES]: {
      ...initPagination,
      sort: "DESC",
      column: "created_at",
      filters: {
        created_at: [],
      },
    },
  },
  toggleMenu: false,
  checkedIds: [],
  checkedTitleIds: [],
  checkedImageIds: [],
  checkedVideoIds: [],
  toasts: [],
  isDataLoading: false,
  isReload: true,
  showModalColorPopup: false,
  startDownload: false,
  fileName: null,
  dbRowId: null,
  switchHeader: false,
  modalConfirmationMeta: null,
  modalMarkerConfirmationMeta: null,
  submenuDisplayStatus: [],
  activeTab: {
    images: { tab: "list" },
    articles: { tab: "list" },
    videos: { tab: "list" },
    countries: { tab: "list" },
  },
  editorContent: "",
  showPhone: false,
  showImageGalley: false,
  showVideoGalley: false,
  mapMain: null,
  frameType: "",
  selectedImgIndex: 0,
  selectedVideoIndex: 0,
  selectedFrameType: "horizontalTypeFrame",
  selectedFrontCountry: null,
  editedTitle: null,
  selectedMarkerId: null,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS: any = {
  [setPaginationAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<{
      type: Type.PaginationType;
      modifier: Partial<Layouts.Pagination>;
    }>
  ): State.Layouts => ({
    ...state,
    pagination: {
      ...state.pagination,
      [action.payload.type]: {
        ...state.pagination[action.payload.type],
        ...action.payload.modifier,
      },
    },
  }),
  [initIdsAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<State.Layouts>
  ): State.Layouts => {
    return <Layouts.Root>(<unknown>{
      ...state,
      checkedIds: action.payload,
    });
  },
  [checkIdsAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<State.Layouts>
  ): State.Layouts => {
    return <Layouts.Root>{
      ...state,
      checkedIds: state.checkedIds.map((data) =>
        (data as any).id === action.payload
          ? { ...data, checked: !data.checked }
          : data
      ),
    };
  },
  [initTitleAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<State.Layouts>
  ): State.Layouts => {
    return <Layouts.Root>(<unknown>{
      ...state,
      checkedTitleIds: action.payload,
    });
  },
  // [initTitleAction]: (
  //   state: State.Layouts,
  //   action: Type.ReduxAction<State.Layouts>
  // ): State.Layouts => {
  //   return <Layouts.Root>{
  //     ...state,
  //     checkedTitleIds: state.checkedTitleIds.map((data) =>
  //       (data as any).id === action.payload.id
  //         ? { ...data, title: action.payload.title }
  //         : data
  //     ),
  //   };
  // },
  [checkTitleAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<State.Layouts>
  ): State.Layouts => {
    return <Layouts.Root>{
      ...state,
      checkedTitleIds: state.checkedTitleIds.map((data) =>
        (data as any).id === action.payload.id
          ? { ...data, title: action.payload.title }
          : data
      ),
    };
  },
  [checkAllIdsAction]: (state: State.Layouts): State.Layouts => {
    return <Layouts.Root>{
      ...state,
      checkedIds: state.checkedIds.map((data) =>
        (data as any).id ? { ...data, checked: true } : data
      ),
    };
  },
  [uncheckAllIdsAction]: (state: State.Layouts): State.Layouts => {
    return <Layouts.Root>{
      ...state,
      checkedIds: state.checkedIds.map((data) =>
        (data as any).id ? { ...data, checked: false } : data
      ),
    };
  },
  [initImageIdsAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<State.Layouts>
  ): State.Layouts => {
    return <Layouts.Root>(<unknown>{
      ...state,
      checkedImageIds: action.payload,
    });
  },
  [checkImageIdsAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<State.Layouts>
  ): State.Layouts => {
    return <Layouts.Root>{
      ...state,
      checkedImageIds: state.checkedImageIds.map((data) =>
        (data as any).id === action.payload
          ? { ...data, checked: !data.checked }
          : data
      ),
    };
  },
  [changeReloadAction]: {
    next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
      ...state,
      isReload: false,
    }),
  },
  [showLoaderAction]: {
    next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
      ...state,
      isDataLoading: action.payload,
    }),
  },
  [setupFileNameAction]: {
    next: (state: State.Layouts, action: Action<string>): State.Layouts => ({
      ...state,
      fileName: action.payload,
    }),
  },
  [setupRowIdAction]: {
    next: (state: State.Layouts, action: Action<number>): State.Layouts => ({
      ...state,
      dbRowId: action.payload,
    }),
  },
  [startDownloadAction]: {
    next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
      ...state,
      startDownload: action.payload,
    }),
  },
  [setErrorToastAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<Layouts.ToastMessage>
  ): State.Layouts => ({
    ...state,
    toasts: [
      ...state.toasts,
      { id: Date.now(), type: "error", message: action.payload },
    ],
  }),
  [setSuccessToastAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<Layouts.ToastMessage>
  ): State.Layouts => ({
    ...state,
    toasts: [
      ...state.toasts,
      { id: Date.now(), type: "success", message: action.payload },
    ],
  }),
  [setInfoToastAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<Layouts.ToastMessage>
  ): State.Layouts => ({
    ...state,
    toasts: [
      ...state.toasts,
      { id: Date.now(), type: "info", message: action.payload },
    ],
  }),
  [deleteToastAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<number>
  ): State.Layouts => ({
    ...state,
    toasts: [],
  }),
  [showColorPopupAction]: {
    next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
      ...state,
      showModalColorPopup: action.payload,
    }),
  },
  [toggleMenuAction]: {
    next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
      ...state,
      toggleMenu: action.payload,
    }),
  },
  [toggleSubmenuAction]: {
    next: (state: State.Layouts, action: Action<any>): State.Layouts => ({
      ...state,
      submenuDisplayStatus: [...state.submenuDisplayStatus, action.payload],
    }),
  },
  [setModalConfirmationMetaAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<Layouts.ModalConfirmationMeta>
  ): State.Layouts => ({
    ...state,
    modalConfirmationMeta: action.payload && {
      ...action.payload,
    },
  }),
  [setModalMarkerConfirmationMetaAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<Layouts.ModalConfirmationMeta>
  ): State.Layouts => ({
    ...state,
    modalMarkerConfirmationMeta: action.payload && {
      ...action.payload,
    },
  }),
  [setActivePageAction]: (
    state: State.Layouts,
    action: Type.ReduxAction<{
      type: string;
      modifier: string;
    }>
  ): State.Layouts => ({
    ...state,
    activeTab: {
      ...state.activeTab,
      [action.payload.type]: {
        tab: action.payload.modifier,
      },
    },
  }),
  [setEditorContentAction]: {
    next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
      ...state,
      isReload: false,
    }),
  },
  [showPhoneAction]: {
    next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
      ...state,
      showPhone: action.payload,
    }),
  },
  [showImageGalleryAction]: {
    next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
      ...state,
      showImageGalley: action.payload,
    }),
  },
  [showVideoGalleryAction]: {
    next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
      ...state,
      showVideoGalley: action.payload,
    }),
  },
  [initMapAction]: {
    next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
      ...state,
      mapMain: action.payload,
    }),
  },
  [setFrameTypeAction]: {
    next: (state: State.Layouts, action: Action<string>): State.Layouts => ({
      ...state,
      frameType: action.payload,
    }),
  },
  [setImgIndexAction]: {
    next: (state: State.Layouts, action: Action<number>): State.Layouts => ({
      ...state,
      selectedImgIndex: action.payload,
    }),
  },
  [setVideoIndexAction]: {
    next: (state: State.Layouts, action: Action<number>): State.Layouts => ({
      ...state,
      selectedVideoIndex: action.payload,
    }),
  },
  [initFrameTypeAction]: {
    next: (state: State.Layouts, action: Action<string>): State.Layouts => ({
      ...state,
      selectedFrameType: action.payload,
    }),
  },
  [setFrontSelectedCountryAction]: {
    next: (state: State.Layouts, action: Action<string>): State.Layouts => ({
      ...state,
      selectedFrontCountry: action.payload,
    }),
  },
  [setMarkerIdAction]: {
    next: (
      state: State.Layouts,
      action: Action<number | null>
    ): State.Layouts => ({
      ...state,
      selectedMarkerId: action.payload,
    }),
  },
};

export {
  setErrorToastAction,
  setSuccessToastAction,
  setInfoToastAction,
  deleteToastAction,
  changeReloadAction,
  showColorPopupAction,
  startDownloadAction,
  setupFileNameAction,
  setupRowIdAction,
  setPaginationAction,
  checkIdsAction,
  checkTitleAction,
  initIdsAction,
  checkAllIdsAction,
  uncheckAllIdsAction,
  setModalConfirmationMetaAction,
  setModalMarkerConfirmationMetaAction,
  toggleMenuAction,
  toggleSubmenuAction,
  setActivePageAction,
  initImageIdsAction,
  checkImageIdsAction,
  showPhoneAction,
  showImageGalleryAction,
  showVideoGalleryAction,
  initMapAction,
  setFrameTypeAction,
  setImgIndexAction,
  setVideoIndexAction,
  initFrameTypeAction,
  setFrontSelectedCountryAction,
  initTitleAction,
  setMarkerIdAction,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
