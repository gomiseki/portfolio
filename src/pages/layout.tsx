import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import Draggable from 'react-draggable';
import styled, { CSSProperties, ThemeProvider, keyframes } from 'styled-components';
import GlobalStyle from '../styles/global-styles';
import theme from '../styles/theme';

import client from '../images/client.webp';
import background from '../images/screenshot.webp';
import logo from '../images/logo.webm';
import play from '../images/play.webm';
import navtip from '../images/navtip.png';
import profilePlate from '../images/profilePlate.png';
import profile from '../images/profile.webp';

import SEO from '../components/seo';

interface LayoutProps{
  children: React.ReactNode,
  path: string,
}

const navContent = [
  {
    name: 'About me',
    selected: false,
    link: '/',
  },
  {
    name: 'Projects',
    selected: false,
    link: '/projects',
  },
  {
    name: 'Archiving',
    selected: false,
    link: '/archiving',
  },
  {
    name: 'Contact',
    selected: false,
    link: '/contact',
  },
];

const Background = styled.div`
  overflow: auto;
  background-image: url(${background});
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Client = styled.main`
  width: 1280px;
  height: 720px;
  margin-left: 2px;
  background-image: url(${client});
  border-top: ${(props) => `3px solid ${props.theme.palette.border}`};
`;

const fadein = keyframes`
  from {
        opacity: 0;
    }
  to {
      opacity: 1;
  }
`;

const Nav = styled.nav`
  box-sizing: border-box;
  display:flex;
  width: 100%;
  height: 80px;
  border-bottom: ${(props) => `1px solid ${props.theme.palette.border}`};
`;

const StartVideo = styled.div`
  position: relative;
  width: 215px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Logo = styled.p`
  color: ${(props) => props.theme.palette.fontColorLight};
  position: absolute;
  right: 80px;
  font-weight: bold;
`;

const LogoContainer = styled.div`
  position: absolute;
  left: 35px;
  width:155px;
  height:38px;
  border: 1px solid ${(props) => props.theme.palette.borderDark};
`;

const logoStyle: CSSProperties = {
  position: 'absolute',
  left: '15px',
};

const playStyle: CSSProperties = {
  position: 'absolute',
  left: '50px',
};

const activeStyle: CSSProperties = {
  color: theme.palette.fontColorLight,
  background: 'linear-gradient(transparent, rgba(255, 249, 232, 0.1))',
};

const NavLi = styled.li`
  position: relative;
  font-size: 22px;
  font-weight: bolder;
  text-align: center;
  height: 100%;
`;

const Tip = styled.img`
  width: 30px;
  position:absolute;
  top:0;
`;

const NavLink = styled(Link)`
  padding: 0 12px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.theme.palette.fontColor)};
  &:hover{
    color: ${(props) => (props.theme.palette.fontColorLight)};
    background: linear-gradient(transparent, rgba(255, 249, 232, 0.1));
  }
`;

const Profile = styled.div`
  position:relative;
  width: 225px;
  display: flex;
  background-color:  black;
`;

const ProfilePlate = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 100%;
  z-index: 1;
`;

const ProfileIcon = styled.img`
  position:absolute;
  top: 15px;
  left: 15px;
  width: 45px;
  height: 45px;
  border-radius: 100%;
  z-index: 0;
`;

const LV = styled.p`
  font-size: small;
  font-weight: 600;
  position:absolute;
  top: 55px;
  left: 35px;
  z-index: 2;
  color: ${(props) => props.theme.palette.fontColor};
`;

const Description = styled.div`
  padding-top: 25px;
  padding-left: 5px;
`;

const Name = styled.p`
  color: ${(props) => props.theme.palette.fontColorLight};
  font-size: 15px;
  font-weight: bolder;

`;

const State = styled.span`
  display: flex;
  color: green;
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
`;

const Light = styled.div`
  background-color: green;
  width: 8px;
  height: 8px;
  margin-right: 3px;
  border: 2px solid lightgreen;
  border-radius: 100%;
`;

const Content = styled.div`
  display: flex;
  height: 640px;
`;

const Main = styled.main`
  position: relative;
  width: 1060px;
  animation: ${fadein} 1s;
`;

const Side = styled.aside`
  background-color: black;
  background-size: cover;
  width: 225px;
  height: 100%;
`;

function Layout({ children, path = 'About me' }: LayoutProps) {
  const [navList, setnavList] = useState(navContent);
  const [, setPosition] = useState({ x: 0, y: 0 });

  const trackPos = (data: any) => {
    setPosition({ x: data.x, y: data.y });
  };

  useEffect(() => {
    setnavList(navList.map((list) => ({ ...list, selected: Boolean(list.name === path) })));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Background>
        <Draggable bounds="parent" handle="#handle" onDrag={(e, data) => trackPos(data)}>
          <Client>
            <Nav id="handle">
              <ul style={{ display: 'flex', height: '100%', width: '1060px' }}>
                <li style={{
                  width: '215px', display: 'flex', height: '100%', alignItems: 'center',
                }}
                >
                  <StartVideo>
                    <LogoContainer />
                    <video style={logoStyle} autoPlay loop muted>
                      <source src={logo} type="video/webm" />
                    </video>
                    <video style={playStyle} autoPlay loop muted>
                      <source src={play} type="video/webm" />
                    </video>
                    <Logo>Gomi</Logo>
                  </StartVideo>
                </li>
                {navList.map(({ name, link, selected }) => (
                  <NavLi key={name}>
                    <NavLink
                      to={link}
                      activeStyle={activeStyle}
                    >
                      {selected && <Tip src={navtip} alt={name} />}
                      {name}
                    </NavLink>
                  </NavLi>
                ))}
              </ul>
              <Profile>
                <ProfilePlate src={profilePlate} alt="plate" />
                <ProfileIcon src={profile} alt="profile" />
                <LV>1</LV>
                <Description>
                  <Name>김주현</Name>
                  <State>
                    <Light />
                    구직중
                  </State>
                </Description>
              </Profile>
            </Nav>
            <Content>
              <Main>
                {children}
              </Main>
              <Side />
            </Content>
          </Client>
        </Draggable>
      </Background>
    </ThemeProvider>
  );
}

export default Layout;

export function Head() {
  // @ts-ignore
  return <SEO />;
}
