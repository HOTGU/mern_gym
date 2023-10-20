import React from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store";

import { postActions } from "../reducers/postSlice";
import PostCreateModal from "../components/modals/PostCreateModal";

const Coummunity = () => {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <PostCreateModal />
      <Button
        label="업로드"
        onAction={() => {
          dispatch(postActions.handleCreateModal(true));
        }}
        small
      />
    </Container>
  );
};

export default Coummunity;
