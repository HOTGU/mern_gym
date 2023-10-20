import React from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { postActions } from "../../reducers/postSlice";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Textarea from "../inputs/Textarea";
import { getOptions } from "../../libs/util";
import Select from "../inputs/Select";

const PostCreateModal = () => {
  const isOpen = useAppSelector((state) => state.postSlice.createModalIsOpen);
  const dispatch = useAppDispatch();

  const options = getOptions();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { category: "FREE", title: "", desc: "" },
  });

  const onClose = () => dispatch(postActions.handleCreateModal(false));

  const onValid: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const body = (
    <div className="space-y-5">
      <Select
        options={options.postCategoryOptions}
        name="category"
        control={control}
        errors={errors}
      />
      <Input control={control} errors={errors} name="title" label="제목" />
      <Textarea control={control} errors={errors} name="desc" label="본문" />
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      label="글쓰기"
      actionLabel="제출"
      secondActionLabel="취소"
      secondAction={() => {}}
      onAction={handleSubmit(onValid)}
      body={body}
    />
  );
};

export default PostCreateModal;
