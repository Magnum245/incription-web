// src/pages/utilisateur/Nav.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUserPlus, 
  faInfoCircle, 
  faUser, 
  faFileAlt,
  faHistory 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../../style/Nav.css';

const Nav = () => {
  const [activeItem, setActiveItem] = useState('accueil');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const handleNavigationClick = (itemName) => {
    setActiveItem(itemName);
  };

  const navItems = [
    { name: 'accueil', icon: faHome, label: 'Accueil', path: '/' },
    { name: 'formulaire', icon: faFileAlt, label: 'Formulaire', path: '/inscription' },
  ];

  // Ajouter "Suivi formulaire" si l'utilisateur est connecté
  if (isLoggedIn) {
    navItems.push(
      { name: 'suivi-formulaire', icon: faHistory, label: 'Suivi formulaire', path: '/statusformulaire' }
    );
  }

  // Ajouter les autres items
  navItems.push(
    isLoggedIn
      ? { name: 'moncompte', icon: faUser, label: 'Mon compte', path: '/mon-compte' }
      : { name: 'login', icon: faUserPlus, label: 'Se connecter', path: '/login' },
    { name: 'info', icon: faInfoCircle, label: 'Info scolarité', path: '/info' }
  );

  return (
    <div className="navigation-container">
      <header className="navigation-header">
        <div className="header-content">
          <h1>Inscription Scolaire</h1>
          <p>Plateforme de gestion des inscriptions en ligne</p>
        </div>
      </header>

      <div className="container">
        <nav className="main-navigation">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={activeItem === item.name ? 'active' : ''}
                  onClick={() => handleNavigationClick(item.name)}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;