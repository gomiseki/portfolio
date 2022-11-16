import React, { useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import permanent from '../images/permanent.png';
import permanentHover from '../images/permanent_hover.png';
import loop from '../images/loop.webm';

const Container = styled.div<{src:string, over:boolean, selected?:boolean}>`
  background-image: url(${(props) => props.src});
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.selected || props.over ? '1' : '0.6')};
  width: 69px;
  height: 69px;
  position: relative;
`;

const Icon = styled.img`
  color: white;
  width: 70%;
  height: 70%;
  filter: invert(85%) sepia(28%) saturate(365%) hue-rotate(5deg) brightness(89%) contrast(81%);
`;

const playStyle:CSSProperties = {
  position: 'absolute',
};

export default function TechBox({ src, onClick, selected }
  :{src:string, onClick:()=>void, selected?:boolean}) {
  const [over, setOver] = useState(false);

  return (
    <Container
      over={over}
      onClick={onClick}
      selected={selected}
      src={over ? permanentHover : permanent}
      onMouseOver={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {selected && (
        <video style={playStyle} autoPlay loop muted>
          <source src={loop} type="video/webm" />
        </video>
      )}
      <Icon src={src} loading="lazy" alt={src} />
    </Container>

  );
}

TechBox.defaultProps = {
  selected: false,
};
