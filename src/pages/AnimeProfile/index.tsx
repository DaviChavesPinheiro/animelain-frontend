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
  FiPlayCircle,
  FiPlus,
  FiType,
  FiUser,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  AvatarInput,
  BannerInput,
  Character,
  CharacterNameContainer,
  CharactersContainer,
  Container,
  Content,
  Genre,
  GenresContainer,
} from './styles';
import api from '../../services/api';
import Header from '../../components/Header';

interface Character {
  id: string;
  name: string;
  profile_url: string;
}

interface Genre {
  id: string;
  score: number;
  category: {
    id: string;
    name: string;
  };
}

interface Anime {
  id: string;
  title: string;
  description: string;
  profile_url: string;
  banner_url: string;
  episodesAmount: number;
  genres: Genre[];
  characters: Character[];
}

interface AnimeProfileFormData {
  title: string;
  description: string;
  episodesAmount: number;
}

interface ReactRouterDomParams {
  id: string;
}

const AnimeProfile: React.FC = () => {
  const [infoLoading, setInfoLoading] = useState(false);
  const [anime, setAnime] = useState<Anime>({} as Anime);
  const { id } = useParams<ReactRouterDomParams>();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    api.get(`/animes/${id}`).then(response => {
      setAnime(response.data);
    });
  }, [id]);

  const handleSubmit = useCallback(
    async (data: AnimeProfileFormData) => {
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

        const response = await api.put(`/animes/${id}`, data);
        setAnime(response.data);
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

  const handleProfileImageChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch(`/animes/${id}/profile`, data).then(response => {
          setAnime(response.data);
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

        api.patch(`/animes/${id}/banner`, data).then(response => {
          setAnime(response.data);
        });
      }
    },
    [id],
  );

  return (
    <Container>
      <Header />
      <Content>
        <Form initialData={anime} onSubmit={handleSubmit} ref={formRef}>
          <BannerInput>
            {anime.banner_url ? (
              <img src={anime.banner_url} alt={anime.title} />
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
            {anime.profile_url ? (
              <img src={anime.profile_url} alt={anime.title} />
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
      </Content>
      <Content>
        <GenresContainer>
          {anime.genres?.map(genre => (
            <Genre key={genre.id}>
              <Link to={`/categories/${genre.category.id}`}>
                {genre.category.name}
              </Link>
              <span>{`${genre.score}%`}</span>
            </Genre>
          ))}
          <Genre>
            <Link to="/categories/create">Novo</Link>
            <FiPlus />
          </Genre>
        </GenresContainer>
      </Content>
      <Content>
        <CharactersContainer>
          {anime.characters?.map(character => (
            <Character key={character.id} to={`/characters/${character.id}`}>
              {character.profile_url ? (
                <img src={character.profile_url} alt={character.name} />
              ) : (
                <FiAlertCircle size="30" color="#565656" />
              )}
              <CharacterNameContainer>
                <span>{character.name}</span>
              </CharacterNameContainer>
            </Character>
          ))}
          <Character to="/characters/create">
            <FiPlus size="30" color="#565656" />
          </Character>
        </CharactersContainer>
      </Content>
    </Container>
  );
};

export default AnimeProfile;
