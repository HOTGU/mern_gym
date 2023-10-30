import React from "react";
import Button from "../components/Button";
import { useAppDispatch } from "../store";
import { galleryActions } from "../reducers/gallery/gallerySlice";
import Container from "../components/Container";
import GalleryCreateModal from "../components/modals/GalleryCreateModal";

const Gallery = () => {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <GalleryCreateModal />
      <Button
        label="업로드"
        onAction={() => {
          dispatch(galleryActions.createModalOpen({}));
        }}
        small
      />
    </Container>
  );
};

export default Gallery;
