import { makeObservable, observable, action } from "mobx";

class AuthRegisterModel {
  isSignUpModalOpen = false;

  constructor() {
    makeObservable(this, {
      isSignUpModalOpen: observable,
      toggleSignUpModal: action,
    });
  }

  toggleSignUpModal = (value: boolean) => {
    this.isSignUpModalOpen = value;
  };
}

export default new AuthRegisterModel();
