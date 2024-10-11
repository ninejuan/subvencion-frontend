import styled, { css } from "styled-components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import TodayWordEnableIcon from "../assets/icons/menu/today_word_enable.svg";
import TodayWordDisableIcon from "../assets/icons/menu/today_word_disable.svg";
import VocaEnableIcon from "../assets/icons/menu/voca_enable.svg";
import VocaDisableIcon from "../assets/icons/menu/voca_disable.svg";
import MoreEnableIcon from "../assets/icons/menu/more_enable.svg";
import MoreDisableIcon from "../assets/icons/menu/more_disable.svg";
import Header from "../components/common/Header";

const MenuLayoutContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Footer = styled.div`
  width: 100%;
  height: 61px;
  position: sticky;
  top: 100px;
  bottom: -1px;
  left: 0px;

  border-top: 1px solid #ededed;

  display: flex;
  background-color: #fff;
`;

const FooterItem = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

const FooterItemImg = styled.img`
  margin: 0 auto;
`;

const FooterItemText = styled.div`
  font-size: 12px;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.12px;
  font-weight: 700;

  ${(props) => props.$customStyle}
`;

function MenuLayout() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const disableStyle = css`
    color: #cfcece;
  `;

  const enableStyle = css`
    color: #1e1e1e;
  `;

  return (
    <MenuLayoutContainer>
      <Header>오늘의 단어</Header>
      <Outlet></Outlet>
      <Footer>
        <FooterItem
          onClick={() => {
            navigate("/");
          }}
        >
          <FooterItemImg
            src={pathname === "/" ? TodayWordEnableIcon : TodayWordDisableIcon}
          ></FooterItemImg>
          <FooterItemText
            $customStyle={pathname === "/" ? enableStyle : disableStyle}
          >
            오늘의 단어
          </FooterItemText>
        </FooterItem>
        <FooterItem
          onClick={() => {
            navigate("/voca");
          }}
        >
          <FooterItemImg
            src={pathname === "/voca" ? VocaEnableIcon : VocaDisableIcon}
          ></FooterItemImg>
          <FooterItemText
            $customStyle={pathname === "/voca" ? enableStyle : disableStyle}
          >
            단어장
          </FooterItemText>
        </FooterItem>
        <FooterItem
          onClick={() => {
            navigate("/more");
          }}
        >
          <FooterItemImg
            src={pathname === "/more" ? MoreEnableIcon : MoreDisableIcon}
          ></FooterItemImg>
          <FooterItemText
            $customStyle={pathname === "/more" ? enableStyle : disableStyle}
          >
            더보기
          </FooterItemText>
        </FooterItem>
      </Footer>
    </MenuLayoutContainer>
  );
}

export default MenuLayout;
