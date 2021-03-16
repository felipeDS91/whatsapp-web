import React, { useCallback, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';
import { Container, Profile, Nav, MenuButton } from './styles';
import { useAuth } from '../../hooks/auth';
import logoImg from '../../assets/logo.png';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  const [toggle, setToggle] = useState(false);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <Nav isOpened={toggle}>
        <MenuButton onClick={() => setToggle(!toggle)}>
          <FaBars size={20} color="#111" />
        </MenuButton>

        <img src={logoImg} alt="Logo" width="80" />

        <ul>
          <li>
            <NavLink to="/home" onClick={() => setToggle(!toggle)}>
              + QRCODE
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages" onClick={() => setToggle(!toggle)}>
              MENSAGENS
            </NavLink>
          </li>
        </ul>

        <aside>
          <Profile>
            <div>
              <Link to="/">
                <strong>{user.name}</strong>
              </Link>
              <button type="button" onClick={handleSignOut}>
                Sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Nav>
    </Container>
  );
};

export default Header;
