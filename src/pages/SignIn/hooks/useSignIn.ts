import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { openSignIn } from '../signInFormDialogSlice';
import { doSignInWithEmailAndPassword } from '../../../services/firebase/auth/auth';
import { loginSuccess } from '../../../reducer/user/userSlice';

const useSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await doSignInWithEmailAndPassword(
        email,
        password
      );
      dispatch(loginSuccess(userCredential.user));

      setEmailError(false);
      setEmailErrorMsg('');
      setPasswordError(false);
      setPasswordErrorMsg('');

      dispatch(openSignIn());

      navigate('/home');
    } catch (error) {
      handleError(error);
    }
  };

  function handleError(error) {
    const errorCode = error.message;
    let errorMessage = 'An error occurred during login.';
    console.log(errorCode);

    switch (errorCode) {
      case 'auth/invalid-credential':
        errorMessage = 'Incorrect email or password.';
        setEmailError(true);
        setPasswordError(true);
        alert(errorMessage);
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password.';
        setPasswordError(true);
        setPasswordErrorMsg(errorMessage);
        break;
      case 'auth/user-not-found':
        errorMessage = 'This email is not associated with an account.';
        setEmailError(true);
        setEmailErrorMsg(errorMessage);
        break;
      case 'auth/invalid-email':
        errorMessage = 'Please enter a valid email address.';
        setEmailError(true);
        setEmailErrorMsg(errorMessage);
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many login attempts. Please try again later.';
        alert(errorMessage);
        break;
      case 'auth/weak-password':
        errorMessage =
          'Your password is too weak. Please choose a stronger password.';
        setPasswordError(true);
        setPasswordErrorMsg(errorMessage);
        break;
      default:
        // For unknown errors, log details for debugging
        alert('Unexpected error');
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    emailErrorMsg,
    passwordError,
    passwordErrorMsg,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};

export default useSignIn;
