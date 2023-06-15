declare namespace Videos {
  interface Root {
    loading: boolean;
    isFetched: boolean;
    checkedIds: number[];
    count: number;
    image: ImageItem;
    items: VideoItem[];
    allItems: VideoItem[];
  }

  interface ImageItem {
    id: number;
    name: string;
    type: string;
    created_at: any;
    updated_at: any;
  }
  interface VideoItem {
    id: number;
    url: string;
    code: string;
    created_at: any;
    updated_at: any;
  }
}
