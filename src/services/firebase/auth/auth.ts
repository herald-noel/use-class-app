import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';
import { addUserInfo } from '../user/userActions';

export interface SignUpData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export const doCreateUserWithEmailAndPassword = async (
  signUpData: SignUpData
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      signUpData.email,
      signUpData.password
    );
    const userId = userCredential.user.uid;
    await addUserInfo(signUpData, userId);
    return userCredential;
  } catch (error) {
    return error;
  }
};

export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};
