import HomeModel from '../models/HomeModel';

class HomeViewModel {
  get isSideNavOpen() {
    return HomeModel.isSideNavOpen;
  }

  get isPreviewOpen() {
    return HomeModel.isPreviewOpen;
  }

  get plantUMLSource() {
    return HomeModel.plantUMLSource;
  }

  get mermaidSource() {
    return HomeModel.mermaidSource;
  }

  toggleSignInModal = () => {
    const state = HomeModel.isSideNavOpen;
    HomeModel.toggleSideNav(!state);
  };

  setIsPreviewOpen = (value: boolean) => {
    HomeModel.setIsPreviewOpen(value);
  };

  setPlantUMLSource = (value: string) => {
    HomeModel.setPlantUMLSource(value);
  };

  setMermaidSource = (value: string) => {
    HomeModel.setMermaidSource(value);
  };
}

export default new HomeViewModel();
