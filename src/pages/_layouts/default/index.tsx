import React from 'react';
import Header from '../../../components/Header';

import { Wrapper, Body } from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Body>{children}</Body>
    </Wrapper>
  );
};

export default DefaultLayout;
