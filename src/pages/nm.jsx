import SubsidyBox from "../components/subsidy/SubsidyBox";
import styled from "styled-components";

const MainContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

function Main() {
  const welfareData = [
    {
      title: "취약계층 무료 법률서비스 제공",
      institution: "법무부 · 행정안전부",
      target: "기초생활수급자, 장애인, 범죄피해자 등 취약계층",
      method: "기타 온라인 신청",
      deadline: "접수기간 별도 달라요",
      eligible: true,
    },
    {
      title: "취약계층 무료 법률서비스 제공",
      institution: "법무부 · 행정안전부",
      target: "기초생활수급자, 장애인, 범죄피해자 등 취약계층",
      method: "기타 온라인 신청",
      deadline: "접수기간 별도 달라요",
      eligible: false,
    },
    // 추가 데이터...
  ];
  return (
    <>
      <MainContainer>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {welfareData.map((welfare, index) => (
            <SubsidyBox key={index} {...welfare} />
          ))}
        </div>
      </MainContainer>
    </>
  );
}

export default Main;
