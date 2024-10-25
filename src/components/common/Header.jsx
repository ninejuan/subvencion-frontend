import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/1024Logo.svg";
import Cookies from "js-cookie";

const HeaderContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ededed;
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
  cursor: pointer;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

const HeaderItemImg = styled.img`
  width: 70px;
  height: 70px;
  margin: 0;
  @media (max-width: 767px) {
    width: 50px;
    height: 50px;
  }
`;

const MobileOnlyItem = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: none;
    flex: 1;
  }
`;

const MobileOnlyButton = styled(Button)`
  display: inline-block;
  @media (max-width: 767px) {
    display: none;
  }
`;

function Header() {
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");
  let isLoggedIn = token ? true : false;
  return (
    <HeaderContainer>
      <HeaderItem
        onClick={() => {
          navigate("/");
        }}
      >
        <HeaderItemImg src={Logo} />
        서벤시온
      </HeaderItem>

      <MobileOnlyItem />

      <HeaderItem>
        <MobileOnlyButton
          type="text"
          onClick={() => {
            navigate("/");
          }}
        >
          검색
        </MobileOnlyButton>
        {isLoggedIn ? (
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
  );
}

export default Header;
