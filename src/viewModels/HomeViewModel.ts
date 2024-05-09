import HomeModel from "../models/HomeModel";

class HomeViewModel {
  get isSideNavOpen() {
    return HomeModel.isSideNavOpen;
  }

  toggleSignInModal = () => {
    const state = HomeModel.isSideNavOpen;
    HomeModel.toggleSideNav(!state);
  };
}

export default new HomeViewModel();
