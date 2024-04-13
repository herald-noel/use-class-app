import { createSlice } from '@reduxjs/toolkit';

interface OpenState {
  isOpen: Boolean;
}

const initialState: OpenState = {
  isOpen: false,
};

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    clickSideNav: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { clickSideNav } = homePageSlice.actions;

export default homePageSlice.reducer;
