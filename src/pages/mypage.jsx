import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// 기본 스타일 구성
const PageContainer = styled.div`
  padding: 24px;
  max-width: 500px;
  margin: auto;
  font-family: Arial, sans-serif;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
`;

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 12px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ddd;
`;

const ProfileName = styled.h1`
  font-size: 1.25em;
  font-weight: 600;
  color: #333;
`;

const Section = styled.section`
  margin: 24px 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.15em;
  margin-bottom: 8px;
  color: #444;
  font-weight: 500;
`;

const KeywordInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95em;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &.primary {
    background-color: #007bff;
    color: white;
  }

  &.secondary {
    background-color: #6c757d;
    color: white;
  }

  &.danger {
    background-color: #e74c3c;
    color: white;
  }

  &:hover {
    filter: brightness(90%);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  width: 100%;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 0.95em;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  padding: 8px 0;
  width: 100%;
  z-index: 1;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.95em;
  color: ${({ selected }) => (selected ? "#007bff" : "#333")};

  &:hover {
    background-color: #f0f0f0;
  }
`;

const KeywordChip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 8px;
  margin: 4px;
  background-color: #eef2f7;
  border-radius: 16px;
  font-size: 0.9em;
  cursor: pointer;
  color: #333;

  &::after {
    content: "×";
    margin-left: 4px;
    font-size: 1em;
  }
`;

const Mypage = () => {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [selections, setSelections] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");

  const jacodeMap = {
    JA0101: "남성",
    JA0102: "여성",
    JA0201: "중위소득 0~50%",
    JA0202: "중위소득 51~75%",
    JA0203: "중위소득 76~100%",
    JA0204: "중위소득 101~200%",
    JA0205: "중위소득 200% 초과",
    JA0301: "예비부모/난임",
    JA0302: "임산부",
    JA0303: "출산/입양",
    JA0313: "농업인",
    JA0314: "어업인",
    JA0315: "축산업인",
    JA0316: "임업인",
    JA0317: "초등학생",
    JA0318: "중학생",
    JA0319: "고등학생",
    JA0320: "대학생/대학원생",
    JA0322: "해당사항없음",
    JA0326: "근로자/직장인",
    JA0327: "구직자/실업자",
    JA0401: "다문화가족",
    JA0402: "북한이탈주민",
    JA0403: "한부모가정/조손가정",
    JA0404: "1인가구",
    JA0410: "해당사항없음",
    JA0411: "다자녀가구",
    JA0412: "무주택세대",
    JA0413: "신규전입",
    JA0414: "확대가족",
    JA1101: "예비창업자",
    JA1102: "영업중",
    JA1103: "생계곤란/폐업예정자",
    JA1201: "음식업",
    JA1202: "제조업",
    JA1299: "기타업종",
    JA2101: "중소기업",
    JA2102: "사회복지시설",
    JA2103: "기관/단체",
    JA2201: "제조업",
    JA2202: "농업,임업 및 어업",
    JA2203: "정보통신업",
    JA2299: "기타업종",
    JA0328: "장애인",
    JA0329: "국가보훈대상자",
    JA0330: "질병/질환자",
  };

  const createAxiosInstance = () => {
    const token = Cookies.get("accessToken");
    return token
      ? axios.create({
          baseURL: "https://api-subvencion.juany.kr",
          headers: { Authorization: `Bearer ${token}` },
        })
      : axios.create({ baseURL: "https://api-subvencion.juany.kr" });
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchUserProperties = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        navigate("/signin");
        return;
      }
      console.log(token);
      try {
        const response = await axios.get(
          "https://api-subvencion.juany.kr/api/auth/properties",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data) {
          if (response.data.keyword) {
            setKeywords(response.data.keyword);
          }

          if (response.data.jacode) {
            const newSelections = response.data.jacode.reduce((acc, code) => {
              acc[code] = true;
              return acc;
            }, {});
            setSelections(newSelections);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user properties:", error);
      }
    };

    fetchUserProperties();
  }, [navigate]);

  const handleAddKeyword = (e) => {
    if (e.key === "Enter" && newKeyword.trim()) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (indexToRemove) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
  };

  const toggleSelection = (key) => {
    setSelections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleRemoveSelection = (key) => {
    setSelections((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  const handleSave = async () => {
    try {
      const jacode = Object.entries(selections)
        .filter(([_, value]) => value)
        .map(([key]) => key);

      const axiosInstance = createAxiosInstance();

      await axiosInstance.post("/api/auth/applyProperties", {
        jacode: Object.keys(selections),
        keyword: keywords,
      });
      alert("저장되었습니다.");
    } catch (error) {
      console.error("Failed to save properties:", error);
      alert("저장에 실패했습니다.");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getUserData = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      navigate("/signin");
      return;
    }
    const response = await axios.get(
      "https://api-subvencion.juany.kr/api/auth/userdata",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setName(response.data.name);
    setPhoto(response.data.profile);
    setEmail(response.data.mail);
  };
  useEffect(async () => {
    await getUserData();
  }, []);
  return (
    <PageContainer>
      <ProfileSection>
        <ProfileImage>
          <img src={photo || "https://via.placeholder.com/50"} alt="Profile" />
        </ProfileImage>
        <ProfileName>
          {name} ({email})
        </ProfileName>
      </ProfileSection>

      <Section>
        <SectionTitle>키워드 관리</SectionTitle>
        <KeywordInput
          type="text"
          placeholder="키워드를 입력하고 Enter를 누르세요"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          onKeyDown={handleAddKeyword}
        />
        <div>
          {keywords.map((keyword, index) => (
            <KeywordChip key={index} onClick={() => handleRemoveKeyword(index)}>
              {keyword}
            </KeywordChip>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>자격 요건</SectionTitle>
        <DropdownContainer>
          <DropdownButton onClick={toggleDropdown}>
            자격 요건을 선택하세요
          </DropdownButton>
          {dropdownOpen && (
            <DropdownMenu>
              {Object.entries(jacodeMap).map(([key, value]) => (
                <DropdownItem
                  key={key}
                  onClick={() => toggleSelection(key)}
                  selected={selections[key]}
                >
                  {value}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </DropdownContainer>
        <div>
          {Object.entries(selections)
            .filter(([_, selected]) => selected)
            .map(([key]) => (
              <KeywordChip key={key} onClick={() => handleRemoveSelection(key)}>
                {jacodeMap[key]}
              </KeywordChip>
            ))}
        </div>
      </Section>

      <ButtonGroup>
        <Button className="primary" onClick={handleSave}>
          저장
        </Button>
        <Button className="secondary" onClick={() => navigate("/")}>
          돌아가기
        </Button>
        <Button
          className="danger"
          onClick={() => Cookies.remove("accessToken")}
        >
          로그아웃
        </Button>
      </ButtonGroup>
    </PageContainer>
  );
};

export default Mypage;
