import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Noto Sans KR", sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
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
`;

const RequiredDocuments = styled.ul`
  padding-left: 20px;
`;

const SupportDetails = styled.div`
  margin-top: 20px;
`;

const SubsidyDetail = () => {
  return (
    <PageContainer>
      <Header>
        <AvailableTag>이 혜택을 받을 수 있어요!</AvailableTag>
        <Title>유아학비 (누리과정) 지원</Title>
      </Header>

      <InfoBox>
        <InfoTitle>인공지능 요약</InfoTitle>
        <InfoContent>
          유아학비 지원 프로그램은 3~5세 유아에게 교육비와 방과후 과정비를
          지원하며, 저소득층 우선 지원이 있다.
        </InfoContent>
        <ReadMoreButton>다시 요약하기</ReadMoreButton>
      </InfoBox>

      <ContactInfo>
        <div>문의처 :</div>
        <div>보건복지상담센터1/129</div>
        <div>교육부/02-6222-6060/10079</div>
        <div>에듀콜/1544-0079-5-1</div>
        <div>신청기관 : 상시신청</div>
        <div>지원 유형 : 현금(감면)</div>
      </ContactInfo>

      <ApplyButton>신청하기</ApplyButton>

      <SupportDetails>
        <h3>구비서류 :</h3>
        <RequiredDocuments>
          <li>사회복지서비스 및 급여제공(변경) 신청서</li>
          <li>사회복지서비스 이용권(바우처) 제공(변경) 신청서</li>
          <li>
            아이아랑 카드발급 신청 및 개인신용정보의 조회·제공·이용 동의서
          </li>
        </RequiredDocuments>

        <h3>지원 내용 :</h3>
        <ul>
          <li>O 3~5세에 대해 교육비를 지급합니다.</li>
          <li>- 국공립 100,000원, 사립 280,000원</li>
          <li>O 3~5세에 대해 방과후과정비를 지급합니다.</li>
          <li>- 국공립 50,000원, 사립 70,000원</li>
          <li>
            O 사립유치원을 다니는 법정저소득층 유아에게 저소득층 유아학비를 추가
            지급합니다.
          </li>
          <li>
            - 사립 200,000원O 지원대상 : 국공립 및 사립유치원에 다니는 3~5세
            유아
          </li>
          <li>
            - '21년 1~2월생으로 유치원 입학을 희망하여 3세반에 취원한 유아도
            지원 대상
          </li>
          <li>
            취학대상 아동('17.1.1~12.31.출생)이 취학을 유예하는 경우, 유예한
            1년에 한하여 5세 유아무상교육비 지원(취학유예 통지서 제출)
          </li>
        </ul>

        <p>* 단, 지원기간은 3년을 초과할 수 없음.</p>
        <p>
          O 추가지원 : 저소득층 유아(유아학비 지원 대상 자격이 있고,
          사립유치원에 다니는 법정저소득층(기초생활수급자, 차상위계층, 한부모
          가정) 유아)
        </p>
      </SupportDetails>
    </PageContainer>
  );
};

export default SubsidyDetail;
