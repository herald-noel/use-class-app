import AuthModel from "../models/AuthLoginModel";

class AuthViewModel {
  get isLoggedIn() {
    return AuthModel.isLoggedIn;
  }

  get loginError() {
    return AuthModel.loginError;
  }

  get isModalOpen() {
    return AuthModel.isModalOpen;
  }

  toggleModal = () => {
    const state = AuthModel.isModalOpen;
    AuthModel.toggleModal(!state);
  };

  login = async (credentials) => {
    return await AuthModel.login(credentials);
  };

  logout = async () => {
    // TODO
    AuthModel.logout();
  };
}

export default new AuthViewModel();
