import AuthLoginModel from "../models/AuthLoginModel";
import { action } from "mobx";

class AuthLoginViewModel {
  get user() {
    return AuthLoginModel.user;
  }

  setUser = action((value) => {
    AuthLoginModel.user = value;
  });

  get isSignInModalOpen() {
    return AuthLoginModel.isSignInModalOpen;
  }

  get email() {
    return AuthLoginModel.email;
  }

  setEmail = (value: string) => {
    AuthLoginModel.setEmail(value);
  };

  get emailError() {
    return AuthLoginModel.emailError;
  }

  setEmailError = (value: boolean) => {
    AuthLoginModel.setEmailError(value);
  };

  get emailErrorMsg() {
    return AuthLoginModel.emailErrorMsg;
  }

  setEmailErrorMsg = (value: string) => {
    AuthLoginModel.setEmailErrorMsg(value);
  };

  get password() {
    return AuthLoginModel.password;
  }

  setPassword = (value: string) => {
    AuthLoginModel.setPassword(value);
  };

  get passwordError() {
    return AuthLoginModel.passwordError;
  }

  setPasswordError = (value: boolean) => {
    AuthLoginModel.setPasswordError(value);
  };

  get passwordErrorMsg() {
    return AuthLoginModel.passwordErrorMsg;
  }

  setPasswordErrorMsg = (value: string) => {
    AuthLoginModel.setPasswordErrorMsg(value);
  };

  toggleSignInModal = () => {
    const state = AuthLoginModel.isSignInModalOpen;
    AuthLoginModel.toggleSignInModal(!state);
  };

  login = async (credentials) => {
    return await AuthLoginModel.login(credentials);
  };

  logout = async () => {
    await AuthLoginModel.logout();
  };

  handleError = (error) => {
    AuthLoginModel.handleError(error);
  };
}

export default new AuthLoginViewModel();
