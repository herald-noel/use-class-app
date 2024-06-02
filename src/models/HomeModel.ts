import { makeObservable, observable, action } from 'mobx';
import axiosInstance from '../../axiosInstance';
import generateUMLFromJSON from '../utils/generateUMLFromJSON';

class HomeModel {
  isSideNavOpen = false;
  isPreviewOpen = false;
  plantUMLSource = '';
  mermaidSource = `classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck {
    +String beakColor
    +swim()
    +quack()
  }
  class Fish {
    -int sizeInFeet
    -canEat()
  }
  class Zebra {
    +bool isCool
    +run()
  }
`;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      isSideNavOpen: observable,
      isPreviewOpen: observable,
      plantUMLSource: observable,
      mermaidSource: observable,
      isLoading: observable,

      toggleSideNav: action,
      setIsPreviewOpen: action,
      setPlantUMLSource: action,
      setMermaidSource: action,
      setIsLoading: action,
      covertToMermaidCD: action,
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

  setMermaidSource = (value: string) => {
    this.mermaidSource = value;
  };

  setIsLoading = (value: boolean) => {
    this.isLoading = value;
  };

  covertToMermaidCD = async () => {
    this.setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        '/api/v1/chat/convert',
        this.plantUMLSource
      );
      const mermaidSourceCode = generateUMLFromJSON(response.data);
      this.setMermaidSource(mermaidSourceCode);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default new HomeModel();
