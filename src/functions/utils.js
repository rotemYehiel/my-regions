export const convertToCordsInPercentage = (cordsInPx, widthRef, heightRef) => {
  return cordsInPx.map((cord, index) => {
    if (index % 2) {
      let newCord = (cord / heightRef) * 100;

      cord = newCord;
    } else {
      let newCord = (cord / widthRef) * 100;

      cord = newCord;
    }
    return cord;
  });
};

export const convertToCordsInPixel = (
  cordsInPercentage,
  widthRef,
  heightRef
) => {
  return cordsInPercentage.map((cord, index) => {
    if (index % 2) {
      let newCord = (cord * heightRef) / 100;

      cord = newCord;
    } else {
      let newCord = (cord * widthRef) / 100;

      cord = newCord;
    }
    return cord;
  });
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getDataFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data !== null ? JSON.parse(data) : null;
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const sortItems = (arr, sortByProperty) => {
  return arr.sort((a, b) => a[sortByProperty] - b[sortByProperty]);
};

export const createImage = (id, imageUrl, regions) => {
  return {
    id,
    image: imageUrl,
    regions,
  };
};
