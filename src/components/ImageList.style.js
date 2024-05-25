import styled from "styled-components";
import { DEVICES } from "../constants/mediaQueries";

export const ImageListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media ${DEVICES.desktop} {
    flex-wrap: unset;
    flex-direction: column;
  }
`;

export const ImageItem = styled.div`
  background-image: ${({ $imageUrl }) => ($imageUrl ? $imageUrl : null)};
  border: 0.5vw solid;
  border-color: ${({ $isCurrentImage }) =>
    $isCurrentImage ? "red" : "transparent"};
  width: 10vh;
  height: 10vh;
  background-size: cover;
  background-position: center;
  margin: 1vw;
  cursor: pointer;
`;
