export const convertToCordsInPercentage = (cordsInPx, widthRef, heightRef) => {
  return cordsInPx.map((cord, index) => {
    if (index % 2) {
      let newCord = (cord / heightRef) * 100;

      cord = newCord;
    } else {
      let newCord = (cord / widthRef) * 100;

      cord = newCord;
    }
    return Math.round(cord);
  });
};

export const createImage = (imageUrl) => {
  return { image: imageUrl };
};
