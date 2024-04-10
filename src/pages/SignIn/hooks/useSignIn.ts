import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { openSignIn } from '../signInFormDialogSlice';
import { doSignInWithEmailAndPassword } from '../../../services/firebase/auth';
import { loginSuccess } from '../../../reducer/user/userSlice';

const useSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await doSignInWithEmailAndPassword(email, password);
      dispatch(loginSuccess(userCredential.user)) 

      setEmailError(false);
      setEmailErrorMsg('');
      dispatch(openSignIn());
      navigate('/home');
    } catch (error) {
      setEmailErrorMsg('Error logging in. Please try again.');
      setEmailError(true);
      setPasswordError(true);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    emailErrorMsg,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};

export default useSignIn;
