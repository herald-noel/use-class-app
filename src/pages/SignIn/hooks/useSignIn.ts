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
      if (response) {
        AuthLoginViewModel.setUser(response.user);
        AuthLoginViewModel.setEmailError(false);
        AuthLoginViewModel.setEmailErrorMsg("");
        AuthLoginViewModel.setPasswordError(false);
        AuthLoginViewModel.setPasswordErrorMsg("");
        navigate("/home");
      }
    } catch (error) {
      AuthLoginViewModel.handleError(error);
    }
  };

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
  };
};

export default useSignIn;
