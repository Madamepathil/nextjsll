import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { isOpen: false },
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
    },
    closeModal(State, action) {
      State.isOpen = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
