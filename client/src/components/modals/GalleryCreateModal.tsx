import React, { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import postThunk from "../../reducers/post/postThunk";
import { Id, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store";
import { galleryActions } from "../../reducers/gallery/gallerySlice";
import File from "../inputs/File";

const GalleryCreateModal = () => {
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const dispatch = useAppDispatch();
  const toastRef = React.useRef<Id>();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      thumbnail: undefined,
      previews: [],
      files: [],
      title: "",
      desc: "",
    },
  });

  const watchFiles = watch("files");
  const watchPreviews = watch("previews");

  useEffect(() => {
    const blobPreviews = watchFiles.map((file: File) =>
      URL.createObjectURL(file)
    );

    setValue("previews", blobPreviews);
  }, [watchFiles]);

  useEffect(() => {
    if (toastRef.current) {
      if (galleryState.status === "SUCCESS") {
        toast.update(toastRef.current, {
          type: "success",
          render: "생성 성공",
          isLoading: false,
          autoClose: 2000,
        });
      }
      if (galleryState.status === "ERROR") {
        toast.update(toastRef.current, {
          type: "error",
          render: "생성 실패",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  }, [galleryState.status]);

  const isLoading = useMemo(
    () => galleryState.status === "LOADING",
    [galleryState.status]
  );

  const onClose = () => {
    if (isLoading) {
      return;
    }
    dispatch(galleryActions.createModalClose({}));
  };

  const onValid: SubmitHandler<FieldValues> = (data) => {
    // toastRef.current = toast.loading("생성중");
    console.log(data);
    delete data.previews;

    // dispatch(postThunk.addPost(data));
  };

  const deletePreview = (targetIndex: number) => {
    const filterFiles = watchFiles.filter(
      (__: any, index: number) => targetIndex !== index
    );
    setValue("files", filterFiles);

    const filterPreviews = watchPreviews.filter(
      (__: any, index: number) => targetIndex !== index
    );
    setValue("previews", filterPreviews);
  };

  const body = (
    <div className="space-y-5">
      <div className="flex gap-1">
        {watchPreviews.map((preview: string, targetIndex: number) => {
          return (
            <div className="relative">
              <img src={preview} className="w-10 h-10 rounded" />
              <div
                onClick={(e) => {
                  deletePreview(targetIndex);
                  URL.revokeObjectURL(preview);
                }}
                className="absolute top-0 right-0 cursor-pointer text-xs"
              >
                ❌
              </div>
            </div>
          );
        })}
      </div>
      <File
        name="files"
        control={control}
        errors={errors}
        disabled={false}
        label="사진업로드"
        isMulti
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
      isOpen={galleryState.createModalIsOpen}
      onClose={onClose}
      label="갤러리 작성"
      actionLabel="제출"
      secondActionLabel="취소"
      secondAction={onClose}
      onAction={handleSubmit(onValid)}
      body={body}
      disabled={isLoading}
    />
  );
};

export default GalleryCreateModal;
