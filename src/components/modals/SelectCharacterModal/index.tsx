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
  onFinishSelectedCharacters(characters: Character[]): void;
}

const SelectCharacterModal: React.FC<Props> = ({
  onClose,
  onFinishSelectedCharacters,
}) => {
  const formRef = useRef<FormHandles>(null);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [seletedCharacters, setSeletedCharacters] = useState<Character[]>([]);

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

  const handleCharacterSelect = useCallback(
    (character: Character) => {
      setSeletedCharacters([...seletedCharacters, character]);
    },
    [seletedCharacters],
  );

  const handleCharacterDeSelect = useCallback(
    (character: Character) => {
      const charactersFiltered = seletedCharacters.filter(
        characterElement => characterElement.id !== character.id,
      );
      setSeletedCharacters(charactersFiltered);
    },
    [seletedCharacters],
  );

  const handleCloseModal = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === modalRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  const handleAddCharacters = useCallback(() => {
    onFinishSelectedCharacters(seletedCharacters);
    onClose();
  }, [onClose, onFinishSelectedCharacters, seletedCharacters]);

  return (
    <Container ref={modalRef} onClick={handleCloseModal}>
      <Content>
        <Header>
          <h2>Selecione um ou mais personagens</h2>
          <button
            onClick={handleAddCharacters}
            disabled={!seletedCharacters.length}
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
                <Character
                  key={character.id}
                  character={character}
                  handleCharacterSelect={handleCharacterSelect}
                  handleCharacterDeSelect={handleCharacterDeSelect}
                />
              ))
            )}
          </CharactersContainer>
        </Body>
      </Content>
    </Container>
  );
};

interface CharacterComponentProps {
  character: Character;
  handleCharacterSelect(character: Character): void;
  handleCharacterDeSelect(character: Character): void;
}

const Character: React.FC<CharacterComponentProps> = ({
  character,
  handleCharacterSelect,
  handleCharacterDeSelect,
}) => {
  const [selected, setSelected] = useState(false);

  const onSelect = useCallback(() => {
    if (selected) {
      handleCharacterDeSelect(character);
    } else {
      handleCharacterSelect(character);
    }
    setSelected(!selected);
  }, [character, handleCharacterDeSelect, handleCharacterSelect, selected]);

  return (
    <CharacterContainer
      key={character.id}
      onClick={onSelect}
      selected={selected}
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
  );
};

export default SelectCharacterModal;
