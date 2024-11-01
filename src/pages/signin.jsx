import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  #root {
    height: 100%;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 40px;
  margin-top: -200px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  overflow: hidden;
`;

const LoginText = styled.p`
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #dadce0;
  border-radius: 6px;
  padding: 12px 24px;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  color: #3c4043;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #f7f8f8;
  }

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`;

const GoogleSignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
    handleRedirect();
  }, []);

  const checkLoginStatus = () => {
    const token = Cookies.get("accessToken");
    setIsLoggedIn(token ? true : false);
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://api.juany.kr/api/auth/google";
  };

  const handleRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      try {
        const response = await fetch(
          `https://api.juany.kr/api/auth/google/redirect?code=${code}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          Cookies.set("accessToken", data.accessToken, { expires: 7 });
          setIsLoggedIn(true);

          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        } else {
          console.error("로그인 실패");
        }
      } catch (error) {
        console.error("로그인 처리 중 오류 발생:", error);
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <LoginContainer>
          <LoginText>Google ID로 서벤시온에 로그인</LoginText>
          {isLoggedIn ? (
            <p style={{ fontSize: "20px" }}>로그인 되었습니다!</p>
          ) : (
            <GoogleButton onClick={handleGoogleLogin}>
              {/* <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
              /> */}
              Sign in with Google
            </GoogleButton>
          )}
        </LoginContainer>
      </PageContainer>
    </>
  );
};

export default GoogleSignIn;
