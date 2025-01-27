import styled, { keyframes } from "styled-components"

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
  }

  50% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
  }

  100% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
  }
`

const SpinnerWrapper = styled.div`
  width: 32px;
  height: 32px;
  animation: ${spinnerAnimation} 2s infinite ease;
  transform-style: preserve-3d;
`

const SpinnerFace = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  border: 2px solid #ffffff;

  &:nth-of-type(1) {
    transform: translateZ(-22px) rotateY(180deg);
  }

  &:nth-of-type(2) {
    transform: rotateY(-270deg) translateX(50%);
    transform-origin: top right;
  }

  &:nth-of-type(3) {
    transform: rotateY(270deg) translateX(-50%);
    transform-origin: center left;
  }

  &:nth-of-type(4) {
    transform: rotateX(90deg) translateY(-50%);
    transform-origin: top center;
  }

  &:nth-of-type(5) {
    transform: rotateX(-90deg) translateY(50%);
    transform-origin: bottom center;
  }

  &:nth-of-type(6) {
    transform: translateZ(22px);
  }
`

export function Spinner() {
    return (
        <SpinnerWrapper>
            <SpinnerFace />
            <SpinnerFace />
            <SpinnerFace />
            <SpinnerFace />
            <SpinnerFace />
            <SpinnerFace />
        </SpinnerWrapper>
    )
}

