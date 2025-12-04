import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faLock, 
  faHeadset 
} from '@fortawesome/free-solid-svg-icons'; 
import '../../style/Accueil.css';
import Nav from './Nav';
import Footer from './Footer';
// import { NavLink } from 'react-router-dom';

const Accueil = () => {
  // const handleCommencerInscription = (e) => {
  //   e.preventDefault();
  //   // Logique pour rediriger vers la page d'inscription
  //   console.log('Redirection vers la page d\'inscription');
  //   // window.location.href = '/inscription'; // Décommentez pour la redirection
  // };

  return (
    <div>
      <Nav/>
    <div className="container">
      <section className="hero">
        <h2>Bienvenue sur notre plateforme d'inscription en ligne</h2>
        <p>
          Simplifiez votre processus d'inscription avec notre système de gestion intuitif. 
          Inscrivez-vous en quelques clics et accédez à toutes les informations dont vous avez besoin.
        </p>
        {/* <button 
          className="btn btn-accent" 
          onClick={handleCommencerInscription}
        >
          <NavLink to='/Logclient'>Commencer l'inscription</NavLink>
          
        </button> */}
      </section>
      
      <section className="features">
        <div className="feature-card">
          <FontAwesomeIcon icon={faClock} className="feature-icon" />
          <h3>Processus Rapide</h3>
          <p>Inscription simplifiée et traitement accéléré de votre dossier pour gagner du temps.</p>
        </div>
        
        <div className="feature-card">
          <FontAwesomeIcon icon={faLock} className="feature-icon" />
          <h3>Sécurité des Données</h3>
          <p>Vos informations personnelles sont cryptées et protégées conformément aux normes en vigueur.</p>
        </div>
        
        <div className="feature-card">
          <FontAwesomeIcon icon={faHeadset} className="feature-icon" />
          <h3>Support Continu</h3>
          <p>Notre équipe est disponible pour vous accompagner à chaque étape de votre inscription.</p>
        </div>
      </section>
      
      {/* <section className="stats">
        <h2>Notre impact en chiffres</h2>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">5,000+</div>
            <div className="stat-label">Étudiants inscrits</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction des utilisateurs</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number">24h</div>
            <div className="stat-label">Temps moyen de traitement</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Formations disponibles</div>
          </div>
        </div>
      </section> */}
    </div>
    <Footer/>
    </div>
  );
};

export default Accueil;