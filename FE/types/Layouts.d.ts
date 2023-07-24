declare namespace Layouts {
  interface Root {
    title: any;
    id: any;
    pagination: {
      images: Pagination;
      icons: Pagination;
      videos: Pagination;
      articles: Pagination;
      locations: Pagination;
      countries: Pagination;
    };
    toggleMenu: boolean;
    checkedIds: CheckedIds[];
    checkedImageIds: CheckedIds[];
    checkedVideoIds: CheckedIds[];
    checkedTitleIds: CheckedTitle[];
    toasts: Toast[];
    isDataLoading: boolean;
    isReload: boolean;
    showModalColorPopup: boolean;
    startDownload: boolean;
    fileName: string | null;
    dbRowId: number | null;
    switchHeader: boolean;
    modalConfirmationMeta: ModalConfirmationMeta | null;
    modalMarkerConfirmationMeta: ModalConfirmationMeta | null;
    submenuDisplayStatus: any;
    activeTab: {
      images: TabTypes;
      articles: TabTypes;
      videos: TabTypes;
      countries: TabTypes;
    };
    editorContent: string;
    showPhone: boolean;
    showImageGalley: boolean;
    showVideoGalley: boolean;
    mapMain: any;
    frameType: string;
    selectedImgIndex: number;
    selectedVideoIndex: number;
    selectedFrameType: string;
    selectedFrontCountry: any;
    editedTitle: any;
    selectedMarkerId: number | null;
  }

  interface TabTypes {
    tab: string;
  }

  interface Toast {
    id: number;
    message: ToastMessage;
    type: "error" | "success" | "info";
  }

  type ToastMessage = string | { key: string; options: object };

  interface Pagination {
    limit: number;
    offset: number;
    sort: string;
    column: string;
    query: string;
    filters?: any;
    meta?: Meta;
  }
  interface CheckedIds {
    id: number;
    checked: boolean;
  }

  interface CheckedTitle {
    id: number;
    title: string;
  }

  interface Meta {
    preWarningSetting?: number;
  }

  interface ModalConfirmationMeta {
    titleKey?: string;
    onConfirm: () => void;
    onCancel?: () => void;
  }
}
