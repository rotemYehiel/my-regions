import styled, { createGlobalStyle } from "styled-components";
import { DEVICES } from "./constants/mediaQueries";

export const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  ul, li{
    margin: 0;
    padding: 0;
    list-style: none;
  }

  button{
    appearance: none;
    outline: none;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
  }

  a {
    text-decoration: none; 
    color: inherit; 
    
    &:hover{
      text-decoration: none;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-size: 100%; 
    font-weight: normal; 
    line-height: normal;
    color: inherit; 
    font-family: inherit; 
  }
`;

export const Button = styled.button`
  padding: 0.625rem 0.938rem;
  font-size: 1rem;
  border: 0.063rem solid #ccc;
  width: fit-content;
  border-radius: 0.25rem;
  background-color: #171d1c;
  color: white;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media ${DEVICES.desktop} {
    &:hover {
      background-color: #72a4c2;
      color: #fff;
    }
  }
`;

export const TextInput = styled.input`
  padding: 0.625rem 0.938rem;
  font-size: 1rem;
  border: 0.063rem solid #ccc;
  border-radius: 0.25rem;
`;
