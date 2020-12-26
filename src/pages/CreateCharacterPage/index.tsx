import React, { useCallback, useRef, useState } from 'react';
import { FiArrowRight, FiSliders, FiType, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Input from '../../components/inputs/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, GoToAnimeCreatedLink } from './styles';
import api from '../../services/api';
import Header from '../../components/Header';

interface Character {
  id: string;
  name: string;
  description: string;
  age: number;
}

interface CharacterProfileFormData {
  name: string;
  description: string;
  age: number;
}

const CreateCharacterPage: React.FC = () => {
  const [infoLoading, setInfoLoading] = useState(false);
  const [characterCreated, setCharacterCreated] = useState<Character | null>(
    null,
  );

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: CharacterProfileFormData) => {
    try {
      setInfoLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().trim('Nome inválido').required('Nome obrigatório'),
        description: Yup.string().required('Descrição obrigatória'),
        age: Yup.number()
          .required('Idade obrigatória')
          .min(0, 'Valor inválido'),
      });

      await schema.validate(data, { abortEarly: false });

      const response = await api.post('/characters', data);

      formRef.current?.reset();
      setCharacterCreated(response.data);
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
          initialData={characterCreated || {}}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
          <Input
            name="description"
            type="text"
            placeholder="Descricao"
            icon={FiType}
          />
          <Input
            name="age"
            type="number"
            placeholder="Idade"
            icon={FiSliders}
          />

          <Button loading={infoLoading} type="submit">
            Salvar
          </Button>
        </Form>
        {characterCreated ? (
          <GoToAnimeCreatedLink to={`/characters/${characterCreated.id}`}>
            {characterCreated.name}
            <FiArrowRight />
          </GoToAnimeCreatedLink>
        ) : null}
      </Content>
    </Container>
  );
};

export default CreateCharacterPage;
