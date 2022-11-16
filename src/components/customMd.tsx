import React from 'react';
import styled from 'styled-components';

const MDTitle = styled.h4`
  width: 100%;
  color: ${({ theme }) => theme.palette.fontColorLight};
  font-size: large;
  font-weight: bolder;
  margin: 10px;
`;

const MDOl = styled.h4`
  margin: 20px;
  font-size: medium;
  font-weight: bold;
  width: 100%;
  line-height: 30px;
  color: ${({ theme }) => theme.palette.fontColor};
`;

const MDUl = styled.h4`
  margin: 10px;
  width: 100%;
  display: flex;
  font-size: small;
  font-weight: medium;
  flex-direction: column;
  line-height: 20px;
  align-items: flex-start;
  color: ${({ theme }) => theme.palette.fontColor};
`;

export default function CustomMD({ data }: { data: string[] }) {
  return (
    <>
      {data.map((datum) => {
        const pre = datum.split('/')[0];
        const message = datum.split('/')[1];
        if (pre === 'title') {
          return (
            <MDTitle key={message}>{message}</MDTitle>
          );
        } if (pre === '·') {
          return (
            <MDUl key={message}>{`· ${message}`}</MDUl>
          );
        } if (Number.isInteger(Number(pre))) {
          return (
            <MDOl key={message}>{`${pre} ${message}`}</MDOl>
          );
        }
        return message;
      })}
    </>
  );
}
