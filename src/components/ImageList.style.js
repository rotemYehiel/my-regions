import styled from "styled-components";
import { DEVICES } from "../constants/mediaQueries";

export const ImageListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: scroll;
  gap: 1vh;

  @media ${DEVICES.desktop} {
    flex-wrap: unset;
    flex-direction: column;
    justify-content: unset;
    row-gap: 0.5vw;
    display: unset;
    overflow-y: scroll;
    padding: 2vw;
  }
`;
export const ImageItem = styled.div`
  background-image: ${({ $imageUrl }) => ($imageUrl ? $imageUrl : "unset")};
  border: 0.5vw solid;
  border-color: ${({ $isCurrentImage }) =>
    $isCurrentImage ? "#5f7e92" : "transparent"};
  width: 10vh;
  height: 10vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;
