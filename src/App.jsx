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
  }
`;

const AppContainer = styled.div`
  max-width: 100vw;
  /* height: 100%; */
  margin: 0 auto;
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
