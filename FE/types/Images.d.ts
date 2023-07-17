declare namespace Images {
  interface Root {
    loading: boolean;
    isFetched: boolean;
    uploadedFiles: File[];
    checkedIds: number[];
    count: number;
    image: ImageItem;
    items: ImageItem[];
    allItems: ImageItem[];
    uploadDone: boolean | null;
  }

  interface ImageItem {
    id: number;
    name: string;
    title: string;
    type: string;
    created_at: any;
    updated_at: any;
  }
}
