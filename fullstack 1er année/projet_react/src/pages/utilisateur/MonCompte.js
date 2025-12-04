import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import '../../style/MonCompte.css'; // (optionnel : pour styliser la page)

const MonCompte = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Si aucun utilisateur connecté → rediriger vers login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Supprime les infos de connexion
    localStorage.removeItem('user');

    // Alerte
    alert('Vous avez été déconnecté avec succès.');

    // Redirection automatique
    navigate('/login');
  };

  return (
    <div>
      <Nav />
      <div className="compte-container">
        <h1>Mon Compte</h1>

        {user ? (
          <>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Profil</th>
                    <th>Newsletter</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{user.email}</td>
                    <td>{user.telephone}</td>
                    <td>{user.profil}</td>
                    <td>{user.newsletter ? 'Oui' : 'Non'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bouton de déconnexion */}
            <div className="logout-section">
              <button className="logout-btn" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Se déconnecter
              </button>
            </div>
          </>
        ) : (
          <p>Chargement des informations...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MonCompte;
