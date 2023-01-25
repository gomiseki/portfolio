/* eslint-disable no-nested-ternary */
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import styled from 'styled-components';

import plate from '../images/plate.png';
import GlittingBox from './glittingBox';
import useHorizontalScroll from '../hooks/useHorizontalScroll';
import CustomMD from './customMd';

const Container = styled.div`
  margin: auto;
  width: 750px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 5;
  display: flex;
`;

const Title = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DescImg = styled.div<{imgsrc:any}>`
  width: 140px;
  height: 140px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-size: cover;
  background-image: ${({ imgsrc }) => `url(${imgsrc})`};
`;

const Desc = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatusContainer = styled.div`
  flex: 3;
  overflow: auto;
  display: grid;
  grid-auto-columns: 150px;
  grid-auto-flow: column;
`;

const ThumbnailBox = styled.div<{init:boolean}>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 0 0 0 white;
  background: ${({ init }) => (init && 'linear-gradient(transparent, rgba(250, 250, 250, 0.384))')};
  &:hover{
    background: linear-gradient(transparent, rgba(250, 250, 250, 0.384));
  }
`;

const ContentImg = styled.img`
  width: 80px;
  height: 80px;
  display: block;
`;

const ContentLetter = styled.div`
  width: 80px;
  height: 80px;
  font-size: larger;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.fontSky};
  background-color: ${({ theme }) => theme.palette.borderDark};
`;

const Timebar = styled.div<{ edge: 'start' | 'end' | false }>`
  width: ${({ edge }) => (edge ? '50%' : '100%')};
  transform: ${({ edge }) => (edge && ((edge === 'start') ? 'translateX(50%)' : 'translateX(-50%)'))};
  height: 5px;
  background-color:hsl(197, 100%, 45%);
  text-align: center;
  position: relative;
`;

const Year = styled.p<{ edge: 'start' | 'end' | false }>`
  width: 50px;
  position: absolute;
  top: 50%;
  left: ${({ edge }) => (edge ? ((edge === 'start') ? '0' : '100%') : '50%')};
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.palette.fontSky};
  font-size: 13px;
  font-weight: bolder;
  padding-bottom: 3px;
`;

const TimePlate = styled.img<{ edge: 'start' | 'end' | false }>`
  width: 50px;
  position: absolute;
  top: 50%;
  left: ${({ edge }) => (edge ? ((edge === 'start') ? '0' : '100%') : '50%')};
  transform: translate(-50%, -50%);
`;

interface TimelineProps{
  name: string;
  major: string;
  period: string;
  description: string[];
  picture:string;
}

function Status({ timeline, time, setTime }:
  {timeline:TimelineProps[], time: number, setTime:React.Dispatch<React.SetStateAction<number>>}) {
  const horizontalRef = useHorizontalScroll();
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
    <StatusContainer ref={horizontalRef}>
      {
        timeline.map((datum, index) => (
          <ThumbnailBox init={time === index} onClick={() => { setTime(index); }}>
            <GlittingBox init={time === index}>
              {data.allFile.nodes
                .find((node: any) => node.name === datum.picture)
                ?.publicURL ? (
                  <ContentImg src={data.allFile.nodes
                    .find((node: any) => node.name === datum.picture)
                    .publicURL}
                  />
                ) : <ContentLetter>{datum.picture}</ContentLetter>}
            </GlittingBox>
            <Timebar edge={(index === 0 || index === timeline.length - 1)
              ? index === 0 ? 'start' : 'end'
              : false}
            >
              <TimePlate
                src={plate}
                edge={(index === 0 || index === timeline.length - 1)
                  ? index === 0 ? 'start' : 'end'
                  : false}
              />
              <Year edge={(index === 0 || index === timeline.length - 1)
                ? index === 0 ? 'start' : 'end'
                : false}
              >
                {datum.period.slice(0, 4)}

              </Year>
            </Timebar>
          </ThumbnailBox>
        ))
      }
    </StatusContainer>
  );
}

export default function HorizontalSlider({ timeline }:
  { timeline:
    TimelineProps[]
  }) {
  const [time, setTime] = useState(0);
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
    <Container>
      <Content>
        <Title>
          <h1 style={{ marginBottom: '10px', fontSize: '20px' }}>{timeline[time].name}</h1>
          {data.allFile.nodes
            .find((node: any) => node.name === timeline[time].picture)
            ?.publicURL && (
            <DescImg imgsrc={data.allFile.nodes
              .find((node: any) => node.name === timeline[time].picture)
              .publicURL}
            />
          )}
          <h2>{timeline[time].major}</h2>
          <h3>{timeline[time].period}</h3>
        </Title>
        <Desc>
          <CustomMD data={timeline[time].description} />
        </Desc>
      </Content>
      <Status timeline={timeline} time={time} setTime={setTime} />
    </Container>
  );
}
