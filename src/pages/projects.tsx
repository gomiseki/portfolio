/* eslint-disable max-len */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { useStaticQuery, graphql } from 'gatsby';
import Layout from './layout';
import TechBox from '../components/techBox';
import Tooltip from '../components/tooltip';
import Works from '../components/workBox';
import Work from '../components/projectBox';
import SEO from '../components/seo';

import projects from '../contents/projects.json';

import all from '../images/all.png';
import { ProjectType } from '../types/projectType';

const classify:{[index:string]:any} = {
  frontend: ['HTML', 'CSS', 'Javascript', 'Typescript', 'GatsbyJS', 'ReactJS', 'ReactQuery', 'Recoil', 'Redux', 'StyledComponents', 'Vite'],
  backend: ['Express', 'GraphQL', 'MongoDB'],
  desktop: ['ElectronJS'],
  version: ['Github', 'Gitlab'],
  deploy: ['AWS', 'Docker'],
  communication: ['Figma', 'Postman'],
  etc: ['SocketIO', 'WebRTC', 'RiotAPI'],
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Nav = styled.nav`
  width: 50px;
  padding-top: 18px;
`;

const Ul = styled.ul`
  width:100%;
  height: 100%;
`;

const TabList = styled.li<{selected:{skill:string, project:string}}>`
  width: 100%;
  height: 30px;
  display:flex;
  justify-content: center;
  align-items: center;
  border-left: ${({ theme, selected }) => (!selected.skill && !selected.project) && `4px solid ${theme.palette.border}`};
`;

const All = styled.img<{over:boolean}>`
  opacity: ${(props) => (props.over ? '1' : '0.5')};
  cursor: pointer;
`;

const BoxList = styled.div`
  box-sizing: border-box;
  width: 350px;
  height: 100%;
  position: relative;
`;

const Contents = styled.div`
  width: 650px;
  position: relative;
`;

const ProjectName = styled.p`
  height: 80px;
  display:flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.fontColorLight};
  font-size: x-large;
  font-weight: 900;
`;

const Projects = styled.div<{selected: string}>`
  padding: 0 0 20px 20px;
  margin-bottom: 20px;
  overflow: auto;
  height: 520px;
  display: ${({ selected }) => !selected && 'grid'};
  row-gap: ${({ selected }) => !selected && '10px'};
  grid-template-columns:${({ selected }) => !selected && 'repeat(3,1fr)'}; 
  justify-content: ${({ selected }) => !selected && 'space-between'};
`;

const Shadow = styled.div`
  position: absolute;
  bottom: 0;
  width: 650px;
  height: 40px;
  background-color: black;
  z-index: 997;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`;

const Tech = styled.div`
  box-sizing: border-box;
  height: 100%;
`;

const TopShadow = styled.div`
  position: absolute;
  top:0;
  width: 100%;
  height: 50px;
  background-color: black;
  z-index: 997;
  -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`;

const BottomShadow = styled.div`
  position: absolute;
  bottom: 80px;
  width: 100%;
  height: 50px;
  background-color: black;
  z-index: 997;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`;

const TechGrid = styled.div`
  margin: 15px 0;
  display: grid;
  grid-auto-rows: 69px;
  row-gap: 15px;
  grid-template-columns: repeat(4, 69px);
  justify-content: space-between;
`;

const Classify = styled.div`
`;

const Total = styled.div`
  position: absolute;
  bottom:0;
  padding: 5px;
  width: 350px;
  height: 80px;
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => theme.palette.border};
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const TotalInfo = styled.div`
  width: 20px;
  height: 80%;
  text-align: center;
  color: ${({ theme }) => theme.palette.fontColor};
`;

const TotalName = styled.div`
  font-size: x-large;
  font-weight: bolder;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const TotalNumber = styled.div`
  font-size: small;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h4`
  padding: 5px 0;
  margin-bottom: 5px;
  font-size: medium;
  color: ${({ theme }) => theme.palette.fontColorLight};
  font-weight: bold;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border};
`;

function Project() {
  const gridKey = useRef(0);
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

  const [tabOver, setTabOver] = useState(false);
  const [selected, setSelected] = useState({ skill: '', project: '' });
  const [techData, setTechData] = useState<{ [index: string]: any }>({});
  const [projectData, setProjectData] = useState<ProjectType[]>([]);
  const [totalData, setTotalData] = useState<{ [index: string]: any }>({
    frontend: 0,
    backend: 0,
    desktop: 0,
    etc: 0,
    communication: 0,
    version: 0,
    deploy: 0,
  });

  const onClickSkill = (skill:string) => {
    setSelected({ skill, project: '' });
  };

  const onClickProject = (project:string) => {
    setSelected({ skill: '', project });
  };

  useEffect(() => {
    if (data) {
      const techObj:{[index:string]:any} = {};
      const projectArr = selected.skill ? projects.data.filter((project) => project.tech.includes(selected.skill)) : [...projects.data];
      const totalObj:{[index: string]: any} = {
        frontend: 0,
        backend: 0,
        desktop: 0,
        etc: 0,
        communication: 0,
        version: 0,
        deploy: 0,
      };
      const baseTech = selected.project
        ? projects.data.filter((project) => project.name === selected.project).map((value) => value.tech)
        : projects.data.map((value) => value.tech);
      baseTech.join().split(',').forEach((techName) => {
        if (techName in techObj) {
          techObj[techName].num += 1;
        } else {
          techObj[techName] = { num: 1, src: data.allFile.nodes.find((node: any) => node.name === techName).publicURL };
        }
      });
      Object.keys(techObj).forEach((name) => {
        Object.keys(classify).forEach((value) => {
          if (classify[value].includes(name)) totalObj[value] += 1;
        });
      });
      setTechData(techObj);
      setProjectData(projectArr);
      setTotalData(totalObj);
    }
  }, [selected]);

  return (
    <Layout path="Projects">
      <Container>
        <Nav>
          <Ul>
            <TabList selected={selected}>
              <Tooltip special={false} text="프로젝트 모아보기">
                <All
                  over={tabOver}
                  onMouseOver={() => setTabOver(true)}
                  onMouseLeave={() => setTabOver(false)}
                  src={all}
                  alt="all"
                  onClick={() => setSelected({ skill: '', project: '' })}
                />
              </Tooltip>
            </TabList>
          </Ul>
        </Nav>
        <BoxList>
          <TopShadow />
          <Tech>
            <div style={{
              height: '510px', overflow: 'hidden auto', margin: '30px 0 20px 0', padding: '0 14px 0 11px',
            }}
            >
              {Object.keys(classify).map((key) => (
                <Classify>
                  <Title>{key}</Title>
                  <TechGrid>
                    {Object.keys(techData).map((name: string, index) => {
                      if (!index)gridKey.current = 0;
                      if (classify[key].includes(name)) gridKey.current += 1;
                      return classify[key].includes(name)
                        && <Tooltip direction={gridKey.current % 4 === 0 ? 'left' : 'right'} special={false} text={name}><TechBox selected={name === selected.skill} onClick={() => { onClickSkill(name); }} src={techData[name].src} /></Tooltip>;
                    })}
                  </TechGrid>
                </Classify>
              ))}
            </div>
          </Tech>
          <BottomShadow />
          <Total>
            {Object.keys(totalData).map((name) => (
              <TotalInfo>
                <Tooltip special={false} text={name}>
                  <TotalName>{name.split('')[0].toUpperCase()}</TotalName>
                </Tooltip>
                <TotalNumber>{totalData[name]}</TotalNumber>
              </TotalInfo>
            ))}
          </Total>
        </BoxList>
        <Contents>
          <ProjectName>
            {selected.project ? selected.project : `${selected.skill} 프로젝트 모음`}
          </ProjectName>
          <Projects selected={selected.project}>
            {selected.project
              ? (
                <Work
                  data={projects.data.find((value) => value.name === selected.project)!}
                  test={data.allFile.nodes
                    .find((node: any) => node.name === projects.data.find((value) => value.name === selected.project)?.test)
                    ?.publicURL}
                />
              )
              : projectData.map((info) => (
                <Works
                  data={info}
                  onClick={() => { onClickProject(info.name); }}
                  src={data.allFile.nodes.find((node: any) => node.name === info.logo).publicURL}
                />
              ))}
          </Projects>
          <Shadow />
        </Contents>
      </Container>
    </Layout>
  );
}

export default Project;

export function Head() {
  // @ts-ignore
  return <SEO />;
}
