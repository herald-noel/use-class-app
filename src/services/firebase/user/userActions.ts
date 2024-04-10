import { ref, set } from 'firebase/database';
import { database } from '../firebase';

interface UserCredential {
  firstname: string;
  lastname: string;
  email: string;
}

export const addUserInfo = async (
  userCredential: UserCredential,
  userId: string
) => {
  try {
    const userRef = ref(database, `users/${userId}`);
    set(userRef, {
      firstname: userCredential.firstname,
      lastname: userCredential.lastname,
      email: userCredential.email,
    });
    console.log('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};
