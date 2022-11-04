import React, { useState } from 'react';
import Layout from './layout';

function IndexPage() {
  const [num, setNum] = useState(0);

  return (
    <Layout pageTitle="Home Page">
      <main>
        <button onClick={() => setNum(num + 1)}>{num}</button>
      </main>
    </Layout>

  );
}

export default IndexPage;
