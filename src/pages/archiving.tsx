import React from 'react';
import styled from 'styled-components';
import { graphql, Link, useStaticQuery } from 'gatsby';

import Layout from './layout';
import GlittingBox from '../components/glittingBox';
import SEO from '../components/seo';

import teemo from '../images/teemoCheers.webp';

import contents from '../contents/archiving.json';

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
`;

const ContentBox = styled.div<{backgroundImage:string, backgroundColor:string}>`
  width: 370px;
  height: 250px;
  padding: 20px 30px;
  background-image: url(${(props) => props.backgroundImage});
  background-color: ${(props) => props.backgroundColor};
  background-size: cover;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  filter: invert(89%) sepia(25%) saturate(381%) hue-rotate(212deg) brightness(110%) contrast(97%);
`;

const Name = styled.span`
  color: ${({ theme }) => theme.palette.fontColorLight};
  font-size: 40px;
  font-weight: bolder;
`;

const EmoLogo = styled.img`
  width: 200px;
  position:absolute;
  bottom: 0;
  right: 0;
  right: 50px;
`;

const Description = styled.pre`
  color: #f7f8fc;
  font-weight: medium;
  margin: 15px;
  line-height: 150%;
`;

function Archiving() {
  const data = useStaticQuery(graphql`
   query MyQuery {
    allFile {
      nodes {
        name
        publicURL
      }
    }
  }
  `);

  return (
    <Layout path="Archiving">
      <Container>
        <h1 style={{ marginBottom: '50px' }}>Archiving</h1>
        <Content>
          {contents.data.map((content) => (
            <GlittingBox key={content.name}>
              <Link to={content.link} target="_blank">
                <ContentBox
                  backgroundColor={content.backgroundColor}
                  backgroundImage={content.backgroundImage && data.allFile.nodes
                    .find((node: any) => node.name === content.backgroundImage)
                    .publicURL}
                >
                  <div style={{
                    width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '40px',
                  }}
                  >
                    <Logo
                      alt={content.logoImage}
                      src={
                        data.allFile.nodes
                          .find((node: any) => node.name === content.logoImage)
                          .publicURL
                      }
                    />
                    <Name>{content.name}</Name>
                  </div>
                  <Description>{content.description}</Description>
                </ContentBox>
              </Link>
            </GlittingBox>
          ))}
        </Content>
        <EmoLogo alt="teemo" src={teemo} />
      </Container>
    </Layout>

  );
}

export default Archiving;

export function Head() {
  // @ts-ignore
  return <SEO />;
}
