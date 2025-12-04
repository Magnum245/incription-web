import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoneyBillWave, 
  faCalendarAlt, 
  faHandHoldingUsd 
} from '@fortawesome/free-solid-svg-icons';
import '../../style/information.css';
import Footer from './Footer';
import Nav from './Nav';

const Info = () => {
  const pricingData = [
    {
      level: "Maternelle",
      ageRange: "3 à 5 ans",
      inscriptionFee: "450 000",
      monthlyFee: "180 000",
      totalYearly: "2 250 000",
      featured: false
    },
    {
      level: "Primaire",
      ageRange: "6 à 11 ans",
      inscriptionFee: "550 000",
      monthlyFee: "220 000",
      totalYearly: "2 750 000",
      featured: true,
      badge: "Populaire"
    },
    {
      level: "Secondaire",
      ageRange: "12 à 18 ans",
      inscriptionFee: "650 000",
      monthlyFee: "280 000",
      totalYearly: "3 450 000",
      featured: false
    }
  ];

  const paymentOptions = [
    {
      icon: faMoneyBillWave,
      title: "Paiement annuel",
      description: "Réduction de 5% pour paiement comptant"
    },
    {
      icon: faCalendarAlt,
      title: "Paiement mensuel",
      description: "10 versements de septembre à juin"
    },
    {
      icon: faHandHoldingUsd,
      title: "Bourses disponibles",
      description: "Sous conditions de ressources"
    }
  ];

  return (
    <div>
      <Nav/>
    <div className="container">
      <header className="school-header">
        <h1>Tarifs Scolaires 2025-2026</h1>
        <p>École Excellence - Maternelle, Primaire et Secondaire</p>
      </header>

      <main className="main-content">
        <section className="pricing-section">
          <h2>Droits d'inscription et écolage mensuel</h2>
          <p className="section-subtitle">Tous les tarifs sont en Ariary (MGA)</p>

          <div className="pricing-tables">
            {pricingData.map((level, index) => (
              <div 
                key={index} 
                className={`pricing-table ${level.featured ? 'featured' : ''}`}
              >
                {level.featured && (
                  <div className="pricing-badge">{level.badge}</div>
                )}
                <div className="pricing-header">
                  <h3>{level.level}</h3>
                  <div className="age-range">{level.ageRange}</div>
                </div>
                <div className="pricing-details">
                  <div className="price-item">
                    <span className="price-label">Droit d'inscription</span>
                    <span className="price-amount">{level.inscriptionFee} MGA</span>
                  </div>
                  <div className="price-item">
                    <span className="price-label">Écolage mensuel</span>
                    <span className="price-amount">{level.monthlyFee} MGA</span>
                  </div>
                  <div className="price-total">
                    <span className="total-label">Total pour l'année (10 mois)</span>
                    <span className="total-amount">{level.totalYearly} MGA</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="payment-info">
            <h3>Modalités de paiement</h3>
            <div className="payment-options">
              {paymentOptions.map((option, index) => (
                <div key={index} className="payment-option">
                  <FontAwesomeIcon icon={option.icon} className="payment-icon" />
                  <h4>{option.title}</h4>
                  <p>{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
    <Footer/>
    </div>
  );
};

export default Info;