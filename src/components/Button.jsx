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
  margin-top: 70px;
`;

export default function Button({children, isActive}) {
    return (
      <StyledButton
        style={{
          backgroundColor: "#5970FF",
          opacity: isActive ? "1" : "0.5",
        }}
      >
        {children}
      </StyledButton>
    );
}