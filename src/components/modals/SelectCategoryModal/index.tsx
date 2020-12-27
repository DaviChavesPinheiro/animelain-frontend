import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import React, { useCallback, useRef, useState } from 'react';
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
  onFinishSelectedCategories(categories: Category[]): void;
}

const SelectCategoryModal: React.FC<Props> = ({
  onClose,
  onFinishSelectedCategories,
}) => {
  const formRef = useRef<FormHandles>(null);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [seletedCategories, setSeletedCategories] = useState<Category[]>([]);

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

  const handleCategorySelect = useCallback(
    (category: Category) => {
      setSeletedCategories([...seletedCategories, category]);
    },
    [seletedCategories],
  );

  const handleCategoryDeSelect = useCallback(
    (category: Category) => {
      const categoriesFiltered = seletedCategories.filter(
        categoryElement => categoryElement.id !== category.id,
      );
      setSeletedCategories(categoriesFiltered);
    },
    [seletedCategories],
  );

  const handleCloseModal = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === modalRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  const handleAddCategories = useCallback(() => {
    onFinishSelectedCategories(seletedCategories);
    onClose();
  }, [onClose, onFinishSelectedCategories, seletedCategories]);

  return (
    <Container ref={modalRef} onClick={handleCloseModal}>
      <Content>
        <Header>
          <h2>Selecione uma ou mais categorias</h2>
          <button
            onClick={handleAddCategories}
            disabled={!seletedCategories.length}
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
                <Category
                  key={category.id}
                  category={category}
                  handleCategorySelect={handleCategorySelect}
                  handleCategoryDeSelect={handleCategoryDeSelect}
                />
              ))
            )}
          </CategoriesContainer>
        </Body>
      </Content>
    </Container>
  );
};

interface CategoryComponentProps {
  category: Category;
  handleCategorySelect(category: Category): void;
  handleCategoryDeSelect(category: Category): void;
}

const Category: React.FC<CategoryComponentProps> = ({
  category,
  handleCategorySelect,
  handleCategoryDeSelect,
}) => {
  const [selected, setSelected] = useState(false);

  const onSelect = useCallback(() => {
    if (selected) {
      handleCategoryDeSelect(category);
    } else {
      handleCategorySelect(category);
    }
    setSelected(!selected);
  }, [category, handleCategoryDeSelect, handleCategorySelect, selected]);

  return (
    <CategoryElement key={category.id} onClick={onSelect} selected={selected}>
      {category.name}
    </CategoryElement>
  );
};

export default SelectCategoryModal;
