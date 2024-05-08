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

  logout = () => {
    this.user = null;
  };
}

export default new AuthLoginModel();
