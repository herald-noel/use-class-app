import { makeObservable, observable, action } from "mobx";
import axiosInstance from "../../axiosInstance";
import generateUMLFromJSON from "../utils/generateUMLFromJSON";
import { saveDiagram } from "../services/firebase/user/userActions";

class HomeModel {
  isSideNavOpen = false;
  isPreviewOpen = false;
  title = "";
  plantUMLSource = "";
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
  currentPage = 0;

  constructor() {
    makeObservable(this, {
      isSideNavOpen: observable,
      isPreviewOpen: observable,
      title: observable,
      plantUMLSource: observable,
      mermaidSource: observable,
      isLoading: observable,
      currentPage: observable,

      toggleSideNav: action,
      setIsPreviewOpen: action,
      setTitle: action,
      setPlantUMLSource: action,
      setMermaidSource: action,
      setIsLoading: action,
      covertToMermaidCD: action,
      saveMermaidCode: action,
      setCurrentPage: action,
    });
  }

  toggleSideNav = (value: boolean) => {
    this.isSideNavOpen = value;
  };

  setIsPreviewOpen = (value: boolean) => {
    this.isPreviewOpen = value;
  };

  setTitle = (value: string) => {
    this.title = value;
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

  setCurrentPage = (value: number) => {
    this.currentPage = value;
  };

  covertToMermaidCD = async () => {
    this.setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/v1/chat/convert",
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

  saveMermaidCode = () => {
    saveDiagram(this.title, this.plantUMLSource, this.mermaidSource);
    alert("Successfully saved.");
  };
}

export default new HomeModel();
