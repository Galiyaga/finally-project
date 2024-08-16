import React from "react";
import styled from 'styled-components'

const StyledButton = styled.button`
  width: 335px;
  height: 60px;
  border-radius: 5px;
  color: white;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
`;

const StyledButtonBig = styled.button`
  width: 380px;
  height: 60px;
  border-radius: 5px;
  color: white;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
`;

const Button = ({children, autorization}) => {
    return (
      <StyledButton
        style={{
          backgroundColor: "#5970FF",
          opacity: autorization ? "1" : "0.5",
        }}
      >
        {children}
      </StyledButton>
    );
}

const ButtonBig = ({ children, isActive }) => {
  return (
    <StyledButtonBig
      style={{
        backgroundColor: "#5970FF",
        opacity: isActive ? "1" : "0.5",
      }}
    >
      {children}
    </StyledButtonBig>
  );
};

export { ButtonBig, Button };

