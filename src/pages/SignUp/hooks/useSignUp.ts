import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openSignUp } from '../signUpFromDialogSlice';
import { openSignIn } from '../../SignIn/signInFormDialogSlice';
import { doCreateUserWithEmailAndPassword } from '../../../services/firebase/auth/auth';
import { loginSuccess } from '../../../reducer/user/userSlice';

const useSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleLinkSignIn = () => {
    dispatch(openSignUp());
    dispatch(openSignIn());
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      setPasswordErrorMsg('Password does not match.');
      return true;
    } else if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMsg('Password must be atleast 6 characters.');
      return true;
    }
    setPasswordError(false);
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validatePassword()) return;
    const signUpData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    };
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(signUpData);

      dispatch(loginSuccess(userCredential.user));

      setEmailError(false);
      setEmailErrorMsg('');
      setPasswordError(false);
      setPasswordErrorMsg('');

      dispatch(openSignUp());

      navigate('/home');
    } catch (error) {
      handleError(error);
    }
  };

  function handleError(error) {
    const errorCode = error.message;
    let errorMessage = 'An error occurred during signup.';

    switch (errorCode) {
      case 'auth/weak-password':
        errorMessage =
          'Your password is too weak. Please choose a stronger password.';
        setPasswordError(true);
        setPasswordErrorMsg(errorMessage);
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'This email address is already in use.';
        setEmailError(true);
        setEmailErrorMsg(errorMessage);
        break;
      case 'auth/invalid-email':
        errorMessage = 'Please enter a valid email address.';
        setEmailError(true);
        setEmailErrorMsg(errorMessage);
        break;
      default:
        alert('Unexpected error:');
    }
  }

  return {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    emailError,
    emailErrorMsg,
    passwordError,
    passwordErrorMsg,
    handleLinkSignIn,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
};

export default useSignUp;
