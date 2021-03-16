import React, { ButtonHTMLAttributes } from 'react';
import { Loading } from '../Loading';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  active?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" disabled={loading} {...rest}>
    {children}
    {loading && <Loading />}
  </Container>
);

export default Button;
