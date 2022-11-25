import React from 'react';
import { render } from '@testing-library/react';

import GlittingBox from '../glittingBox';


describe('<GlittingBox>',()=>{
  test('should render Counter', () => {
    render(<GlittingBox />);
  });
});
