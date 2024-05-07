import AuthModel from "../models/AuthLoginModel";

class AuthViewModel {
  get isLoggedIn() {
    return AuthModel.isLoggedIn;
  }

  get loginError() {
    return AuthModel.loginError;
  }

  login = async (credentials) => {
    return await AuthModel.login(credentials);
  };

  logout = async () => {
    // TODO
    AuthModel.logout();
  };
}

export default new AuthViewModel();
