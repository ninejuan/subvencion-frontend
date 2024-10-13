import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 12px;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  height: 230px;
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

const Badge = styled.div`
  background-color: #22c55e;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: bold;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: bold;
  color: #333;
`;

const Text = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #666;
`;

function SubsidyBox({
  title,
  institution,
  target,
  method,
  deadline,
  serviceId,
  eligible,
}) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        navigate(`/detail/${serviceId}`);
      }}
    >
      {eligible && <Badge>이 혜택을 받을 수 있어요!</Badge>}
      <Title>{title}</Title>
      <div>
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
      </div>
    </Card>
  );
}

export default SubsidyBox;
