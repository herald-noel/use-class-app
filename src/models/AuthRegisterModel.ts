import { createUserWithEmailAndPassword } from "firebase/auth";
import { makeObservable, observable, action } from "mobx";
import { auth } from "../services/firebase/firebase";
import { addUserInfo } from "../services/firebase/user/userActions";

class AuthRegisterModel {
  isSignUpModalOpen = false;

  firstName = "";
  lastName = "";
  email = "";
  password = "";
  confirmPassword = "";
  emailError = false;
  emailErrorMsg = "";
  passwordError = false;
  passwordErrorMsg = "";

  constructor() {
    makeObservable(this, {
      isSignUpModalOpen: observable,
      toggleSignUpModal: action,

      firstName: observable,
      lastName: observable,
      email: observable,
      password: observable,
      confirmPassword: observable,
      emailError: observable,
      emailErrorMsg: observable,
      passwordError: observable,
      passwordErrorMsg: observable,
      setFirstName: action,
      setLastName: action,
      setEmail: action,
      setPassword: action,
      setConfirmPassword: action,
      signUp: action,
      validatePassword: action,
    });
  }

  toggleSignUpModal = (value: boolean) => {
    this.isSignUpModalOpen = value;
  };

  signUp = async () => {
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

  setFirstName = (value) => {
    this.firstName = value;
  };

  setLastName = (value) => {
    this.lastName = value;
  };

  setEmail = (value) => {
    this.email = value;
  };

  setPassword = (value) => {
    this.password = value;
  };

  setConfirmPassword = (value) => {
    this.confirmPassword = value;
  };

  validatePassword = () => {
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

  setPasswordError = (value) => {
    this.passwordError = value;
  };

  setPasswordErrorMsg = (value) => {
    this.passwordErrorMsg = value;
  };

  setEmailError = (value) => {
    this.emailError = value;
  };

  setEmailErrorMsg = (value) => {
    this.emailErrorMsg = value;
  };

  handleError = (error) => {
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
        alert("Unexpected error:");
    }
  };
}

export default new AuthRegisterModel();
