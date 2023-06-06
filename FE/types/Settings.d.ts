declare namespace Settings {
  interface Root {
    data: Settings;
    settings: Settings;
  }

  interface Settings {
    email_notification: string;
    per_page: number;
    loading: boolean;
    isFetched: boolean;
  }
}
