import AuthRegisterModel from "../models/AuthRegisterModel";

class AuthRegisterViewModel {
  get isSignUpModalOpen() {
    return AuthRegisterModel.isSignUpModalOpen;
  }

  toggleSignUpModal = () => {
    const state = AuthRegisterModel.isSignUpModalOpen;
    AuthRegisterModel.toggleSignUpModal(!state);
  };
}

export default new AuthRegisterViewModel();
