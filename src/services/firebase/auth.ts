import { createUserWithEmailAndPassword, signInWithEmailAndPassword,sendEmailVerification, sendPasswordResetEmail, updatePassword } from 'firebase/auth'
import { auth } from './firebase'

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
}

/*
export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email)
}

export const doPasswordChange = (password: string) => {
  if (auth.currentUser) {
  return updatePassword(auth.currentUser, password)
  }
  return null
}

export const doSendEmailVerification = () => {
  if (auth.currentUser) {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`
  })
  }
  return null
}
*/