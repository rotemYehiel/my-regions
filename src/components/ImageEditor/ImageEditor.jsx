import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { currentImageSelector } from "../../store/selectors/editorSelectors";
import { regionsSelector } from "../../store/selectors/regionsSelectors";
import {
  ImageEditorContainer,
  CurrentImageContainer,
  BackgroundImage,
  CurrentImageWrapper,
} from "./ImageEditor.style";
import Canvas from "../Canvas/Canvas";
import { BASE_URL } from "../../constants/api";
import { getEmptyRegions, getRegions } from "../../store/actions/regionsAction";
import Regions from "../Regions/Regions";
import {
  postImage,
  updateCurrentImage,
} from "../../store/actions/editorAction";
import { Button, TextInput } from "../../GlobalStyle.style";
import useWindowResize from "../../hooks/useWindowResize";

const ImageEditor = () => {
  const dispatch = useDispatch();
  const currentImage = useSelector(currentImageSelector);
  const regions = useSelector(regionsSelector);
  const { width: windowWidth, height: windowHeight } = useWindowResize();
  const containerRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState(null);
  const [containerHeight, setContainerHeight] = useState(null);
  const [newPoints, setNewPoints] = useState(null);
  const [newLable, setNewLable] = useState("");
  const [isReset, setIsReset] = useState(false);

  const isEditImage = useMemo(() => !!currentImage?.id, [currentImage]);

  useEffect(() => {
    if (currentImage) {
      getCurrentImageRegions();
    }

    return () => {
      reset();
    };
  }, [currentImage]);

  useEffect(() => {
    setContainerWidth(containerRef.current?.offsetWidth);
    setContainerHeight(containerRef.current?.offsetHeight);
  }, [windowWidth, windowHeight]);

  const getCurrentImageRegions = () => {
    currentImage?.id
      ? dispatch(getRegions(currentImage?.id))
      : dispatch(getEmptyRegions());
  };

  const handleImageLoad = () => {
    setContainerWidth(containerRef.current?.offsetWidth);
    setContainerHeight(containerRef.current?.offsetHeight);
  };

  const handleLabelChange = (ev) => {
    setNewLable(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (newPoints?.length && newLable) {
      const uniqueId = uuidv4();
      const newRegion = { id: uniqueId, label: newLable, points: newPoints };
      let newRegions = [...regions, newRegion];

      if (currentImage.id) {
        dispatch(updateCurrentImage(currentImage.id, newRegions));
      } else {
        dispatch(postImage(currentImage.image, newRegions));
      }

      reset();
    }
  };

  const reset = () => {
    setNewPoints(null);
    setNewLable("");
    setIsReset(true);
  };

  if (!currentImage) {
    return <div>Loading...</div>;
  }

  return (
    <ImageEditorContainer onSubmit={handleSubmit}>
      {currentImage && (
        <CurrentImageWrapper>
          <CurrentImageContainer ref={containerRef}>
            <BackgroundImage
              src={
                isEditImage
                  ? `${BASE_URL}/${currentImage?.image}`
                  : currentImage.image
              }
              alt={currentImage?.id}
              onLoad={handleImageLoad}
            />
            {regions && <Regions regions={regions} />}
            {containerWidth && containerHeight && (
              <Canvas
                containerWidth={containerWidth}
                containerHeight={containerHeight}
                setRectanglePoints={setNewPoints}
                isReset={isReset}
                setIsReset={setIsReset}
                rectanglePoints={newPoints}
              />
            )}
          </CurrentImageContainer>
        </CurrentImageWrapper>
      )}
      <TextInput
        placeholder="enter label here"
        value={newLable}
        onChange={handleLabelChange}
      />

      <Button type="submit">save</Button>
    </ImageEditorContainer>
  );
};

export default ImageEditor;
