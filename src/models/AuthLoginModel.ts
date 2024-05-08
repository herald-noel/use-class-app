import { makeObservable, observable, action } from "mobx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase/firebase";

class AuthLoginModel {
  user = null;
  isSignInModalOpen = false;
  email = "";
  emailError = false;
  emailErrorMsg = "";
  password = "";
  passwordError = false;
  passwordErrorMsg = "";

  constructor() {
    makeObservable(this, {
      // Modal
      user: observable,
      isSignInModalOpen: observable,
      // String
      email: observable,
      emailError: observable,
      emailErrorMsg: observable,
      password: observable,
      passwordError: observable,
      passwordErrorMsg: observable,
      // Function
      login: action,
      logout: action,
      toggleSignInModal: action,

      setEmail: action,
      setEmailError: action,
      setEmailErrorMsg: action,
      setPassword: action,
      setPasswordError: action,
      setPasswordErrorMsg: action,
    });
  }

  toggleSignInModal = (value: boolean) => {
    this.isSignInModalOpen = value;
  };

  login = async (credentials) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      return response;
    } catch (error) {
      throw new Error(error.code);
    }
  };

  logout = async () => {
    try {
      await auth.signOut();
      this.user = null;
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  setEmail = (value: string) => {
    this.email = value;
  };

  setEmailError = (value: boolean) => {
    this.emailError = value;
  };

  setEmailErrorMsg = (value: string) => {
    this.emailErrorMsg = value;
  };

  setPassword = (value: string) => {
    this.password = value;
  };

  setPasswordError = (value: boolean) => {
    this.passwordError = value;
  };

  setPasswordErrorMsg = (value: string) => {
    this.passwordErrorMsg = value;
  };

  handleError = (error) => {
    const errorCode = error.message;
    let errorMessage = "An error occurred during login.";
    console.log(errorCode);

    switch (errorCode) {
      case "auth/invalid-credential":
        errorMessage = "Incorrect email or password.";
        this.setEmailError(true);
        this.setPasswordError(true);
        alert(errorMessage);
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password.";
        this.setPasswordError(true);
        this.setPasswordErrorMsg(errorMessage);
        break;
      case "auth/user-not-found":
        errorMessage = "This email is not associated with an account.";
        this.setEmailError(true);
        this.setEmailErrorMsg(errorMessage);
        break;
      case "auth/invalid-email":
        errorMessage = "Please enter a valid email address.";
        this.setEmailError(true);
        this.setEmailErrorMsg(errorMessage);
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many login attempts. Please try again later.";
        alert(errorMessage);
        break;
      case "auth/weak-password":
        errorMessage =
          "Your password is too weak. Please choose a stronger password.";
        this.setPasswordError(true);
        this.setPasswordErrorMsg(errorMessage);
        break;
      default:
        // For unknown errors, log details for debugging
        alert("Unexpected error");
    }
  };
}

export default new AuthLoginModel();
