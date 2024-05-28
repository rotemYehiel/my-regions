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
    align-items: center;
  }

  > :nth-child(2) {
    background-color: #cde3f1;
    height: 50vh;
  }

  @media ${DEVICES.desktop} {
    flex-direction: row;

    > :first-child {
      order: 2;
      padding: 0.64rem 2.56rem;
      width: 80vw;
      height: 100vh;
      align-items: unset;
    }

    > :nth-child(2) {
      order: 1;
      width: 20vw;
      height: 100vh;
      padding: 0.64rem 2.56rem;
    }
  }
`;
