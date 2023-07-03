declare namespace Countries {
  interface Root {
    loading: boolean;
    isFetched: boolean;
    uploadedFiles: File[];
    checkedIds: number[];
    count: number;
    items: any[];
    item: Item;
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
  }

  interface Item {
    id: any;
    lat: any;
    lng: any;
    images: any;
    videos: any;
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
