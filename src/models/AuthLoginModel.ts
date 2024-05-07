import { makeObservable, observable, action } from "mobx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase/firebase";

class AuthLoginModel {
  isLoggedIn = false;
  loginError = null;

  constructor() {
    makeObservable(this, {
      isLoggedIn: observable,
      loginError: observable,
      login: action,
      logout: action,
    });
  }

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
    this.isLoggedIn = false;
    this.loginError = null;
  };
}

export default new AuthLoginModel();
