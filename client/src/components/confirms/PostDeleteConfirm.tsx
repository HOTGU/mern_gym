import React from "react";
import Confirm from "./Confirm";
import { useAppDispatch, useAppSelector } from "../../store";
import { postActions } from "../../reducers/post/postSlice";
import postThunk from "../../reducers/post/postThunk";

const PostDeleteConfirm = () => {
  const postState = useAppSelector((state) => state.postSlice);
  const dispatch = useAppDispatch();

  const onClose = () => dispatch(postActions.deleteConfirmClose({}));
  const onAction = () => {
    if (!postState.post) {
      return;
    }
    dispatch(postThunk.deletePost(postState.post.id));
  };

  return (
    <Confirm
      isOpen={postState.deleteConfirmIsOpen}
      label="글 삭제"
      onAction={onAction}
      onClose={onClose}
      text="정말 글을 삭제하시겠습니까?"
    />
  );
};

export default PostDeleteConfirm;
