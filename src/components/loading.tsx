import React from 'react';
import styled from 'styled-components';
import loading from '../images/loadingBook.webm';

const Container = styled.div<{body:boolean}>`
  display: inline-flex;
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

export default function Loading({ body = false }:{ body?: boolean }) {
  return (
    <Container body={body}>
      <video autoPlay loop muted>
        <source src={loading} type="video/webm" />
      </video>
      <Text>Loading...</Text>
    </Container>
  );
}

Loading.defaultProps = {
  body: false,
};
