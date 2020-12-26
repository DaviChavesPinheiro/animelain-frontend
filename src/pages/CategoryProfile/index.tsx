import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content } from './styles';
import api from '../../services/api';
import Header from '../../components/Header';

interface Category {
  id: string;
  name: string;
}

interface CategoryProfileFormData {
  name: string;
}

interface ReactRouterDomParams {
  id: string;
}

const CategoryProfile: React.FC = () => {
  const [infoLoading, setInfoLoading] = useState(false);
  const [category, setCategory] = useState<Category>({} as Category);
  const { id } = useParams<ReactRouterDomParams>();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    api.get(`/categories/${id}`).then(response => {
      setCategory(response.data);
    });
  }, [id]);

  const handleSubmit = useCallback(
    async (data: CategoryProfileFormData) => {
      try {
        setInfoLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().trim('Nome Inválido').required('Nome obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const response = await api.put(`/categories/${id}`, data);
        setCategory(response.data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
      } finally {
        setInfoLoading(false);
      }
    },
    [id],
  );

  return (
    <Container>
      <Header />
      <Content>
        <Form initialData={category} onSubmit={handleSubmit} ref={formRef}>
          <Input name="name" type="text" placeholder="Nome" icon={FiUser} />

          <Button loading={infoLoading} type="submit">
            Salvar
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CategoryProfile;
