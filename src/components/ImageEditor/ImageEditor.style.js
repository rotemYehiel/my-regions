import styled from "styled-components";
import { DEVICES } from "../../constants/mediaQueries";
import { TextInput } from "../../GlobalStyle.style";

export const ImageEditorContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 0.6rem;
  box-sizing: border-box;

  @media ${DEVICES.desktop} {
    align-items: flex-start;
    justify-content: unset;
  }
`;

export const CurrentImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 320px;
  max-width: 100%;

  @media ${DEVICES.tablet} {
    width: 500px;
  }

  @media ${DEVICES.desktop} {
    width: 600px;
  }
`;

export const CurrentImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const BackgroundImage = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

export const ActionPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  width: 100%;

  ${TextInput} {
    width: 70%;
  }

  @media ${DEVICES.tablet} {
    ${TextInput} {
      width: 50%;
    }
  }

  @media ${DEVICES.desktop} {
    align-items: flex-start;

    ${TextInput} {
      width: 50%;
    }
  }
`;
