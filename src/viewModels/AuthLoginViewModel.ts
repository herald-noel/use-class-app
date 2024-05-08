import AuthLoginModel from "../models/AuthLoginModel";
import { action, computed } from "mobx";

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

  setEmail = action((value) => {
    AuthLoginModel.email = value;
  });

  get emailError() {
    return AuthLoginModel.emailError;
  }

  setEmailError = action((value: boolean) => {
    AuthLoginModel.emailError = value;
  });

  get emailErrorMsg() {
    return AuthLoginModel.emailErrorMsg;
  }

  setEmailErrorMsg = action((value: string) => {
    AuthLoginModel.emailErrorMsg = value;
  });

  get password() {
    return AuthLoginModel.password;
  }

  setPassword = action((value: string) => {
    AuthLoginModel.password = value;
  });

  get passwordError() {
    return AuthLoginModel.passwordError;
  }

  setPasswordError = action((value: boolean) => {
    AuthLoginModel.passwordError = value;
  });

  get passwordErrorMsg() {
    return AuthLoginModel.passwordErrorMsg;
  }

  setPasswordErrorMsg = action((value: string) => {
    AuthLoginModel.passwordErrorMsg = value;
  });

  toggleSignInModal = () => {
    const state = AuthLoginModel.isSignInModalOpen;
    AuthLoginModel.toggleSignInModal(!state);
  };

  login = async (credentials) => {
    return await AuthLoginModel.login(credentials);
  };

  logout = async () => {
    // TODO
    AuthLoginModel.logout();
  };

  get isFormValid() {
    return (
      !this.emailError &&
      !this.passwordError &&
      this.email.trim() !== "" &&
      this.password.trim() !== ""
    );
  }
}

export default new AuthLoginViewModel();
