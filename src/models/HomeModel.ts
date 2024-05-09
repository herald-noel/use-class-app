import { makeObservable, observable, action } from "mobx";

class HomeModel {
  isSideNavOpen = false;

  constructor() {
    makeObservable(this, {
      isSideNavOpen: observable,

      toggleSideNav: action,
    });
  }

  toggleSideNav = (value: boolean) => {
    this.isSideNavOpen = value;
  };
}

export default new HomeModel();
