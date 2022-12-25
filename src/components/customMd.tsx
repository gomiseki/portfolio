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
  font-size: small;
  font-weight: medium;
  flex-direction: column;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.fontColor};
  & a{
    color: ${({ theme }) => theme.palette.border};
    display: inline;
    text-decoration: underline;
    &:hover{
      color: ${({ theme }) => theme.palette.fontColorLight};
    }
  }
`;

function MsgToHref({ msg, pre }: {msg:string, pre:string}) {
  return (
    // eslint-disable-next-line no-useless-escape
    <MDUl dangerouslySetInnerHTML={{ __html: `${pre} ${msg.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a target="_blank" href="$2" title="$4">$1</a>')}` }} />
  );
}

export default function CustomMD({ data }: { data: string[] }) {
  return (
    <>
      {data.map((datum) => {
        const pre = datum.split('/')[0];
        const message = datum.split('/').slice(1).join('/');
        if (pre === 'title') {
          return (
            <MDTitle key={message}>{message}</MDTitle>
          );
        } if (pre === '·') {
          return (
            <MsgToHref key={message} pre={pre} msg={message} />
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
