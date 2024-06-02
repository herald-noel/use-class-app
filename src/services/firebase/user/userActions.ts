import { get, push, ref, set, update } from 'firebase/database';
import { database } from '../firebase';
import AuthLoginViewModel from '../../../viewModels/AuthLoginViewModel';

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

export const saveDiagram = async (mermaidCode: string) => {
  try {
    const user = AuthLoginViewModel.user;
    if (user !== null) {
      const userId = user['uid'];

      const userMermaidCodesRef = ref(database, `users/${userId}/mermaidCodes`);

      const newEntryRef = push(userMermaidCodesRef);

      const value = { mermaidCode: mermaidCode };

      await update(newEntryRef, value);
    }
  } catch (error) {
    console.error('Error saving mermaide code:', error);
  }
};
