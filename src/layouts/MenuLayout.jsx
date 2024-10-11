import styled, { css } from "styled-components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import TodayWordEnableIcon from "../assets/icons/menu/today_word_enable.svg";
import TodayWordDisableIcon from "../assets/icons/menu/today_word_disable.svg";
import VocaEnableIcon from "../assets/icons/menu/voca_enable.svg";
import VocaDisableIcon from "../assets/icons/menu/voca_disable.svg";
import MoreEnableIcon from "../assets/icons/menu/more_enable.svg";
import MoreDisableIcon from "../assets/icons/menu/more_disable.svg";
import Header from "../components/common/Header";
import Button from "../components/common/Button";

const MenuLayoutContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Footer = styled.div`
  width: 100%;
  height: 81px;
  position: sticky;
  top: 100px;
  bottom: -1px;
  left: 0px;

  border-top: 1px solid #ededed;

  display: flex;
  background-color: #f2f4f6;
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
