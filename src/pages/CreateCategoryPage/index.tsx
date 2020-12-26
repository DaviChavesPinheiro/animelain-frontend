import React, { useCallback, useRef, useState } from 'react';
import { FiArrowRight, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, GoToAnimeCreatedLink } from './styles';
import api from '../../services/api';
import Header from '../../components/Header';

interface Category {
  id: string;
  name: string;
}

interface CategoryProfileFormData {
  name: string;
}

const CreateCategoryPage: React.FC = () => {
  const [infoLoading, setInfoLoading] = useState(false);
  const [categoryCreated, setCategoryCreated] = useState<Category | null>(null);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: CategoryProfileFormData) => {
    try {
      setInfoLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().trim('Nome inválido').required('Nome obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });

      const response = await api.post('/categories', data);

      formRef.current?.reset();
      setCategoryCreated(response.data);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }
    } finally {
      setInfoLoading(false);
    }
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Form
          initialData={categoryCreated || {}}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <Input name="name" type="text" placeholder="Nome" icon={FiUser} />

          <Button loading={infoLoading} type="submit">
            Salvar
          </Button>
        </Form>
        {categoryCreated ? (
          <GoToAnimeCreatedLink to={`/categories/${categoryCreated.id}`}>
            {categoryCreated.name}
            <FiArrowRight />
          </GoToAnimeCreatedLink>
        ) : null}
      </Content>
    </Container>
  );
};

export default CreateCategoryPage;
