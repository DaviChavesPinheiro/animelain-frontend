import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingMessage?: string;
  backgroundColor?: string;
  color?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  loadingMessage,
  ...rest
}) => (
  <Container type="button" {...rest}>
    {loading ? loadingMessage || 'Carregando...' : children}
  </Container>
);

export default Button;
