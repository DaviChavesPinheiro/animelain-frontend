import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiPlayCircle, FiPlus } from 'react-icons/fi';
import { Anime, Container, Content, ImageContainer } from './styles';
import api from '../../services/api';
import Header from '../../components/Header';

interface Anime {
  id: string;
  title: string;
  episodesAmount: number;
  profile_url?: string;
}

const Dashboard: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    api.get('/animes').then(response => {
      setAnimes(response.data);
    });
  }, []);

  return (
    <Container>
      <Header />

      <Content>
        <Anime to="/animes/create">
          <ImageContainer>
            <FiPlus size="30" color="#565656" />
          </ImageContainer>
          <div>
            <h2>Criar Novo</h2>
            <p>Clique para criar um novo anime</p>
            <div>
              <span />
            </div>
          </div>
        </Anime>
        {animes.map(anime => (
          <Anime key={anime.id} to={`/animes/${anime.id}`}>
            <ImageContainer>
              {anime.profile_url ? (
                <img src={anime.profile_url} alt={anime.title} />
              ) : (
                <FiAlertCircle size="30" color="#565656" />
              )}
            </ImageContainer>
            <div>
              <h2>{anime.title}</h2>
              <div>
                <span>
                  <FiPlayCircle />
                  {`${anime.episodesAmount} `}
                  episódios
                </span>
              </div>
            </div>
          </Anime>
        ))}
      </Content>
    </Container>
  );
};
export default Dashboard;
