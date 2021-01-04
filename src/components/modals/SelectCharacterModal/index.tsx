import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import React, { useCallback, useRef, useState } from 'react';
import { FiAlertCircle, FiLoader, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SearchInput from '../../inputs/SearchInput';
import {
  Body,
  CharacterContainer,
  CharacterNameContainer,
  CharactersContainer,
  Container,
  Content,
  Header,
} from './styles';
import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';

interface Character {
  id: string;
  name: string;
  profile_url: string;
}

interface SearchFormData {
  search: string;
}

interface Props {
  onClose(): void;
  onFinishSelectedCharacters(character: Character): void;
}

const SelectCharacterModal: React.FC<Props> = ({
  onClose,
  onFinishSelectedCharacters,
}) => {
  const formRef = useRef<FormHandles>(null);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [seletedCharacter, setSeletedCharacter] = useState<Character | null>();

  const handleSearchSubmit = useCallback(async (data: SearchFormData) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        search: Yup.string()
          .trim()
          .max(20, 'Máximo 20 caracteres')
          .required('Digite alguma coisa'),
      });

      await schema.validate(data, { abortEarly: false });

      const response = await api.get('/characters', {
        params: data,
      });

      setCharacters(response.data);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCharacterDeSelect = useCallback(() => {
    setSeletedCharacter(null);
  }, []);

  const handleCloseModal = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === modalRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  const handleAddCharacters = useCallback(() => {
    if (!seletedCharacter) return;

    onFinishSelectedCharacters(seletedCharacter);
    onClose();
  }, [onClose, onFinishSelectedCharacters, seletedCharacter]);

  return (
    <Container ref={modalRef} onClick={handleCloseModal}>
      <Content>
        <Header>
          <h2>Selecione um ou mais personagens</h2>
          <button
            onClick={handleAddCharacters}
            disabled={!seletedCharacter}
            type="button"
          >
            Adicionar
          </button>
          <Link to="/characters/create">Criar Novo</Link>
        </Header>
        <Body>
          <Form onSubmit={handleSearchSubmit} ref={formRef}>
            <SearchInput
              name="search"
              type="text"
              placeholder="Digite um nome de um personagem"
              icon={FiSearch}
            />
          </Form>

          <CharactersContainer>
            {loading ? (
              <FiLoader />
            ) : (
              characters &&
              characters.map(character => (
                <CharacterContainer
                  key={character.id}
                  onClick={() =>
                    setSeletedCharacter(
                      character.id === seletedCharacter?.id ? null : character,
                      // eslint-disable-next-line prettier/prettier
                    )}
                  selected={character.id === seletedCharacter?.id}
                >
                  {character.profile_url ? (
                    <img src={character.profile_url} alt={character.name} />
                  ) : (
                    <FiAlertCircle size="30" color="#565656" />
                  )}
                  <CharacterNameContainer>
                    <span>{character.name}</span>
                  </CharacterNameContainer>
                </CharacterContainer>
              ))
            )}
          </CharactersContainer>
        </Body>
      </Content>
    </Container>
  );
};

export default SelectCharacterModal;
