import styled from "styled-components";
import { DEVICES } from "./constants/mediaQueries";

export const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  > :first-child {
    flex: 0 0 70vh;
    background-color: red;
  }

  > :nth-child(2) {
    flex: 1 0 auto;
    background-color: pink;
  }

  @media ${DEVICES.tablet} {
    > :first-child {
      flex: 0 0 60vh;
    }
  }

  @media ${DEVICES.desktop} {
    flex-direction: row;

    > :first-child {
      order: 2;
      flex: 1 0 auto;
      padding: 1vw 4vw;
    }

    > :nth-child(2) {
      order: 1;
      flex: 0 0 20vw;
      padding: 1vw 4vw;
    }
  }
`;
