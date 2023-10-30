import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../apis/apiConfig";
import { FieldValues } from "react-hook-form";

const addPost = createAsyncThunk("post/create", async (data: FieldValues) => {
  const response = await instance.post("/api/post", data);
  return response.data;
});
const fetchPost = createAsyncThunk("post/fetch", async () => {
  const response = await instance.get("/api/post");
  return response.data;
});
const fetchByIdPost = createAsyncThunk("post/fetchById", async (id: string) => {
  const response = await instance.get(`/api/post/${id}`);
  return response.data;
});
const updatePost = createAsyncThunk(
  "post/update",
  async (data: FieldValues) => {
    const response = await instance.put(`/api/post/${data.id}`, data);
    return response.data;
  }
);
const deletePost = createAsyncThunk("post/delete", async (id: string) => {
  const response = await instance.delete(`/api/post/${id}`);
  return response.data;
});

export default {
  addPost,
  fetchPost,
  fetchByIdPost,
  updatePost,
  deletePost,
};
