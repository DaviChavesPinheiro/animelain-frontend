import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Container, Header, HeaderContent, Profile } from './styles';
import AnimeLainLogo from '../../assets/AnimeLain.svg';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={AnimeLainLogo} alt="AnimeLand" />

          <Profile>
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
    </Container>
  );
};
export default Dashboard;
