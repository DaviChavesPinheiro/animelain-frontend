import React from 'react';
import { FiPower, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Content, ImageContainer, Profile } from './styles';

import AnimeLainLogo from '../../assets/AnimeLain.svg';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Content>
        <img src={AnimeLainLogo} alt="AnimeLain" />

        <Profile>
          <ImageContainer>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} />
            ) : (
              <FiUser size="30" color="#565656" />
            )}
          </ImageContainer>

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
      </Content>
    </Container>
  );
};

export default Header;
