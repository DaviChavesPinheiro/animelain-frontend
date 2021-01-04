import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiLoader, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SearchInput from '../../inputs/SearchInput';
import {
  Body,
  CategoryElement,
  CategoriesContainer,
  Container,
  Content,
  Header,
} from './styles';
import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';

interface Category {
  id: string;
  name: string;
}

interface SearchFormData {
  search: string;
}

interface Props {
  onClose(): void;
  onFinishSelectedCategory(category: Category): void;
}

const SelectCategoryModal: React.FC<Props> = ({
  onClose,
  onFinishSelectedCategory,
}) => {
  const formRef = useRef<FormHandles>(null);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [seletedCategory, setSeletedCategory] = useState<Category | null>(null);

  useEffect(() => {
    api.get('/categories').then(response => {
      setCategories(response.data);
    });
  }, []);

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

      const response = await api.get('/categories', {
        params: data,
      });

      setCategories(response.data);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCloseModal = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === modalRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  const handleAddCategories = useCallback(() => {
    if (!seletedCategory) return;

    onFinishSelectedCategory(seletedCategory);
    onClose();
  }, [onClose, onFinishSelectedCategory, seletedCategory]);

  return (
    <Container ref={modalRef} onClick={handleCloseModal}>
      <Content>
        <Header>
          <h2>Selecione uma ou mais categorias</h2>
          <button
            onClick={handleAddCategories}
            disabled={!seletedCategory}
            type="button"
          >
            Adicionar
          </button>
          <Link to="/categories/create">Criar Nova</Link>
        </Header>
        <Body>
          <Form onSubmit={handleSearchSubmit} ref={formRef}>
            <SearchInput
              name="search"
              type="text"
              placeholder="Digite um nome de uma categoria"
              icon={FiSearch}
            />
          </Form>

          <CategoriesContainer>
            {loading ? (
              <FiLoader />
            ) : (
              categories &&
              categories.map(category => (
                <CategoryElement
                  key={category.id}
                  onClick={
                    () =>
                      setSeletedCategory(
                        category.id === seletedCategory?.id ? null : category,
                      )
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                  selected={category.id === seletedCategory?.id}
                >
                  {category.name}
                </CategoryElement>
              ))
            )}
          </CategoriesContainer>
        </Body>
      </Content>
    </Container>
  );
};

export default SelectCategoryModal;
