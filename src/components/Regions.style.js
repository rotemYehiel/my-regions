import styled from "styled-components";

export const RegionsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const RegionsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const RegionWrapper = styled.div``;

export const RegionLabel = styled.label`
  background-color: red;
  color: white;
  width: fit-content;
  height: 16px;
  position: absolute;
  left: ${({ $startX }) => ($startX ? `${$startX}%` : `0`)};
  top: ${({ $startY }) => ($startY ? `calc(${$startY}% - 20px)` : `0`)};
  padding: 2px;
`;

export const Region = styled.div`
  width: ${({ $width }) => ($width ? `${$width}%` : `0`)};
  height: ${({ $height }) => ($height ? `${$height}%` : `0`)};
  background-color: transparent;
  border: 1px solid red;
  position: absolute;
  left: ${({ $startX }) => ($startX ? `${$startX}%` : `0`)};
  top: ${({ $startY }) => ($startY ? `${$startY}%` : `0`)};
`;
