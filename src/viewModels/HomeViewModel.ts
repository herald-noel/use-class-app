import HomeModel from '../models/HomeModel';

class HomeViewModel {
  get isSideNavOpen() {
    return HomeModel.isSideNavOpen;
  }

  get isPreviewOpen() {
    return HomeModel.isPreviewOpen;
  }

  toggleSignInModal = () => {
    const state = HomeModel.isSideNavOpen;
    HomeModel.toggleSideNav(!state);
  };

  setIsPreviewOpen = (value: boolean) => {
    HomeModel.setIsPreviewOpen(value);
  };
}

export default new HomeViewModel();
