import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiPlayCircle } from 'react-icons/fi';
import { Anime, Container, Content, ImageContainer } from './styles';
import api from '../../services/api';
import Header from '../../components/Header';

interface Anime {
  id: string;
  title: string;
  description: string;
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
        {animes.map(anime => (
          <Anime key={anime.id}>
            <ImageContainer>
              {anime.profile_url ? (
                <img src={anime.profile_url} alt={anime.title} />
              ) : (
                <FiAlertCircle size="30" color="#565656" />
              )}
            </ImageContainer>
            <div>
              <h2>{anime.title}</h2>
              <p>{anime.description}</p>
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
