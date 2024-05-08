import AuthModel from "../models/AuthLoginModel";

class AuthLoginViewModel {
  get isLoggedIn() {
    return AuthModel.isLoggedIn;
  }

  get loginError() {
    return AuthModel.loginError;
  }

  get isSignInModalOpen() {
    return AuthModel.isSignInModalOpen;
  }

  toggleSignInModal = () => {
    const state = AuthModel.isSignInModalOpen;
    AuthModel.toggleSignInModal(!state);
  };

  login = async (credentials) => {
    return await AuthModel.login(credentials);
  };

  logout = async () => {
    // TODO
    AuthModel.logout();
  };
}

export default new AuthLoginViewModel();
