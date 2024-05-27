import styled from "styled-components";
import { DEVICES } from "../constants/mediaQueries";

export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5vw 2vw;
  row-gap: 2vw;

  @media ${DEVICES.desktop} {
    align-items: center;
  }
`;

export const UploadImageInput = styled.input`
  display: none;
`;
