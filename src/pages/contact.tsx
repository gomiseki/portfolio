import React, { useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import Layout from './layout';

import mission from '../images/mission.png';
import mobile from '../images/mobile.png';
import penguinKiss from '../images/penguin_kiss.png';

const Container = styled.div`
  height: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 200px;
  width: 35%;
`;

const Logo = styled.img`
  align-self: flex-end;
  width: 200px;
`;

const imgStyle: CSSProperties = {
  marginRight: '50px',
  width: '80px',
  height: '80px',
};

function Contact() {
  return (
    <Layout path="Contact">
      <Container>
        <h1 style={{ marginBottom: '50px' }}>Contact</h1>
        <List>
          <img style={imgStyle} src={mission} alt="email" />
          <h2>gomi.dev1755@gmail.com</h2>
        </List>
        <List>
          <img style={imgStyle} src={mobile} alt="phone" />
          <h2>010-6561-1755</h2>
        </List>
        <Logo src={penguinKiss} />
      </Container>
    </Layout>

  );
}

export default Contact;
