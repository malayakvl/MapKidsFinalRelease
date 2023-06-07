declare namespace Articles {
  interface Root {
    loading: boolean;
    isFetched: boolean;
    uploadedFiles: File[];
    checkedIds: number[];
    count: number;
    image: ImageItem;
    items: ImageItem[];
    uploadDone: boolean | null;
  }

  interface ImageItem {
    id: number;
    name: string;
    type: string;
    created_at: any;
    updated_at: any;
  }

  interface ItemData {
    id: number | null;
    title: string;
    title_image: string;
    article_text: string;
    status: boolean;
    created_at: any;
    updated_at: any;
  }
}
