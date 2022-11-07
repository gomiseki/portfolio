import React, { useState } from 'react';
import styled from 'styled-components';

const Conatiner = styled.div<{over:boolean}>`
  padding: 2px;
  border: 1px solid ${({ theme }) => theme.palette.borderDark};
  background-color: ${({ over, theme }) => over && theme.palette.fontColorLight};
  opacity: ${({ over }) => (over ? 1 : 0.8)};
`;

export default function GlittingBox({ children }:{children: React.ReactNode}) {
  const [over, setOver] = useState(false);

  return (
    <Conatiner
      over={over}
      onMouseOver={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {children}
    </Conatiner>
  );
}
