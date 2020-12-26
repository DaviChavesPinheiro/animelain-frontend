import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiAlertCircle, FiCamera, FiMail, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Input from '../../components/inputs/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { AvatarInput, Container, Content } from './styles';
import api from '../../services/api';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
        });

        await schema.validate(data, { abortEarly: false });

        api.put('/profile', data).then(response => {
          updateUser(response.data);
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [updateUser],
  );

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);
        });
      }
    },
    [updateUser],
  );

  return (
    <Container>
      <Header />
      <Content>
        <Form initialData={user} onSubmit={handleSubmit} ref={formRef}>
          <AvatarInput>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} />
            ) : (
              <FiAlertCircle size="30" color="#565656" />
            )}
            <label htmlFor="avatar">
              <FiCamera size="20" />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
          <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />

          <Button type="submit">Salvar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
