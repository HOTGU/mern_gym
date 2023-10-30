import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Post, postActions } from "../reducers/post/postSlice";
import { useAppDispatch, useAppSelector } from "../store";
import PostUpdateModal from "../components/modals/PostUpdateModal";
import postThunk from "../reducers/post/postThunk";
import PostDeleteConfirm from "../components/confirms/PostDeleteConfirm";

interface ParamsType {
  id: string;
}

const CommunityDetail = () => {
  const [data, setData] = useState<Post>();
  const location = useLocation();
  const params = useParams() as { id: string };
  const postState = useAppSelector((state) => state.postSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.state) {
      if (location.state.post) {
        setData(location.state.post);
      }
    } else {
      dispatch(postThunk.fetchByIdPost(params.id));
    }
  }, []);

  useEffect(() => {
    if (postState.post && postState.status === "SUCCESS") {
      setData(postState.post);
    }
  }, [postState.post]);

  if (!data) return <></>;

  return (
    <div>
      {data?.title}
      {data?.desc}
      <div
        onClick={() => {
          dispatch(postActions.updateModalOpen(data));
        }}
      >
        수정
      </div>
      <div
        onClick={() => {
          dispatch(postActions.deleteConfirmOpen(data));
        }}
      >
        삭제
      </div>
      <PostUpdateModal />
      <PostDeleteConfirm />
    </div>
  );
};

export default CommunityDetail;
