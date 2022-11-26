import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const LtoR = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
`;

const Container = styled.div<{body:boolean}>`
  display: inline-flex;
  position:absolute;
  width: 100%;
  height: ${({ body }) => (body ? '100vh' : '306px')};
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: 30px;
  font-weight: bolder;
  margin: 30px;
  color: ${({ theme }) => theme.palette.fontSky};
`;

const AniText = styled.span<{delay: number}>`
  animation: ${LtoR} infinite 1s;
  animation-delay: ${({ delay }) => `0.${delay}s`};
`;

export default function Loading({ body = false }:{ body?: boolean }) {
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
    <Container body={body}>
      <video autoPlay loop muted>
        <source src={data.allFile.nodes.find((node:any) => node.name === 'loadingBook').publicURL} type="video/webm" />
      </video>
      <Text>{'Loading...'.split('').map((str, index) => <AniText delay={index}>{str}</AniText>)}</Text>
    </Container>
  );
}

Loading.defaultProps = {
  body: false,
};
