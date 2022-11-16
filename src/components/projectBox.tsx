import React, { Suspense } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { Link } from 'gatsby';
import { ProjectType } from '../types/projectType';

import CustomMD from './customMd';
import Loading from './loading';

import github from '../images/tech/Github.svg';
import velog from '../images/velog.svg';
import electron from '../images/tech/ElectronJS.svg';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box; 
  padding: 40px;
  font-weight: bold;
`;

const videoStyle:CSSProperties = {
  width: '100%',
};

const Description = styled.p`
  margin: 10px;
  color: ${({ theme }) => theme.palette.fontColor};
  font-size: large;
  line-height: 30px; 
`;

const Title = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 10px 20px;
  color: ${({ theme }) => theme.palette.fontColorLight};
  font-size: x-large;
  font-weight: bolder;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.fontColor};
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  margin: 20px 0;
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  margin-right: 30px;
`;

const Button = styled.div<{tech:string}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.fontSky};
  font-weight: bolder;
  border: 1px solid ${({ theme }) => theme.palette.fontColor};
  border-radius: 5px;
  margin-right: 30px;
  padding: 5px;
  cursor: pointer;
  opacity: 0.7;
  &:hover{
    opacity: 1;
    border: 1px solid ${({ theme }) => theme.palette.fontColorLight};
    background-color: ${({ tech }) => (
    // eslint-disable-next-line no-nested-ternary
    tech === 'github' ? 'black' : tech === 'velog' ? '#20C997' : '#47848F'
  )};
  }
`;

const Logo = styled.img`
  height: 70%;
  margin-right: 5px;
  filter: invert(89%) sepia(25%) saturate(381%) hue-rotate(212deg) brightness(110%) contrast(97%);
`;

const Making = styled.p`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  color: ${({ theme }) => theme.palette.fontColorLight};
`;
export default function Work({ data, test }: { data: ProjectType, test:string }) {
  return (
    <Container>
      <Suspense fallback={<Loading />}>
        {test && ((test.split('.')[1] === 'mp4') || (test.split('.')[1] === 'webm')
          ? (
            <video style={videoStyle} autoPlay loop muted>
              <source src={test} />
            </video>
          )
          : (
            <img style={videoStyle} src={test} alt="" />
          ))}
      </Suspense>
      <Description>{data.description}</Description>
      <ButtonContainer>
        {data.source
        && (
          <StyledLink to={data.source} target="_blank">
            <Button tech="github">
              <Logo src={github} alt="github" />
              Readme
            </Button>
          </StyledLink>
        )}
        {data.archive
          && (
          <StyledLink to={data.archive} target="_blank">
            <Button tech="velog">
              <Logo src={velog} alt="velog" />
              Archiving
            </Button>
          </StyledLink>
          )}
        {data.download
          && (
          <StyledLink to={data.download} target="_blank">
            <Button tech="electron">
              <Logo src={electron} alt="electron" />
              Download
            </Button>
          </StyledLink>
          )}
      </ButtonContainer>
      <Title>[Role]</Title>
      <CustomMD data={data.role} />
      <Title>[Experience]</Title>
      <CustomMD data={data.experience} />
      <Making>{`${data.period} / ${data.team}`}</Making>
    </Container>
  );
}
