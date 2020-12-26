import React, { useCallback, useRef, useState } from 'react';
import { FiArrowRight, FiPlayCircle, FiType, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Input from '../../components/inputs/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, GoToAnimeCreatedLink } from './styles';
import api from '../../services/api';
import Header from '../../components/Header';

interface Anime {
  id: string;
  title: string;
  description: string;
  episodesAmount: number;
}

interface AnimeProfileFormData {
  title: string;
  description: string;
  episodesAmount: number;
}

const CreateAnimePage: React.FC = () => {
  const [infoLoading, setInfoLoading] = useState(false);
  const [animeCreated, setAnimeCreated] = useState<Anime | null>(null);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: AnimeProfileFormData) => {
    try {
      setInfoLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string()
          .trim('Título inválido')
          .required('Titulo obrigatório'),
        description: Yup.string().required('Descrição obrigatória'),
        episodesAmount: Yup.number()
          .required('Episídios obrigatórios')
          .min(0, 'Valor inválido'),
      });

      await schema.validate(data, { abortEarly: false });

      const response = await api.post('/animes', data);

      formRef.current?.reset();
      setAnimeCreated(response.data);
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
          initialData={animeCreated || {}}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <Input name="title" type="text" placeholder="Titulo" icon={FiUser} />
          <Input
            name="description"
            type="text"
            placeholder="Descricao"
            icon={FiType}
          />
          <Input
            name="episodesAmount"
            type="number"
            placeholder="Episodios"
            icon={FiPlayCircle}
          />

          <Button loading={infoLoading} type="submit">
            Salvar
          </Button>
        </Form>
        {animeCreated ? (
          <GoToAnimeCreatedLink to={`/animes/${animeCreated.id}`}>
            {animeCreated.title}
            <FiArrowRight />
          </GoToAnimeCreatedLink>
        ) : null}
      </Content>
    </Container>
  );
};

export default CreateAnimePage;
