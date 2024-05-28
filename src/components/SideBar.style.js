import styled from "styled-components";
import { DEVICES } from "../constants/mediaQueries";
import { Button } from "../GlobalStyle.style";

export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5vw 2vw;
  row-gap: 2vw;

  > ${Button} {
    position: absolute;
    right: 10%;
    bottom: 5%;
  }

  @media ${DEVICES.desktop} {
    align-items: center;
    row-gap: 1vw;

    > ${Button} {
      position: unset;
    }
  }
`;

export const UploadImageInput = styled.input`
  display: none;
`;
