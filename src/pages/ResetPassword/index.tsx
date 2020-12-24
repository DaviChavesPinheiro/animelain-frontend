import React, { useCallback, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import AnimeLainLogo from '../../assets/AnimeLain.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Logo } from './styles';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const location = useLocation();

  const handleSignIn = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string()
            .required('Senha de confirmação obrigatória')
            .oneOf([Yup.ref('password')], 'Confimação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const token = location.search.replaceAll('?token=', '');

        await api.post('/password/reset', {
          password: data.password,
          token,
        });

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [history, location.search],
  );

  return (
    <Container>
      <Logo src={AnimeLainLogo} />
      <Content>
        <Form onSubmit={handleSignIn} ref={formRef}>
          <h1>Entrar</h1>

          <Input
            name="password"
            type="password"
            placeholder="Nova senha"
            icon={FiLock}
          />
          <Input
            name="password_confirmation"
            type="password"
            placeholder="Confirmação de senha"
            icon={FiLock}
          />

          <Button type="submit">Alterar senha</Button>

          <Link to="forgot-password">Esqueci minha senha</Link>
        </Form>
      </Content>
    </Container>
  );
};

export default ResetPassword;
