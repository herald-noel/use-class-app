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
  console.log(signUpData.email, signUpData.password);
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
    throw new Error(error.code);
  }
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    throw new Error(error.code);
  }
};

export const doSignOut = () => {
  return auth.signOut();
};
