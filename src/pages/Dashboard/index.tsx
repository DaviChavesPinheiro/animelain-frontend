import React, { useEffect, useState } from 'react';
import { FiPlayCircle, FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import {
  Anime,
  Container,
  Content,
  Header,
  HeaderContent,
  Profile,
} from './styles';
import AnimeLainLogo from '../../assets/AnimeLain.svg';
import api from '../../services/api';

interface Anime {
  id: string;
  title: string;
  description: string;
  episodesAmount: number;
  profile_url?: string;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [animes, setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    api.get('/animes').then(response => {
      setAnimes(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={AnimeLainLogo} alt="AnimeLain" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        {animes.map(anime => (
          <Anime key={anime.id}>
            <img src={anime.profile_url} alt={anime.title} />
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
