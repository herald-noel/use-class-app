import { get, onValue, push, ref, set, update } from 'firebase/database';
import { database } from '../firebase';
import AuthLoginViewModel from '../../../viewModels/AuthLoginViewModel';
import dayjs from 'dayjs';

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

export const saveDiagram = async (
  title: string,
  plantUMLCode: string,
  mermaidCode: string
) => {
  try {
    const user = AuthLoginViewModel.user;
    if (user !== null) {
      const userId = user['uid'];

      const userMermaidCodesRef = ref(database, `users/${userId}/mermaidCodes`);

      const newEntryRef = push(userMermaidCodesRef);

      const today = dayjs();
      const dateCreated = today.format('YYYY-MM-DD');

      const value = {
        title: title,
        plantUMLCode: plantUMLCode,
        mermaidCode: mermaidCode,
        dateCreated: dateCreated,
      };

      await update(newEntryRef, value);
    }
  } catch (error) {
    console.error('Error saving mermaide code:', error);
  }
};

export const getUserMermaidCodes = () => {
  const user = AuthLoginViewModel.user;
  try {
    if (user !== null) {
      const userId = user['uid'];

      const userMermaidCodesRef = ref(database, `users/${userId}/mermaidCodes`);

      let results: object[] = [];
      onValue(userMermaidCodesRef, (snapshot) => {
        const data = snapshot.val();
        results = data;
      });

      // console.log(results);
      return results;
    }
  } catch (e) {
    console.log(e);
  }
};
