import { makeObservable, observable, action } from 'mobx';

class HomeModel {
  isSideNavOpen = false;
  isPreviewOpen = false;

  constructor() {
    makeObservable(this, {
      isSideNavOpen: observable,
      isPreviewOpen: observable,

      toggleSideNav: action,
      setIsPreviewOpen: action,
    });
  }

  toggleSideNav = (value: boolean) => {
    this.isSideNavOpen = value;
  };

  setIsPreviewOpen = (value: boolean) => {
    this.isPreviewOpen = value;
  };
}

export default new HomeModel();
