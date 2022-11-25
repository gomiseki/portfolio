import React, { CSSProperties, useState } from 'react';
import Loading from './loading';

const videoStyle: CSSProperties = {
  width: '100%',
};

export default function LazyImages({ test }: { test: string }) {
  const [isLoading, setIsLoading] = useState(true);
  if (test) {
    return (
      <>
        {isLoading && <Loading />}
        {((test.split('.')[1] === 'mp4') || (test.split('.')[1] === 'webm'))
          ? (
            <video onLoadedData={() => setIsLoading(false)} style={videoStyle} autoPlay loop muted>
              <source src={test} />
            </video>
          )
          : (
            <img style={videoStyle} src={test} alt="test" onLoad={() => setIsLoading(false)} />
          )}
      </>
    );
  }
  return null;
}
