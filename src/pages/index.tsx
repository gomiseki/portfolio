/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import Layout from './layout';

import aboutme from '../contents/aboutme.json';
import avatar from '../images/profile.webp';

import SEO from '../components/seo';

const Container = styled.div`
`;

const Intro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  font-weight: bolder;
  color: ${({ theme }) => theme.palette.fontSky};
  height: 100px;
`;

const Content = styled.div`
  box-sizing: border-box;
  height: 515px;
  padding: 20px 50px 80px 50px;
`;

const FlexBox = styled.div`
  display:flex;
  height: 100%;
`;

const AvatarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50%;
  border-radius: 50%;
`;

const Nav = styled.nav`
  display: flex;
  height: 25px;
  color: ${({ theme }) => theme.palette.fontColor};
  padding:0 30px;
  font-size: small;
`;

const Text = styled.div`
  display:flex;
  width: 100%;
  align-items: center;
  margin: 20px 0;
`;

const Title = styled.p`
  flex:4;
  font-size:x-large;
  justify-self: flex-end;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.fontColorLight};
`;

const Comment = styled.div`
  line-height: 20px;
  flex:5;
  font-size:medium;
  font-weight: normal;
  color:${({ theme }) => theme.palette.fontColor};
`;

const Tab = styled.div<{selected:boolean}>`
  cursor: pointer;
  margin: 0 10px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  border-bottom: ${({ theme, selected }) => selected && `1px solid ${theme.palette.fontColorLight}`};
`;

const itemStyle: CSSProperties = {
  padding: '20px',
  height: '375px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const EduContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
const Edu = styled.div`
  margin: 0 auto;
  height: 30%;
  width: 70%;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderMiddle};
`;

const Period = styled.div`
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
  font-weight: bolder;
  color: ${({ theme }) => theme.palette.fontColorLight};
`;

const School = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  flex:1;
  display: flex;
  align-items: flex-end;
  font-size: x-large;
  font-weight: bold;
  margin: 10px 0;
  color: ${({ theme }) => theme.palette.fontSky};
`;

const Major = styled.div`
  margin: 10px 0;
  flex:1;
  display: flex;
  align-items: flex-start;
  font-size: large;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.fontColorLight};
`;

const IntroContainer = styled.div`
  height: 100%;
  padding: 10px 150px;
  margin: auto;
  height: 100%;
  overflow: auto;
`;

const Slogan = styled.p`
  color: ${({ theme }) => theme.palette.fontColor};
  font-size: large;
  font-weight: bolder;
  margin-bottom: 50px;
`;

const MyType = styled.li`
  line-height: 50px;
  color: ${({ theme }) => theme.palette.fontColorLight};
  font-size: large;
  font-weight: bolder;
`;

function ContentRoute({ tabName }:{tabName:string}) {
  if (tabName === 'profile') {
    return (
      <FlexBox>
        <div style={{ ...itemStyle, flex: '3' }}><AvatarContainer><Avatar src={avatar} alt="avatar" /></AvatarContainer></div>
        <div style={{ ...itemStyle, flex: '5' }}>
          {Object.keys(aboutme[tabName]).map((data) => (
            <Text key={data}>
              {data !== 'Comment' && <Title>{data}</Title>}
              {
              // @ts-ignore
                <Comment dangerouslySetInnerHTML={{ __html: aboutme[tabName][data] }} />
            }
            </Text>
          ))}
        </div>
      </FlexBox>
    );
  }
  if (tabName === 'timeline') {
    return (
      <EduContainer>
        {aboutme.timeline.map((data) => (
          <Edu key={data.name}>
            <Period>{data.period}</Period>
            <School>
              <Name>{data.name}</Name>
              <Major>{data.major}</Major>
            </School>
          </Edu>
        ))}
      </EduContainer>
    );
  }
  if (tabName === 'introduce') {
    const data = aboutme.introduce;
    return (
      <IntroContainer>
        <Slogan>{data.slogan}</Slogan>
        <Slogan>저는...</Slogan>
        <ul style={{ listStyleType: 'circle', color: 'white', padding: '0 20px 40px 20px' }}>
          {data.myType.map((datum) => <MyType>{datum}</MyType>)}
        </ul>
        <Comment dangerouslySetInnerHTML={{ __html: data.comment }} />
      </IntroContainer>
    );
  }
  return null;
}

function IndexPage() {
  const [tab, setTab] = useState('');

  const onNavClick = (path:string) => {
    setTab(path);
  };

  useEffect(() => {
    if (aboutme && !tab) setTab(Object.keys(aboutme)[0]);
  }, [aboutme]);

  return (
    <Layout path="About me">
      <Container>
        <Nav>
          {Object.keys(aboutme).map((path) => (
            <Tab key={path} selected={tab === path} onClick={() => onNavClick(path)}>
              {path}
            </Tab>
          ))}
        </Nav>
        <Intro>국룰수집을 즐기는 개발자 Gomi의 포트폴리오 사이트입니다!</Intro>
        <Content>
          {tab && <ContentRoute tabName={tab} />}
        </Content>
      </Container>
    </Layout>
  );
}

export default IndexPage;

export function Head() {
  // @ts-ignore
  return <SEO />;
}
