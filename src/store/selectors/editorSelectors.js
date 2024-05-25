export const editorStateSelector = (state) => state.editor;

export const currentImageSelector = (state) =>
  editorStateSelector(state).currentImage;

export const currentImageIdSelector = (state) => {
  const currentImage = currentImageSelector(state);
  return currentImage ? currentImage.id : null;
};
