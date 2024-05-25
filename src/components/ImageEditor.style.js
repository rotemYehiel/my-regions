import styled from "styled-components";
import { BASE_URL } from "../store/actions/imagesAction";

export const ImageEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vw 2vw;
  row-gap: 2vw;
`;
export const CurrentImage = styled.div`
  background-image: ${({ $currentImage }) =>
    $currentImage ? `url(${BASE_URL}/${$currentImage})` : "unset"};
  width: auto;
  height: 100%;
  background-size: cover;
`;
