import styled, { css } from "styled-components";

const ButtonContainer = styled.div`
  width: 30%;
  height: 50px;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.$customStyle}
  ${(props) => props.$buttonStyle}
  cursor: pointer;
`;

const ButtonText = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  margin-bottom: 2px;
`;

const getButtonStyle = (type) => {
  if (type == "btn") {
    return css`
      background-color: #f06464;
      color: #000;
    `;
  } else {
    return css`
      background-color: transparent;
      color: #4e5968;
    `;
  }
};

function Button({ children, onClick, style, type = "btn" }) {
  return (
    <ButtonContainer
      $customStyle={style}
      onClick={onClick}
      $buttonStyle={getButtonStyle(type)}
    >
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
}

export default Button;
