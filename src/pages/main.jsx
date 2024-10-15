import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import SearchInput from "../components/common/SearchInput";
import SubsidyBox from "../components/subsidy/SubsidyBox";

// 메인 컨테이너 스타일링
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// 제목 스타일링
const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

// 섹션 제목 스타일링
const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #333;
  align-self: flex-start;
  width: 100%;
`;

// 박스 컨테이너 스타일링
const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
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
  ];

  const keywordData = [...welfareData, ...welfareData];
  const newBenefitsData = [...welfareData, ...welfareData];

  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const accessToken = Cookies.get("accessToken");

  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === "") {
      setSearchData([]);
    } else {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosWithAuth.get(
          `https://api.subvc.com/search?content=${searchTerm}`
        );
        setSearchData(response.data);
      } catch (err) {
        setError("검색 결과를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <MainContainer>
      <Title>서벤시온 검색하기</Title>
      <SearchInput onSearch={handleSearch} />
      {loading && <p>로딩 중...</p>}
      {error && <p>{error}</p>}

      {searchData.length > 0 ? (
        <BoxContainer>
          {searchData.map((welfare, index) => (
            <SubsidyBox
              key={`search-${welfare.serviceId}-${index}`}
              {...welfare}
            />
          ))}
        </BoxContainer>
      ) : (
        <>
          <SectionTitle>이 복지를 추천해요!</SectionTitle>
          <BoxContainer>
            {keywordData.map((welfare, index) => (
              <SubsidyBox
                key={`keyword-${welfare.serviceId}-${index}`}
                {...welfare}
              />
            ))}
          </BoxContainer>

          <SectionTitle>이런 혜택이 추가됐어요!</SectionTitle>
          <BoxContainer>
            {newBenefitsData.map((welfare, index) => (
              <SubsidyBox
                key={`new-${welfare.serviceId}-${index}`}
                {...welfare}
                isNew={true}
              />
            ))}
          </BoxContainer>
        </>
      )}
    </MainContainer>
  );
}

export default Main;
