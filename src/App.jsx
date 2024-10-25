import "./App.css";
import { Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: "Noto Sans KR", "Pretendard Variable", Pretendard, sans-serif,
  }

  body {
    display: block;
    /* width: 100%; */
  }
`;

const AppContainer = styled.div`
  max-width: 100vw;
  width: 100%;
  /* height: 100%; */
  margin: 0 auto;
  overflow-x: hidden !important;
`;

function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <AppContainer>
        <Outlet></Outlet>
      </AppContainer>
    </>
  );
}

export default App;
