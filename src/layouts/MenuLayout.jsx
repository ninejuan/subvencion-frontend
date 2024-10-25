import styled, { css } from "styled-components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Button from "../components/common/Button";

const MenuLayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden; // 가로 스크롤 방지
`;

const Footer = styled.div`
  width: 100%;
  height: 81px;
  border-top: 1px solid #ededed;
  display: flex;
  background-color: #fff;
  padding: 0 20px; // 모바일에서 좌우 여백

  @media (max-width: 767px) {
    padding: 0 10px;
  }
`;

const FooterItem = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FooterItemText = styled.div`
  font-size: 15px;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.12px;
  font-weight: 700;

  ${(props) => props.$customStyle}
`;

function MenuLayout() {
  const navigate = useNavigate();

  return (
    <MenuLayoutContainer>
      <Header></Header>
      <Outlet></Outlet>
      <Footer>
        <FooterItem>
          <FooterItemText>
            Copyright 2024 Juan Lee, All rights reserved.
          </FooterItemText>
          <Button
            type="text"
            onClick={() => {
              navigate("https://www.gov.kr/portal/rcvfvrSvc/main/nonLogin");
            }}
          >
            보조금24 바로가기
          </Button>
        </FooterItem>
      </Footer>
    </MenuLayoutContainer>
  );
}

export default MenuLayout;
