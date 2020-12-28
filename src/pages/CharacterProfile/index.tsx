import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FiAlertCircle,
  FiCamera,
  FiSliders,
  FiType,
  FiUser,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/inputs/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { AvatarInput, BannerInput, Container, Content } from './styles';
import api from '../../services/api';
import Header from '../../components/Header';

interface Character {
  id: string;
  name: string;
  profile_url: string;
  banner_url: string;
}

interface CharacterProfileFormData {
  name: string;
  description: string;
  age: number;
}

interface ReactRouterDomParams {
  id: string;
}

const CharacterProfile: React.FC = () => {
  const [infoLoading, setInfoLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [character, setCharacter] = useState<Character>({} as Character);
  const { id } = useParams<ReactRouterDomParams>();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    api.get(`/characters/${id}`).then(response => {
      setCharacter(response.data);
    });
  }, [id]);

  const handleSubmit = useCallback(
    async (data: CharacterProfileFormData) => {
      try {
        setInfoLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
          age: Yup.number()
            .required('Idade obrigatória')
            .min(0, 'Valor inválido'),
        });

        await schema.validate(data, { abortEarly: false });

        const response = await api.put(`/characters/${id}`, data);
        setCharacter(response.data);
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

  const handleDelete = useCallback(async () => {
    setDeleteLoading(true);
    await api.delete(`/characters/${id}`);
    setDeleteLoading(false);
  }, [id]);

  const handleProfileImageChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch(`/characters/${id}/profile`, data).then(response => {
          setCharacter(response.data);
        });
      }
    },
    [id],
  );

  const handleBannerImageChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch(`/characters/${id}/banner`, data).then(response => {
          setCharacter(response.data);
        });
      }
    },
    [id],
  );

  return (
    <Container>
      <Header />
      <Content>
        <Form initialData={character} onSubmit={handleSubmit} ref={formRef}>
          <BannerInput>
            {character.banner_url ? (
              <img src={character.banner_url} alt={character.name} />
            ) : (
              <FiAlertCircle size="30" color="#565656" />
            )}
            <label htmlFor="banner">
              <FiCamera size="20" />
              <input
                type="file"
                id="banner"
                onChange={handleBannerImageChange}
              />
            </label>
          </BannerInput>
          <AvatarInput>
            {character.profile_url ? (
              <img src={character.profile_url} alt={character.name} />
            ) : (
              <FiAlertCircle size="30" color="#565656" />
            )}
            <label htmlFor="profile">
              <FiCamera size="20" />
              <input
                type="file"
                id="profile"
                onChange={handleProfileImageChange}
              />
            </label>
          </AvatarInput>

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

          <Button
            loading={deleteLoading}
            loadingMessage="Deletando..."
            type="button"
            backgroundColor="#f50303"
            onClick={handleDelete}
          >
            Deletar
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CharacterProfile;
