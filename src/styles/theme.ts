import { DefaultTheme } from 'styled-components';

const size = {
  mobile: '767px',
  desktop: '768px',
};

const theme: DefaultTheme = {
  palette: {
    border: '#8d6d2d',
    borderDark: '#32281e',
    fontColor: '#cdbe91',
    fontColorLight: '#ede3cf',
  },

  devices: {
    desktop: `min-width: ${size.desktop}`,
    mobile: `max-width: ${size.mobile}`,
  },
};

export default theme;