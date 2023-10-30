import React, { useEffect, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { postActions } from "../../reducers/post/postSlice";
import Input from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import { getOptions } from "../../libs/util";
import Select from "../inputs/Select";
import { Id, toast } from "react-toastify";
import postThunk from "../../reducers/post/postThunk";

const PostUpdateModal = () => {
  const postState = useAppSelector((state) => state.postSlice);
  const dispatch = useAppDispatch();
  const toastRef = React.useRef<Id>();

  const options = getOptions();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { category: "FREE", title: "", desc: "" },
    values: useMemo(() => {
      return {
        ...postState.post,
      };
    }, [postState.post]),
  });

  useEffect(() => {
    if (toastRef.current) {
      if (postState.status === "SUCCESS") {
        toast.update(toastRef.current, {
          type: "success",
          render: "수정 성공",
          isLoading: false,
          autoClose: 2000,
        });
      }
      if (postState.status === "ERROR") {
        toast.update(toastRef.current, {
          type: "error",
          render: "수정 실패",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  }, [postState.status]);

  const isLoading = useMemo(
    () => postState.status === "LOADING",
    [postState.status]
  );

  const onClose = () => dispatch(postActions.updateModalClose({}));

  const onValid: SubmitHandler<FieldValues> = (data) => {
    toastRef.current = toast.loading("수정중");
    dispatch(postThunk.updatePost(data));
  };

  const body = (
    <div className="space-y-5">
      <Select
        options={options.postCategoryOptions}
        name="category"
        control={control}
        errors={errors}
        disabled={isLoading}
      />
      <Input
        control={control}
        errors={errors}
        name="title"
        label="제목"
        disabled={isLoading}
      />
      <Textarea
        control={control}
        errors={errors}
        name="desc"
        label="본문"
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      isOpen={postState.updateModalIsOpen}
      onClose={onClose}
      label="글수정"
      actionLabel="수정"
      secondActionLabel="취소"
      secondAction={() => {}}
      onAction={handleSubmit(onValid)}
      body={body}
      disabled={isLoading}
    />
  );
};

export default PostUpdateModal;
