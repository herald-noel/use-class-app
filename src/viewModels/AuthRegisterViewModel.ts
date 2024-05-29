import AuthRegisterModel from "../models/AuthRegisterModel";
import { action } from "mobx";

class AuthRegisterViewModel {
  get isSignUpModalOpen() {
    return AuthRegisterModel.isSignUpModalOpen;
  }

  toggleSignUpModal = () => {
    const state = AuthRegisterModel.isSignUpModalOpen;
    AuthRegisterModel.toggleSignUpModal(!state);
  };

  get firstName() {
    return AuthRegisterModel.firstName;
  }

  setFirstName = (value: string) => {
    AuthRegisterModel.setFirstName(value);
  };

  get lastName() {
    return AuthRegisterModel.lastName;
  }

  setLastName = (value: string) => {
    AuthRegisterModel.setLastName(value);
  };

  get email() {
    return AuthRegisterModel.email;
  }

  setEmail = (value: string) => {
    AuthRegisterModel.setEmail(value);
  };

  get password() {
    return AuthRegisterModel.password;
  }

  setPassword = (value: string) => {
    AuthRegisterModel.setPassword(value);
  };

  get confirmPassword() {
    return AuthRegisterModel.confirmPassword;
  }

  setConfirmPassword = (value: string) => {
    AuthRegisterModel.setConfirmPassword(value);
  };

  get emailError() {
    return AuthRegisterModel.emailError;
  }

  setEmailError = action((value: boolean) => {
    AuthRegisterModel.setEmailError(value);
  });

  get emailErrorMsg() {
    return AuthRegisterModel.emailErrorMsg;
  }

  setEmailErrorMsg = action((value: string) => {
    AuthRegisterModel.setEmailErrorMsg(value);
  });

  get passwordError() {
    return AuthRegisterModel.passwordError;
  }

  setPasswordError = action((value: boolean) => {
    AuthRegisterModel.setPasswordError(value);
  });

  get passwordErrorMsg() {
    return AuthRegisterModel.passwordErrorMsg;
  }

  setPasswordErrorMsg = action((value: string) => {
    AuthRegisterModel.setPasswordErrorMsg(value);
  });

  signUp = async () => {
    return await AuthRegisterModel.signUp();
  };

  validatePassword = () => {
    return AuthRegisterModel.validatePassword();
  };

  handleError = (error) => {
    AuthRegisterModel.handleError(error);
  };
}

export default new AuthRegisterViewModel();
