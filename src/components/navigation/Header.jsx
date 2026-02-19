import React from 'react';
import './navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = ({ userUsername, setIsLoggedIn }) => {
  // Sistemdən çıxış funksiyası
  const logout = () => {
    // 1. Tokeni yaddaşdan silirik
    localStorage.removeItem('accessToken');
    // 2. Giriş vəziyyətini false edirik ki, App.jsx bizi Auth-a yönləndirsin
    setIsLoggedIn(false);
  };

  return (
    <nav className="header-nav">
      <div className="header-left">
        <img src="https://picsum.photos/100/100" alt="avatar" className="avatar" />
        <p>Welcome, {userUsername}!</p>
      </div>
      <div className="header-right">
        <span className="logout-button" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span className="logout-text">Logout</span>
        </span>
      </div>
    </nav>
  );
};

export default Header;