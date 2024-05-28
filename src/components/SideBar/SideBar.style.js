import styled from "styled-components";
import { DEVICES } from "../../constants/mediaQueries";
import { Button } from "../../GlobalStyle.style";

export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0.6rem;
  row-gap: 0.6rem;

  > ${Button} {
    position: absolute;
    right: 10%;
    bottom: 5%;
  }

  @media ${DEVICES.desktop} {
    align-items: center;
    row-gap: 0.64rem;

    > ${Button} {
      position: unset;
    }
  }
`;

export const UploadImageInput = styled.input`
  display: none;
`;
