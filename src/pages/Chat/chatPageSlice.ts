import { createSlice } from "@reduxjs/toolkit";

interface OpenState {
  isOpen: Boolean;
}

const initialState: OpenState = {
  isOpen: false,
};

export const chatPageSlice = createSlice({
  name: "chatPage",
  initialState,
  reducers: {
    clickSideNav: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { clickSideNav } = chatPageSlice.actions;

export default chatPageSlice.reducer;
