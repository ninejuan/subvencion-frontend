import React from "react";
import SubsidyBox from "../components/subsidy/SubsidyBox";
// import SearchComponent from "../components/SearchComponent";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background-color: #f2f4f6;
  padding: 58px 20px;

  @media (max-width: 768px) {
    padding: 40px 16px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 48px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 48px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

function Main() {
  const welfareData = [
    {
      serviceId: 1234,
      title: "취약계층 무료 법률서비스 제공",
      institution: "법무부 · 행정안전부",
      target: "기초생활수급자, 장애인, 범죄피해자 등 취약계층",
      method: "기타 온라인 신청",
      deadline: "접수기간 별도 달라요",
      eligible: true,
    },
    {
      serviceId: 5678,
      title: "취약계층 무료 법률서비스 제공",
      institution: "법무부 · 행정안전부",
      target: "기초생활수급자, 장애인, 범죄피해자 등 취약계층",
      method: "기타 온라인 신청",
      deadline: "접수기간 별도 달라요",
      eligible: false,
    },
    // 추가 데이터...
  ];

  const extendedWelfareData = [...welfareData, ...welfareData, ...welfareData];

  return (
    <MainContainer>
      <Title>서비스 검색하기</Title>
      {/* <SearchComponent /> */}
      <BoxContainer>
        {extendedWelfareData.map((welfare, index) => (
          <SubsidyBox key={index} {...welfare} />
        ))}
      </BoxContainer>
    </MainContainer>
  );
}

export default Main;
