import { useNavigate } from "react-router-dom";
import AuthRegisterViewModel from "../../../viewModels/AuthRegisterViewModel";
import AuthLoginViewModel from "../../../viewModels/AuthLoginViewModel";

const useSignUp = () => {
  const navigate = useNavigate();

  const handleLinkSignIn = () => {
    AuthRegisterViewModel.toggleSignUpModal();
    AuthLoginViewModel.toggleSignInModal();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (AuthRegisterViewModel.validatePassword()) return;
    try {
      const response = await AuthRegisterViewModel.signUp();

      if (response) {
        AuthLoginViewModel.setUser(response.user);
        AuthRegisterViewModel.setEmailError(false);
        AuthRegisterViewModel.setEmailErrorMsg("");
        AuthRegisterViewModel.setPasswordError(false);
        AuthRegisterViewModel.setPasswordErrorMsg("");
        AuthRegisterViewModel.toggleSignUpModal();
        navigate("/home");
      }
    } catch (error) {
      AuthRegisterViewModel.handleError(error);
    }
  };

  return {
    firstName: AuthRegisterViewModel.firstName,
    setFirstName: AuthRegisterViewModel.setFirstName,
    lastName: AuthRegisterViewModel.lastName,
    setLastName: AuthRegisterViewModel.setLastName,
    email: AuthRegisterViewModel.email,
    setEmail: AuthRegisterViewModel.setEmail,
    password: AuthRegisterViewModel.password,
    setPassword: AuthRegisterViewModel.setPassword,
    confirmPassword: AuthRegisterViewModel.confirmPassword,
    setConfirmPassword: AuthRegisterViewModel.setConfirmPassword,
    emailError: AuthRegisterViewModel.emailError,
    emailErrorMsg: AuthRegisterViewModel.emailErrorMsg,
    passwordError: AuthRegisterViewModel.passwordError,
    passwordErrorMsg: AuthRegisterViewModel.passwordErrorMsg,
    handleLinkSignIn,
    handleSubmit,
    validatePassword: AuthRegisterViewModel.validatePassword,
  };
};

export default useSignUp;
