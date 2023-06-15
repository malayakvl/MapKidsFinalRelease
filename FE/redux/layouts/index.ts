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
} from "./actions";
import { PaginationType } from "../../constants";

const initPagination = {
  limit: 25,
  offset: 0,
  sort: "DESC",
  column: "created_at",
  query: "",
};

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
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
