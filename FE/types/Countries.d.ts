declare namespace Countries {
  interface Root {
    loading: boolean;
    isFetched: boolean;
    uploadedFiles: File[];
    checkedIds: number[];
    count: number;
    items: any[];
    item: Item | null;
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
    markers: any;
    reloadMap: boolean;
    mapRebuilded: boolean;
    countryMapRebuild: any;
    markersUpdated: any;
  }

  interface Item {
    id: any;
    name: any;
    active: any;
    iso: any;
    iso3: any;
    currency: any;
    flag: any;
    currency_name: any;
    created_at: any;
    updated_at: any;
    images: any;
    description: any;
    videos: any;
    fillColor: any;
    fillOpacity: any;
    fill_color: any;
    fill_opacity: any;
    countryCenter: any;
    markers: any;
  }

  interface ItemData {
    id: number | null;
    name: string;
    flag: any;
    countryCenter: any;
    fillColor: any;
    fillOpacity: any;
    iso: any;
    iso3: any;
    active: boolean;
    title: any;
    description: any;
    created_at: any;
    updated_at: any;
    fill_color: any;
    fill_opacity: any;
    markers: any;
  }

  interface CheckedIds {
    id: number;
    checked: boolean;
  }
}
