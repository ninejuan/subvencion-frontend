import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  padding: 20px;
  background-color: #f2f4f6;
  color: #0e0e0e;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  height: 61px;
  display: flex;
`;

const HeaderItem = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */
  cursor: pointer;
`;

function Header({ isLoggedIn = false }) {
  const navigate = useNavigate();
  return (
    <>
      <HeaderContainer>
        <HeaderItem
          onClick={() => {
            navigate("/");
          }}
        >
          서벤시온
        </HeaderItem>
        <HeaderItem></HeaderItem>
        <HeaderItem>
          <Button
            type="text"
            onClick={() => {
              navigate("/");
            }}
          >
            검색
          </Button>
          {!isLoggedIn ? (
            <Button
              onClick={() => {
                navigate("/mypage");
              }}
            >
              마이페이지
            </Button>
          ) : (
            <Button
              onClick={() => {
                navigate("/signin");
              }}
            >
              로그인
            </Button>
          )}
        </HeaderItem>
      </HeaderContainer>
    </>
  );
}

export default Header;
