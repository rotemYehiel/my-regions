import styled from "styled-components";
import { DEVICES } from "./constants/mediaQueries";

export const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  > :first-child {
    background-color: wheat;
    height: 50vh;
  }

  > :nth-child(2) {
    background-color: pink;
    height: 50vh;
  }

  @media ${DEVICES.desktop} {
    flex-direction: row;

    > :first-child {
      order: 2;
      padding: 1vw 4vw;
      width: 80vw;
      height: 100vh;
    }

    > :nth-child(2) {
      order: 1;
      width: 20vw;
      height: 100vh;
      padding: 1vw 4vw;
    }
  }
`;
