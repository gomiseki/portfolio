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
  height: 50px;
`;

const Content = styled.div`
  box-sizing: border-box;
  height: 565px;
  padding: 20px 50px 50px 50px;
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
  flex:2;
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
  height: '455px',
  boxSizing: 'border-box',
  flex: '1',
  overflowY: 'auto',
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
  margin: 20px 0;
  color: ${({ theme }) => theme.palette.fontSky};
`;

const Major = styled.div`
  margin: 20px 0;
  flex:1;
  display: flex;
  align-items: flex-start;
  font-size: large;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.fontColorLight};
`;

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
            <Tab selected={tab === path} onClick={() => onNavClick(path)}>
              {path}
            </Tab>
          ))}
        </Nav>
        <Intro>안녕하세요~ 신입 개발자 Gomi의 포트폴리오 사이트입니다!</Intro>
        <Content>
          {tab && (tab === 'intro' ? (
            <FlexBox>
              <div style={itemStyle}><AvatarContainer><Avatar src={avatar} alt="avatar" /></AvatarContainer></div>
              <div style={itemStyle}>
                {Object.keys(aboutme[tab]).map((data) => (
                  <Text>
                    {data !== 'Comment' && <Title>{data}</Title>}
                    {
                    // @ts-ignore
                      <Comment dangerouslySetInnerHTML={{ __html: aboutme[tab][data] }} />
                    }
                  </Text>
                ))}
              </div>
            </FlexBox>
          ) : (
            <EduContainer>
              {aboutme.timeline.map((data) => (
                <Edu>
                  <Period>{data.period}</Period>
                  <School>
                    <Name>{data.name}</Name>
                    <Major>{data.major}</Major>
                  </School>
                </Edu>
              ))}
            </EduContainer>
          ))}
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
