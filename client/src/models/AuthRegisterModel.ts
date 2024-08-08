import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { makeObservable, observable, action } from "mobx";
import { auth } from "../services/firebase/firebase";
import { addUserInfo } from "../services/firebase/user/userActions";

class AuthRegisterModel {
  firstName = "";
  lastName = "";
  email = "";
  emailError = false;
  emailErrorMsg = "";
  password = "";
  confirmPassword = "";
  passwordError = false;
  passwordErrorMsg = "";

  constructor() {
    makeObservable(this, {
      // Observable
      firstName: observable,
      lastName: observable,
      email: observable,
      password: observable,
      confirmPassword: observable,
      emailError: observable,
      emailErrorMsg: observable,
      passwordError: observable,
      passwordErrorMsg: observable,

      // Actions
      setFirstName: action,
      setLastName: action,
      setEmail: action,
      setEmailError: action,
      setEmailErrorMsg: action,
      setPassword: action,
      setConfirmPassword: action,
      setPasswordError: action,
      setPasswordErrorMsg: action,
      signUp: action,
      validatePassword: action,
      handleError: action,
    });
  }

  signUp = async (): Promise<UserCredential> => {
    if (this.validatePassword()) return;

    const signUpData = {
      firstname: this.firstName,
      lastname: this.lastName,
      email: this.email,
      password: this.password,
    };

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      );
      const userId = userCredential.user.uid;
      await addUserInfo(signUpData, userId);
      return userCredential;
    } catch (error) {
      throw new Error(error.code);
    }
  };

  setFirstName = (value: string): void => {
    this.firstName = value;
  };

  setLastName = (value: string): void => {
    this.lastName = value;
  };

  setEmail = (value: string): void => {
    this.email = value;
  };

  setPassword = (value: string): void => {
    this.password = value;
  };

  setConfirmPassword = (value: string): void => {
    this.confirmPassword = value;
  };

  validatePassword = (): boolean => {
    if (this.password !== this.confirmPassword) {
      this.setPasswordError(true);
      this.setPasswordErrorMsg("Password does not match.");
      return true;
    } else if (this.password.length < 6) {
      this.setPasswordError(true);
      this.setPasswordErrorMsg("Password must be at least 6 characters.");
      return true;
    }
    this.setPasswordError(false);
    return false;
  };

  setPasswordError = (value: boolean): void => {
    this.passwordError = value;
  };

  setPasswordErrorMsg = (value: string): void => {
    this.passwordErrorMsg = value;
  };

  setEmailError = (value: boolean): void => {
    this.emailError = value;
  };

  setEmailErrorMsg = (value: string): void => {
    this.emailErrorMsg = value;
  };

  handleError = (error: any): void => {
    const errorCode = error.message;
    let errorMessage = "An error occurred during signup.";

    switch (errorCode) {
      case "auth/weak-password":
        errorMessage =
          "Your password is too weak. Please choose a stronger password.";
        this.setPasswordError(true);
        this.setPasswordErrorMsg(errorMessage);
        break;
      case "auth/email-already-in-use":
        errorMessage = "This email address is already in use.";
        this.setEmailError(true);
        this.setEmailErrorMsg(errorMessage);
        break;
      case "auth/invalid-email":
        errorMessage = "Please enter a valid email address.";
        this.setEmailError(true);
        this.setEmailErrorMsg(errorMessage);
        break;
      default:
        errorMessage = "Unexpected error:"
        this.setPasswordError(true);
        this.setPasswordErrorMsg(errorMessage);
    }
  };
}

export default new AuthRegisterModel();
