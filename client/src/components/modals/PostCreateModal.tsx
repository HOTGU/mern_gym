import React, { useEffect, useMemo } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { postActions } from "../../reducers/post/postSlice";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Textarea from "../inputs/Textarea";
import { getOptions } from "../../libs/util";
import Select from "../inputs/Select";
import { Id, toast } from "react-toastify";
import postThunk from "../../reducers/post/postThunk";

const PostCreateModal = () => {
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
  });

  useEffect(() => {
    if (toastRef.current) {
      if (postState.status === "SUCCESS") {
        toast.update(toastRef.current, {
          type: "success",
          render: "생성 성공",
          isLoading: false,
          autoClose: 2000,
        });
      }
      if (postState.status === "ERROR") {
        toast.update(toastRef.current, {
          type: "error",
          render: "생성 실패",
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

  const onClose = () => {
    if (isLoading) {
      return;
    }
    dispatch(postActions.createModalClose({}));
  };

  const onValid: SubmitHandler<FieldValues> = (data) => {
    toastRef.current = toast.loading("생성중");
    dispatch(postThunk.addPost(data));
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
      isOpen={postState.createModalIsOpen}
      onClose={onClose}
      label="글쓰기"
      actionLabel="제출"
      secondActionLabel="취소"
      secondAction={onClose}
      onAction={handleSubmit(onValid)}
      body={body}
      disabled={isLoading}
    />
  );
};

export default PostCreateModal;
