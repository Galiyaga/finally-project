import React from "react";
import styled from 'styled-components'

const StyledButton = styled.button`
  height: 60px;
  border-radius: 5px;
  color: white;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
`;


const Button = ({children, className}) => {
    return (
      <StyledButton
        className={className}
      >
        {children}
      </StyledButton>
    );
}

export { Button };

