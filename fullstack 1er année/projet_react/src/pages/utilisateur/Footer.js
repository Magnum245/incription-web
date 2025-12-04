import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';
import '../../style/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, section) => {
    e.preventDefault();
    // Logique de navigation ou scroll vers la section
    console.log(`Navigation vers: ${section}`);
    // Exemple: scroll vers une section spécifique
    // const element = document.getElementById(section);
    // if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'S\'inscrire', href: '' },
    { name: 'Info scolarité', href: '/info' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>À propos</h3>
          <p>
            Notre plateforme d'inscription en ligne permet une gestion simplifiée 
            et efficace des processus d'admission pour les établissements scolaires.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Liens rapides</h3>
          <ul>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.name)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contactez-nous</h3>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="footer-icon" />
            St Laurent Ambonierenana Alasora
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} className="footer-icon" />
            +261 34 92 289 49
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} className="footer-icon" />
            +261 38 48 907 97
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
            byrenall@gmail.com
          </p>
           <p>
            <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
            tsikyshellah@gmail.com
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Plateforme d'Inscription Scolaire. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;