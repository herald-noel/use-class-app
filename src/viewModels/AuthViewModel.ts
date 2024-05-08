import AuthModel from "../models/AuthModel";

class AuthViewModel {
  get isLoggedIn() {
    return AuthModel.isLoggedIn;
  }

  get loginError() {
    return AuthModel.loginError;
  }

  get isSignInModalOpen() {
    return AuthModel.isSignInModalOpen;
  }

  get isSignUpModalOpen() {
    return AuthModel.isSignUpModalOpen;
  }

  toggleSignInModal = () => {
    const state = AuthModel.isSignInModalOpen;
    AuthModel.toggleSignInModal(!state);
  };

  toggleSignUpModal = () => {
    const state = AuthModel.isSignUpModalOpen;
    AuthModel.toggleSignUpModal(!state);
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
