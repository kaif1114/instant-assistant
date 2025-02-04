import React from "react";
import styled from "styled-components";

interface TypingIndicatorProps {
  size?: number;
  color?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  size = 30,
  color = "#d62d20",
}) => {
  return (
    <StyledWrapper size={size} color={color}>
      <div className="spinner">
        <span />
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<TypingIndicatorProps>`
  .spinner {
    --gap: ${(props) => (props.size ? props.size / 6 : 5)}px;
    --clr: ${(props) => props.color};
    --height: ${(props) => (props.size ? props.size / 2 : 15)}px;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--gap);
  }

  .spinner span {
    background: var(--clr);
    width: ${(props) => (props.size ? props.size / 5 : 6)}px;
    height: var(--height);
    animation: grow 1s ease-in-out infinite;
  }

  .spinner span:nth-child(2) {
    animation: grow 1s ease-in-out 0.15s infinite;
  }

  .spinner span:nth-child(3) {
    animation: grow 1s ease-in-out 0.3s infinite;
  }

  .spinner span:nth-child(4) {
    animation: grow 1s ease-in-out 0.475s infinite;
  }

  @keyframes grow {
    0%,
    100% {
      transform: scaleY(1);
    }

    50% {
      transform: scaleY(1.8);
    }
  }
`;

export default TypingIndicator;
