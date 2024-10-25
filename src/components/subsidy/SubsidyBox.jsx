import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 카드 컴포넌트 스타일링
const Card = styled.div`
  border-radius: 12px;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  height: 255px;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

// 혜택 배지 스타일링
const Badge = styled.div`
  background-color: #ffa0a0;
  color: white;
  padding: 4px 4px;
  border-radius:4px;
  display: inline-block;
  margin-bottom: 0px;
  font-size: 12px;
  font-weight: bold;
  width: 45%;
  text-align: center;
`;

// 카드 제목 스타일링
const CardTitle = styled.h3`
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 7px;
  font-weight: bold;
  color: #333;
`;

// 카드 텍스트 스타일링
const Text = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #666;
`;

function truncateText(text = "", maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function SubsidyBox({
  title,
  institution,
  target,
  method,
  deadline,
  serviceId,
  eligible,
}) {
  const maxLength = 50;
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/detail/${serviceId}`)}>
      {eligible && <Badge>이 혜택을 받을 수 있어요!</Badge>}
      <CardTitle>{title}</CardTitle>
      <div>
        <Text>
          <strong>제공 기관:</strong> {truncateText(institution, maxLength)}
        </Text>
        <Text>
          <strong>지원 대상:</strong> {truncateText(target, maxLength)}
        </Text>
        <Text>
          <strong>신청 방법:</strong> {truncateText(method, maxLength)}
        </Text>
        <Text>
          <strong>신청 기한:</strong> {truncateText(deadline, maxLength)}
        </Text>
      </div>
    </Card>
  );
}

export default SubsidyBox;
