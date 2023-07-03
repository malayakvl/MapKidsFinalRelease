declare namespace State {
  interface Root {
    router: Type.RouterRootState;
    layouts: Layouts;
    profile: Profile;
    stepData: StepData;
    settings: Settings;
    locations: Locations;
    countries: Countries;
    user: User;
    images: Images;
    videos: Videos;
    articles: Articles;
    userRequests: UserRequests;
    coordiates: Coordinates;
  }

  type Layouts = Layouts.Root;
  type Profile = Profile.Root;
  type Images = Images.Root;
  type Videos = Videos.Root;
  type Articles = Articles.Root;
  type User = User.Root;
  type Settings = Settings.Root;
  type Countries = Countries.Root;
  type Coordinates = Countries.Root;
}
