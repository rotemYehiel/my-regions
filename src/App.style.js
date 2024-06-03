import styled from "styled-components";
import { DEVICES } from "./constants/mediaQueries";

export const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  > :first-child {
    background-color: #b1d0e2;
    height: 50vh;
    box-sizing: border-box;
    padding: 0.64rem;
  }

  > :nth-child(2) {
    background-color: #cde3f1;
    height: 50vh;
    box-sizing: border-box;
    padding: 0.64rem;
  }

  @media ${DEVICES.tablet} {
    > :first-child {
      height: 70vh;
    }

    > :nth-child(2) {
      height: 30vh;
    }
  }

  @media ${DEVICES.desktop} {
    flex-direction: row;

    > :first-child {
      order: 2;
      padding: 2.56rem;
      width: 80vw;
      height: 100%;
    }

    > :nth-child(2) {
      order: 1;
      padding: 2.56rem;
      width: 20vw;
      height: 100%;
    }
  }
`;
