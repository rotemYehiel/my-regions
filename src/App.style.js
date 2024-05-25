import styled from "styled-components";
import { DEVICES } from "./constants/mediaQueries";

export const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  > :first-child {
    background-color: red;
    height: 70%;
  }

  > :nth-child(2) {
    background-color: pink;
    height: 30%;
  }

  @media ${DEVICES.desktop} {
    flex-direction: row;

    > :first-child {
      order: 2;
      padding: 1vw 4vw;
      height: unset;
      width: 80%;
    }

    > :nth-child(2) {
      order: 1;
      height: unset;
      width: 20%;
      padding: 1vw 4vw;
    }
  }
`;
