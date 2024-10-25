import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import SearchInput from "../components/common/SearchInput";
import SubsidyBox from "../components/subsidy/SubsidyBox";

// 스타일 컴포넌트들은 그대로 유지
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #333;
  align-self: flex-start;
  width: 100%;
`;

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [interestedSubsidies, setInterestedSubsidies] = useState([]);
  const [newSubsidies, setNewSubsidies] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // axios 인스턴스 생성 함수
  const createAxiosInstance = () => {
    const token = Cookies.get("accessToken");
    return token
      ? axios.create({
          baseURL: "https://api.juany.kr",
          headers: { Authorization: `Bearer ${token}` },
        })
      : axios.create({ baseURL: "https://api.juany.kr" });

    console.log(`token ${token}`);
  };

  // 로그인 상태와 메인 데이터 로드를 하나의 useEffect로 통합
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("accessToken");
      setIsLoggedIn(!!token);

      try {
        const axiosInstance = createAxiosInstance();

        const [interestedResponse, newResponse] = await Promise.all([
          axiosInstance.get("/api/main/interested"),
          axiosInstance.get("/api/main/new"),
        ]);

        setInterestedSubsidies(interestedResponse.data);
        setNewSubsidies(newResponse.data);
        console.log(interestedResponse.data);
      } catch (error) {
        console.error("Failed to fetch main data:", error);
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 검색 핸들러 개선
  const handleSearch = async (searchTerm) => {
    if (!searchTerm?.trim()) {
      setSearchData([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `/search?content=${encodeURIComponent(searchTerm)}`
      );
      setSearchData(response.data || []);
    } catch (error) {
      console.error("Search failed:", error);
      setError("검색 결과를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
      setSearchData([]);
    } finally {
      setLoading(false);
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
            {interestedSubsidies.map((welfare) => (
              <SubsidyBox
                key={`keyword-${welfare.serviceId}`}
                serviceId={welfare.serviceId}
                title={welfare.serviceName}
                institution={welfare.responsibleInstitutionName}
                target={welfare.targetGroup}
                method={welfare.applicationMethod}
                deadline={welfare.applicationDeadline}
                eligible={welfare.isEligible}
              />
            ))}
          </BoxContainer>

          <SectionTitle>이런 혜택이 추가됐어요!</SectionTitle>
          <BoxContainer>
            {newSubsidies.map((welfare, index) => (
              <SubsidyBox
                key={`new-${welfare.serviceId}-${index}`}
                serviceId={welfare.serviceId}
                title={welfare.serviceName}
                institution={welfare.responsibleInstitutionName}
                target={welfare.targetGroup}
                method={welfare.applicationMethod}
                deadline={welfare.applicationDeadline}
                eligible={welfare.eligible}
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
