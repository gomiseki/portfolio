import React, { useState } from 'react';
import styled from 'styled-components';
import { ProjectType } from '../types/projectType';

const Container = styled.div<{ over: boolean }>`
  box-sizing: border-box;
  padding: 10px;
  width: 200px;
  height: 245px;
  border: 1px solid ${({ theme, over }) => (over ? theme.palette.fontColor : theme.palette.borderDark)};
  opacity: ${({ over }) => (over ? 1 : 0.8)};
`;

const Logo = styled.div`
  margin: 0 auto;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  height: 95px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
`;

const Name = styled.div`
  flex:1;
  display:flex;
  align-items: center;
  color:${({ theme }) => theme.palette.fontColorLight};
  font-size: middle;
  font-weight: bolder;
`;

const Period = styled.div`
  flex:1;
  display:flex;
  align-items: flex-start;
  color:${({ theme }) => theme.palette.fontColor};
  font-size: small;
`;

export default function Work({ data, src, onClick }
  :{data:ProjectType, src:string, onClick:()=>void}) {
  const [over, setOver] = useState(false);
  return (
    <Container
      onClick={onClick}
      over={over}
      onMouseOver={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      <Logo>
        <img style={{ width: '100%', maxHeight: '150px', filter: 'invert(85 %) sepia(28%) saturate(365%) hue-rotate(5deg) brightness(89%) contrast(81%)' }} alt="logo" src={src} />
      </Logo>
      <Info>
        <Name>{data.name}</Name>
        <Period>{data.period}</Period>
      </Info>
    </Container>
  );
}
