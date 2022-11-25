import React from 'react';
import { render } from '@testing-library/react';
import CustomMd from '../customMd';


describe('<CustomMd>',()=>{
  it('should render Counter', () => {
    render(<CustomMd />);
  });
});
