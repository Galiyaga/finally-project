import React from "react";
import styled from 'styled-components'

const StyledButton = styled.button`
  height: 60px;
  border-radius: 5px;
  color: white;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  `;


const Button = ({children, className, disabled, onClick}) => {
    return (
      <StyledButton className={className} disabled={disabled} onClick={onClick}>
        {children}
      </StyledButton>
    );
}

export { Button };

