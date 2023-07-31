declare namespace Countries {
  interface Root {
    loading: boolean;
    isFetched: boolean;
    uploadedFiles: File[];
    checkedIds: number[];
    count: number;
    items: any;
    item: Item;
    editedItem: Item | null;
    mapLoaded: boolean;
    checkedImageIds: CheckedIds[];
    checkedVideoIds: CheckedIds[];
    uploadDone: boolean | null;
    fillColor: any;
    fillOpacity: any;
    fill_color: any;
    fill_opacity: any;
    countryMap: any;
    iso3: any;
    imagesSelectedIds: any[];
    videosSelectedIds: any[];
    title: any;
    description: any;
    titleImageId: number | null;
  }

  interface Item {
    id: number;
    lat: any;
    lng: any;
    description: any;
    main_id: number | null;
    title: any;
    images: any;
    videos: any;
    mainImage: any;
    main_image_id: any;
  }

  interface ItemData {
    id: number | null;
    lat: any;
    lng: any;
    images: any;
    videos: any;
  }

  interface CheckedIds {
    id: number;
    checked: boolean;
  }
}
