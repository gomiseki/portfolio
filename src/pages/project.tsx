import React, { useState } from 'react';
import Layout from './layout';

function Project() {
  const [num, setNum] = useState(0);

  return (
    <Layout path="Project">
      <main>
        <button onClick={() => setNum(num + 1)}>{num}</button>
      </main>
    </Layout>

  );
}

export default Project;
