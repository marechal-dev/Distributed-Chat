import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  title: string;
}

const Input: React.FC<InputProps> = ({ label, title, ...rest }) => {
  return (
    <Container>
      <label htmlFor={label}>{title}</label>
      <input {...rest} />
    </Container>
  );
};

export default Input;