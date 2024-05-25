import { makeObservable, observable, action } from 'mobx';

class HomeModel {
  isSideNavOpen = false;
  isPreviewOpen = false;
  plantUMLSource = '';

  constructor() {
    makeObservable(this, {
      isSideNavOpen: observable,
      isPreviewOpen: observable,
      plantUMLSource: observable,

      toggleSideNav: action,
      setIsPreviewOpen: action,
      setPlantUMLSource: action,
    });
  }

  toggleSideNav = (value: boolean) => {
    this.isSideNavOpen = value;
  };

  setIsPreviewOpen = (value: boolean) => {
    this.isPreviewOpen = value;
  };

  setPlantUMLSource = (value: string) => {
    this.plantUMLSource = value;
  };
}

export default new HomeModel();
