import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthLoginViewModel from '../../../viewModels/AuthLoginViewModel';
import AuthRegisterViewModel from '../../../viewModels/AuthRegisterViewModel';

const useSignIn = () => {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState(AuthLoginViewModel.emailError);
  const [emailErrorMsg, setEmailErrorMsg] = useState(
    AuthLoginViewModel.emailErrorMsg
  );
  const [passwordError, setPasswordError] = useState(
    AuthLoginViewModel.passwordError
  );
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(
    AuthLoginViewModel.passwordErrorMsg
  );

  useEffect(() => {
    setEmailErrorMsg(AuthLoginViewModel.emailErrorMsg);
    setEmailError(AuthLoginViewModel.emailError);
  }, [AuthLoginViewModel.emailError, AuthLoginViewModel.emailErrorMsg]);

  useEffect(() => {
    setPasswordError(AuthLoginViewModel.passwordError);
    setPasswordErrorMsg(AuthLoginViewModel.passwordErrorMsg);
  }, [AuthLoginViewModel.passwordError, AuthLoginViewModel.passwordErrorMsg]);

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
        AuthLoginViewModel.setEmail('');
        AuthLoginViewModel.setPassword('');
        AuthLoginViewModel.setUser(response.user);
        AuthLoginViewModel.setEmailError(false);
        AuthLoginViewModel.setEmailErrorMsg('');
        AuthLoginViewModel.setPasswordError(false);
        AuthLoginViewModel.setPasswordErrorMsg('');
        navigate('/home');
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
    toggleSignInModal: AuthLoginViewModel.toggleSignInModal,
    toggleSignUpModal: AuthRegisterViewModel.toggleSignUpModal,
    emailError,
    emailErrorMsg,
    passwordError,
    passwordErrorMsg,
  };
};

export default useSignIn;
