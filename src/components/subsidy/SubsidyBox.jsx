import React from "react";
import styled from "styled-components";

// 스타일 정의
const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background-color: ${({ eligible }) => (eligible ? "#e0f7e0" : "#f9f9f9")};
  margin: 16px;
  height: 270px;
  width: 400px;
  border-color: ${({ eligible }) => (eligible ? "green" : "#ccc")};
`;

const Badge = styled.div`
  background-color: green;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Text = styled.p`
  margin: 4px 0;
`;

// SubsidyBox 컴포넌트 정의
const SubsidyBox = ({
  title,
  institution,
  target,
  method,
  deadline,
  eligible,
}) => {
  return (
    <Card eligible={eligible}>
      {eligible && <Badge>이 혜택을 받을 수 있어요!</Badge>}
      <Title>{title}</Title>
      <Text>
        <strong>제공 기관:</strong> {institution}
      </Text>
      <Text>
        <strong>지원 대상:</strong> {target}
      </Text>
      <Text>
        <strong>신청 방법:</strong> {method}
      </Text>
      <Text>
        <strong>신청 기한:</strong> {deadline}
      </Text>
    </Card>
  );
};

export default SubsidyBox;
