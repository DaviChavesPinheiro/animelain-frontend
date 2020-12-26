import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLogIn } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import AnimeLainLogo from '../../assets/AnimeLain.svg';

import Button from '../../components/Button';
import Input from '../../components/inputs/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Logo } from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const handleForgotPassword = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/password/forgot', {
          email: data.email,
        });

        formRef.current?.reset();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <Container>
      <Logo src={AnimeLainLogo} />
      <Content>
        <Form onSubmit={handleForgotPassword} ref={formRef}>
          <h1>Recuperação de senha</h1>

          <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />

          <Button loading={loading} type="submit">
            Enviar e-mail de recuperação
          </Button>
        </Form>
        <Link to="/">
          <FiLogIn />
          Voltar ao login
        </Link>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
