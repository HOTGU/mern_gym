import React, { useEffect } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store";

import { postActions } from "../reducers/post/postSlice";
import PostCreateModal from "../components/modals/PostCreateModal";
import { Link } from "react-router-dom";
import postThunk from "../reducers/post/postThunk";

const Coummunity = () => {
  const dispatch = useAppDispatch();
  const postState = useAppSelector((state) => state.postSlice);

  useEffect(() => {
    dispatch(postThunk.fetchPost());
  }, []);

  return (
    <Container>
      <PostCreateModal />
      <Button
        label="업로드"
        onAction={() => {
          dispatch(postActions.createModalOpen({}));
        }}
        small
      />
      {postState.posts.length > 0 &&
        postState.posts.map((post) => (
          <Link to={`/community/${post.id}`} state={{ post }} key={post.id}>
            <div key={post.id}>
              <div>{post.title}</div>
              <div>글쓴이{post.author.nickname}</div>
            </div>
          </Link>
        ))}
    </Container>
  );
};

export default Coummunity;
