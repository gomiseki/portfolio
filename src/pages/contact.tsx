import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from './layout';

import SEO from '../components/seo';

import penguinKiss from '../images/penguin_kiss.webp';

import contents from '../contents/contact.json';

const List = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 200px;
  width: 35%;
`;

const Container = styled.div`
  padding: 50px;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const EmoLogo = styled.img`
  width: 200px;
  position:absolute;
  bottom: 0;
  right: 50px;
`;

function Contact() {
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
    <Layout path="Contact">
      <Container>
        <h1>Contact</h1>
        {contents.data.map(({ name, value, image }) => (
          <List>
            <img
              alt={name}
              src={data.allFile.nodes
                .find((node: any) => node.name === image)
                .publicURL}
            />
            <h2>{value}</h2>
          </List>
        ))}
        <h2 style={{ alignSelf: 'flex-end', marginRight: '50px' }}>좋은 하루 되세요~</h2>
      </Container>
      <EmoLogo src={penguinKiss} />
    </Layout>

  );
}

export default Contact;

export function Head() {
  // @ts-ignore
  return <SEO />;
}
