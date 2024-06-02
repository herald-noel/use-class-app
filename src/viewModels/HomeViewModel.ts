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

  get isLoading() {
    return HomeModel.isLoading;
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

  covertToMermaidCD = async () => {
    await HomeModel.covertToMermaidCD();
  };
}

export default new HomeViewModel();
