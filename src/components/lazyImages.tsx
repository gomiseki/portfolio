import React, { CSSProperties } from 'react';

const videoStyle: CSSProperties = {
  width: '100%',
};

export default function LazyImages({ test }:{test:string}) {
  return test && ((test.split('.')[1] === 'mp4') || (test.split('.')[1] === 'webm'))
    ? (
      <video style={videoStyle} autoPlay loop muted>
        <source src={test} />
      </video>
    )
    : (
      <img style={videoStyle} src={test} alt="test" />
    );
}
