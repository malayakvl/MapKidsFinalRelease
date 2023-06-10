declare namespace Countries {
  interface Root {
    loading: boolean;
    isFetched: boolean;
    uploadedFiles: File[];
    checkedIds: number[];
    count: number;
    // image: ImageItem;
    items: any[];
    uploadDone: boolean | null;
  }

  interface Item {
    id: any;
    name: any;
    active: any;
    iso: any;
    iso3: any;
    currency: any;
    currency_name: any;
    created_at: any;
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
