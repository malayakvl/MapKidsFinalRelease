declare namespace Layouts {
  interface Root {
    pagination: {
      images: Pagination;
      videos: Pagination;
      articles: Pagination;
    };
    toggleMenu: boolean;
    checkedIds: CheckedIds[];
    toasts: Toast[];
    isDataLoading: boolean;
    isReload: boolean;
    showModalColorPopup: boolean;
    startDownload: boolean;
    fileName: string | null;
    dbRowId: number | null;
    switchHeader: boolean;
    modalConfirmationMeta: ModalConfirmationMeta | null;
    submenuDisplayStatus: any;
    activeTab: {
      images: TabTypes;
      articles: TabTypes;
      videos: TabTypes;
    };
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

  interface Meta {
    preWarningSetting?: number;
  }

  interface ModalConfirmationMeta {
    titleKey?: string;
    onConfirm: () => void;
    onCancel?: () => void;
  }
}