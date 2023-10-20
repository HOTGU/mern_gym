import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PostType {
  createModalIsOpen: boolean;
}

const initialState: PostType = {
  createModalIsOpen: false,
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    handleCreateModal: (state, action: PayloadAction<boolean>) => {
      state.createModalIsOpen = action.payload;
    },
  },
});

const { handleCreateModal } = postSlice.actions;

export const postActions = {
  handleCreateModal,
};

export default postSlice.reducer;
