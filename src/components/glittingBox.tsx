import React from 'react';
import styled from 'styled-components';

const Conatiner = styled.div<{over:boolean}>`
  padding: 2px;
  border: 1px solid ${({ theme }) => theme.palette.borderDark};
  opacity: ${({ over }) => (over ? '1' : '0.8')};
  background-color: ${({ theme, over }) => over && theme.palette.fontColorLight};
  &:hover{
    opacity: 1;
    background-color: ${({ theme }) => theme.palette.fontColorLight};
  }
`;

export default function GlittingBox({ children, init = false }:
  {children: React.ReactNode, init?:boolean}) {
  return (
    <Conatiner over={init}>
      {children}
    </Conatiner>
  );
}

GlittingBox.defaultProps = {
  init: false,
};
