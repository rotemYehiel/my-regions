import styled from "styled-components";
import { DEVICES } from "../constants/mediaQueries";

export const ImageEditorContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5vw 2vw;
  row-gap: 2vw;
`;

export const CurrentImageWrapper = styled.div`
  padding: 6vw;
  overflow: hidden;
  background-color: whitesmoke;

  @media ${DEVICES.desktop} {
    padding: 2vw;
  }
`;

export const CurrentImageContainer = styled.div`
  width: 100%;
  max-height: 100%;
  height: fit-content;
  position: relative;
`;

export const BackgroundImage = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;
