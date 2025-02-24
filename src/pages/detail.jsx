import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Form,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Noto Sans KR", sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const AvailableTag = styled.div`
  background-color: #e8fae8;
  color: #008000;
  padding: 5px 10px;
  border-radius: 15px;
  display: inline-block;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 10px 0;
`;

const InfoBox = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const InfoTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const InfoContent = styled.p`
  margin: 0;
`;

const ReadMoreButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const ContactInfo = styled.div`
  margin-bottom: 20px;
`;

const ApplyButton = styled.button`
  background-color: #ffd1d1;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin: 0 auto;
  width: 100%;
`;

const RequiredDocuments = styled.ul`
  padding-left: 20px;
`;

const SupportDetails = styled.div`
  margin-top: 20px;
`;

const CAN = styled.div`
  margin-top: 20px;
`;

function SubsidyDetail() {
  const navigate = useNavigate();

  const [subsidyId, setSubsidyId] = useState();
  const [detailedSubsidy, setDetailedSubsidy] = useState({});
  const [isEligible, setIsEligible] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();

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
    const fetchData = async () => {
      if (!params.id) {
        window.location.href = "/404";
        return;
      }

      setSubsidyId(params.id);

      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(
          `/api/subsidies/detail/${params.id}`
        );

        if (response.data) {
          setDetailedSubsidy({
            ...response.data._doc,
            // ["isEligible"]: response.data.isEligible,
          });
          setIsEligible(response.data.isEligible);
          console.log(response.data);
        } else {
          throw new Error("Data not found");
        }
      } catch (error) {
        console.error("Failed to fetch subsidy details:", error);
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    };

    fetchData();
    console.log(isEligible);
  }, [params.id]);

  const moveToApplication = () => {
    window.location.href = `https://www.gov.kr/portal/rcvfvrSvc/dtlEx/${subsidyId}`;
  };

  return (
    <PageContainer>
      {error && <p>{error}</p>}
      <Header>
        {isEligible && <AvailableTag>이 혜택을 받을 수 있어요!</AvailableTag>}
        <Title>{detailedSubsidy.serviceName}</Title>
      </Header>
      <InfoBox>
        <InfoTitle>인공지능의 중요 내용 요약</InfoTitle>
        <InfoContent>{detailedSubsidy.summary}</InfoContent>
      </InfoBox>

      <SupportDetails>
        <h3>기본 정보</h3>
        <RequiredDocuments>
          <div>
            {detailedSubsidy.supportType && (
              <li>
                지급 방식 :{" "}
                {detailedSubsidy.supportType
                  .split("\n")
                  .filter((el) => el.trim() !== "")
                  .map((el, index) => (
                    <span key={index}>
                      {el}
                      {index <
                        detailedSubsidy.supportType.split("\n").length - 1 &&
                        ", "}
                    </span>
                  ))}
              </li>
            )}
            {detailedSubsidy.applicationDeadline && (
              <li>
                신청 기한 :{" "}
                {detailedSubsidy.applicationDeadline
                  .split("\n")
                  .filter((el) => el.trim() !== "")
                  .map((el, index) => (
                    <span key={index}>
                      {el}
                      {index <
                        detailedSubsidy.applicationDeadline.split("\n").length -
                          1 && ", "}
                    </span>
                  ))}
              </li>
            )}
            {detailedSubsidy.servicePurpose && (
              <li>
                서비스 목적 :{" "}
                {detailedSubsidy.servicePurpose
                  .split("\n")
                  .filter((el) => el.trim() !== "")
                  .map((el, index) => (
                    <span key={index}>
                      {el}
                      {index <
                        detailedSubsidy.servicePurpose
                          .split("\n")
                          .filter((el) => el.trim() !== "").length -
                          1 && ", "}
                    </span>
                  ))}
              </li>
            )}
          </div>
        </RequiredDocuments>
      </SupportDetails>

      <ApplyButton onClick={moveToApplication}>신청하기</ApplyButton>

      {detailedSubsidy.supportDetails && (
        <SupportDetails>
          <h3>지원 내용 :</h3>
          <RequiredDocuments>
            {detailedSubsidy.supportDetails
              .split("\n")
              .filter((el) => el.trim() !== "")
              .map((el, index) => (
                <li key={index}>{el}</li>
              ))}
          </RequiredDocuments>
        </SupportDetails>
      )}

      {detailedSubsidy.targetGroup && (
        <SupportDetails>
          <h3>서비스 제공 대상 및 기타 사항 :</h3>
          <RequiredDocuments>
            {detailedSubsidy.targetGroup
              .split("\n")
              .filter((el) => el.trim() !== "")
              .map((el, index) => (
                <li key={index}>{el}</li>
              ))}
          </RequiredDocuments>
        </SupportDetails>
      )}

      {detailedSubsidy.applicationMethod && (
        <SupportDetails>
          <h3>지원 방법 :</h3>
          <RequiredDocuments>
            {detailedSubsidy.applicationMethod
              .split("\n")
              .filter((el) => el.trim() !== "")
              .map((el, index) => (
                <li key={index}>{el}</li>
              ))}
          </RequiredDocuments>
        </SupportDetails>
      )}
      {detailedSubsidy.requiredDocuments && (
        <SupportDetails>
          <h3>구비서류 :</h3>
          <RequiredDocuments>
            <div>
              {detailedSubsidy.requiredDocuments
                .split("\n")
                .filter((el) => el.trim() !== "")
                .map((el, index) => (
                  <li key={index}>{el}</li>
                ))}
            </div>
          </RequiredDocuments>
        </SupportDetails>
      )}
      {detailedSubsidy.contactInfo && (
        <ContactInfo>
          <h3>문의처 :</h3>
          <RequiredDocuments>
            <li>{detailedSubsidy.contactInfo}</li>
          </RequiredDocuments>
        </ContactInfo>
      )}
    </PageContainer>
  );
}

export default SubsidyDetail;
