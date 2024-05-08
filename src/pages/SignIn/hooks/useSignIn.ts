import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLoginViewModel from "../../../viewModels/AuthLoginViewModel";

const useSignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const credentials = {
      email: AuthLoginViewModel.email,
      password: AuthLoginViewModel.password,
    };

    try {
      const response = await AuthLoginViewModel.login(credentials);
      AuthLoginViewModel.setUser(response.user);
      AuthLoginViewModel.setEmailError(false);
      AuthLoginViewModel.setEmailErrorMsg("");
      AuthLoginViewModel.setPasswordError(false);
      AuthLoginViewModel.setPasswordErrorMsg("");
      navigate("/home");
    } catch (error) {
      handleError(error);
    }
  };

  function handleError(error) {
    const errorCode = error.message;
    let errorMessage = "An error occurred during login.";
    console.log(errorCode);

    switch (errorCode) {
      case "auth/invalid-credential":
        errorMessage = "Incorrect email or password.";
        AuthLoginViewModel.setEmailError(true);
        AuthLoginViewModel.setPasswordError(true);
        alert(errorMessage);
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password.";
        AuthLoginViewModel.setPasswordError(true);
        AuthLoginViewModel.setPasswordErrorMsg(errorMessage);
        break;
      case "auth/user-not-found":
        errorMessage = "This email is not associated with an account.";
        AuthLoginViewModel.setEmailError(true);
        AuthLoginViewModel.setEmailErrorMsg(errorMessage);
        break;
      case "auth/invalid-email":
        errorMessage = "Please enter a valid email address.";
        AuthLoginViewModel.setEmailError(true);
        AuthLoginViewModel.setEmailErrorMsg(errorMessage);
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many login attempts. Please try again later.";
        alert(errorMessage);
        break;
      case "auth/weak-password":
        errorMessage =
          "Your password is too weak. Please choose a stronger password.";
        AuthLoginViewModel.setPasswordError(true);
        AuthLoginViewModel.setPasswordErrorMsg(errorMessage);
        break;
      default:
        // For unknown errors, log details for debugging
        alert("Unexpected error");
    }
  }

  return {
    handleSubmit,
    isLoading,
    email: AuthLoginViewModel.email,
    setEmail: AuthLoginViewModel.setEmail,
    password: AuthLoginViewModel.password,
    setPassword: AuthLoginViewModel.setPassword,
    emailError: AuthLoginViewModel.emailError,
    emailErrorMsg: AuthLoginViewModel.emailErrorMsg,
    passwordError: AuthLoginViewModel.passwordError,
    passwordErrorMsg: AuthLoginViewModel.passwordErrorMsg,
    isFormValid: AuthLoginViewModel.isFormValid,
  };
};

export default useSignIn;
