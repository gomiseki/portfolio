import React from 'react';
import styled from 'styled-components';

import Layout from './layout';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid white;
`;

function Project() {
  return (
    <Layout path="Projects">
      <Container />
    </Layout>

  );
}

export default Project;
