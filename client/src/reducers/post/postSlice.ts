import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import postThunk from "./postThunk";

export interface Post {
  id: string;
  title: string;
  desc: string;
  category: string;
  commentsLength: number;
  likesLength: number;
  author: {
    id: string;
    nickname: string;
    email: string;
  };
}

interface PostStateType {
  createModalIsOpen: boolean;
  updateModalIsOpen: boolean;
  deleteConfirmIsOpen: boolean;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  posts: Post[];
  post?: Post;
  error?: any;
}

const initialState: PostStateType = {
  createModalIsOpen: false,
  updateModalIsOpen: false,
  deleteConfirmIsOpen: false,
  posts: [],
  post: undefined,
  status: "",
  error: undefined,
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    createModalOpen: (state, __) => {
      state.createModalIsOpen = true;
    },
    createModalClose: (state, __) => {
      state.createModalIsOpen = false;
    },
    updateModalOpen: (state, action: PayloadAction<Post>) => {
      state.updateModalIsOpen = true;
      state.post = action.payload;
    },
    updateModalClose: (state, __) => {
      state.updateModalIsOpen = false;
      state.post = undefined;
    },
    deleteConfirmOpen: (state, action: PayloadAction<Post>) => {
      state.deleteConfirmIsOpen = true;
      state.post = action.payload;
    },
    deleteConfirmClose: (state, __) => {
      state.deleteConfirmIsOpen = false;
      state.post = undefined;
    },
  },
  extraReducers: (builder) => {
    // 포스트 생성하는 thunk
    builder.addCase(postThunk.addPost.pending, (state, action) => {
      state.status = "LOADING";
      state.createModalIsOpen = true;
    });
    builder.addCase(postThunk.addPost.fulfilled, (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.createModalIsOpen = false;
      state.status = "SUCCESS";
    });
    builder.addCase(postThunk.addPost.rejected, (state, action) => {
      state.error = action.error;
      state.status = "ERROR";
    });

    // 포스트 가져오는 thunk
    builder.addCase(postThunk.fetchPost.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(postThunk.fetchPost.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.posts = action.payload;
    });
    builder.addCase(postThunk.fetchPost.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });

    // 포스트 업데이트 thunk
    builder.addCase(postThunk.updatePost.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(postThunk.updatePost.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.updateModalIsOpen = false;
      state.post = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          post = action.payload;
        }
        return post;
      });
    });
    builder.addCase(postThunk.updatePost.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });

    // 포스트 fetch by id thunk
    builder.addCase(postThunk.fetchByIdPost.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(postThunk.fetchByIdPost.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.post = action.payload;
    });
    builder.addCase(postThunk.fetchByIdPost.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });

    // 포스트 fetch by id thunk
    builder.addCase(postThunk.deletePost.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(postThunk.deletePost.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    });
    builder.addCase(postThunk.deletePost.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });
  },
});

const {
  createModalOpen,
  createModalClose,
  updateModalOpen,
  updateModalClose,
  deleteConfirmOpen,
  deleteConfirmClose,
} = postSlice.actions;

export const postActions = {
  createModalOpen,
  createModalClose,
  updateModalOpen,
  updateModalClose,
  deleteConfirmOpen,
  deleteConfirmClose,
};

export default postSlice.reducer;
