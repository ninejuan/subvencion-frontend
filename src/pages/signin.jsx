import React, { useEffect, useState } from "react";
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
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  height: 100vh;
  background-color: #f2f4f6;
  padding: 0 20px;
  box-sizing: border-box; /* 패딩 포함 */
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-left: 16px;
`;

function GoogleSignIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const cookies = document.cookie.split(";");
    const accessTokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("accessToken=")
    );
    setIsLoggedIn(!!accessTokenCookie);
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://api.svcion.com/api/auth/google";
  };

  useEffect(() => {
    const handleRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const response = await fetch(
            "https://api.svcion.com/api/auth/google/redirect",
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("로그인 성공:", data);
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

    handleRedirect();
  }, []);

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
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
              />
              Sign in with Google
            </GoogleButton>
          )}
        </LoginContainer>
      </PageContainer>
    </>
  );
}

export default GoogleSignIn;
