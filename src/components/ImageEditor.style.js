import styled from "styled-components";

export const ImageEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2vw 2vw;
  row-gap: 2vw;
`;

export const CanvasContainer = styled.div`
  max-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
`;
