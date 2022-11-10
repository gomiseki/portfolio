import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import caret from '../images/caret.png';
import tooltipCaret from '../images/tooltip-caret.png';

const fadein = keyframes`
  from {
        opacity: 0;
    }
  to {
      opacity: 1;
  }
`;

const Container = styled.div`
  position: relative;
`;

const Tip = styled.div<{direction?:'left'|'right'}>`
  position: absolute;
  top: 50%;
  left: ${({ direction }) => (direction === 'left' ? '0' : '100%')};
  transform: ${({ direction }) => (direction === 'left'
    ? 'translate(-100%, -50%) scaleX(-1)'
    : 'translate(0, -50%)')};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadein} 1s;
  z-index: 999;
`;

const Caret = styled.img<{special:boolean}>`
  display: block;
  transform: rotate(90deg);
  content: url(${(props) => (props.special ? tooltipCaret : caret)});
  margin-right: -5px;
`;

const Title = styled.h3`
  font-size: large;
  font-weight: 600;
  margin: 0 0 10px 0;
`;

const Text = styled.p < { special: boolean, direction?:'left'| 'right' }>`
  position:relative;
  background-color: black;
  color: ${(props) => props.theme.palette.fontColor};
  padding: ${(props) => (props.special ? '20px' : '10px')};
  transform: ${({ direction }) => direction === 'left' && 'scaleX(-1)'};
  font-size: 12px;
  width: max-content;
  border: 2px solid ${({ theme }) => theme.palette.borderMiddle};
`;

const DecoLine = styled.div`
  position: absolute;
  width: 100%;
  height: 80%;
  border: 1px solid ${({ theme }) => theme.palette.borderMiddle};
  top:50%;
  left: -7px;
  border-radius: 8%;
  transform:translateY(-50%);
  background-color: black;
  z-index: 998;
`;

export default function Tooltip({
  children, special, title, text, direction,
}
  : { children: React.ReactNode, special: boolean, title?:string, text: string, direction?:'left'|'right' }) {
  const [over, setOver] = useState(false);
  return (
    <Container onMouseOver={() => setOver(true)} onMouseLeave={() => setOver(false)}>
      {over && (
      <Tip direction={direction}>
        <Caret special={special} />
        <Text direction={direction} special={special}>
          {special && <DecoLine />}
          {title && <Title>{title}</Title>}
          <p>{text}</p>
        </Text>
      </Tip>
      )}
      {children}
    </Container>
  );
}

Tooltip.defaultProps = {
  title: '',
  direction: 'right',
};
