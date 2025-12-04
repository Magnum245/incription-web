import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import '../Admin/styles/Login.css';
import Footer from './Footer';
import Nav from './Nav';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        mot_de_passe: password
      });

      if (response.data.success) {
        // Stocker l'utilisateur dans le localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Popup de bienvenue
        alert(`Bienvenue ${response.data.user.email} !`);

        // Rediriger vers la page mon compte
        navigate('/mon-compte');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Email ou mot de passe incorrect');
    }
  };

  return (
    <div>
      <Nav />
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">
              <i className="fas fa-shield-alt"></i>
              <h2>Utilisateur</h2>
            </div>
            <p>Panneau d'utilisateur</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i> Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <i className="fas fa-lock"></i> Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="login-btn">
              <i className="fas fa-sign-in-alt"></i> Se connecter
            </button>
          </form>

          <div className="login-footer">
            <NavLink to="/logclient" className="forgot-password">
              <i className="fas fa-user-plus"></i> S'inscrire
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
