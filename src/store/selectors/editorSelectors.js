export const editorStateSelector = (state) => state.editor;

export const currentImageSelector = (state) =>
  editorStateSelector(state).currentImage;

export const currentImageImgSelector = (state) => {
  const currentImage = currentImageSelector(state);
  return currentImage ? currentImage.image : null;
};
