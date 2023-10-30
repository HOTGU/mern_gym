import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Gallery {
  id: string;
  title: string;
  desc: string;
  images: string[];
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    nickname: string;
    email: string;
  };
}

interface GalleryStateType {
  createModalIsOpen: boolean;
  updateModalIsOpen: boolean;
  deleteConfirmIsOpen: boolean;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  galleries: Gallery[];
  gallery?: Gallery;
  error?: any;
}

const initialState: GalleryStateType = {
  createModalIsOpen: false,
  updateModalIsOpen: false,
  deleteConfirmIsOpen: false,
  galleries: [],
  gallery: undefined,
  status: "",
  error: undefined,
};

const gallerySlice = createSlice({
  name: "gallerySlice",
  initialState,
  reducers: {
    createModalOpen: (state, __) => {
      state.createModalIsOpen = true;
    },
    createModalClose: (state, __) => {
      state.createModalIsOpen = false;
    },
    updateModalOpen: (state, action: PayloadAction<Gallery>) => {
      state.updateModalIsOpen = true;
      state.gallery = action.payload;
    },
    updateModalClose: (state, __) => {
      state.updateModalIsOpen = false;
      state.gallery = undefined;
    },
    deleteConfirmOpen: (state, action: PayloadAction<Gallery>) => {
      state.deleteConfirmIsOpen = true;
      state.gallery = action.payload;
    },
    deleteConfirmClose: (state, __) => {
      state.deleteConfirmIsOpen = false;
      state.gallery = undefined;
    },
  },
  extraReducers: (builder) => {},
});

const {
  createModalOpen,
  createModalClose,
  updateModalOpen,
  updateModalClose,
  deleteConfirmOpen,
  deleteConfirmClose,
} = gallerySlice.actions;

export const galleryActions = {
  createModalOpen,
  createModalClose,
  updateModalOpen,
  updateModalClose,
  deleteConfirmOpen,
  deleteConfirmClose,
};

export default gallerySlice.reducer;
