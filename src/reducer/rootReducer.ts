import { combineReducers } from '@reduxjs/toolkit';
import signInFormDialogSlice from '../pages/SignIn/signInFormDialogSlice';
import signUpFromDialogSlice from '../pages/SignUp/signUpFromDialogSlice';
import userSlice from './user/userSlice';
import homePageSlice from '../pages/Home/homePageSlice';

export const rootReducer = combineReducers({
  signInFormDialog: signInFormDialogSlice,
  signUpFormDialog: signUpFromDialogSlice,
  user: userSlice,
  homePage: homePageSlice,
});
