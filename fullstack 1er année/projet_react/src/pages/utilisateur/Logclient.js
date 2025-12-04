import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import '../../style/Logclient.css';
import Footer from './Footer';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';




const Logclient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    confirmation_mot_de_passe: '',
    telephone: '',
    profil: '',
    newsletter: false
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'L\'adresse email est requise';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Adresse email invalide';

    if (!formData.mot_de_passe) newErrors.mot_de_passe = 'Le mot de passe est requis';
    else if (formData.mot_de_passe.length < 8)
      newErrors.mot_de_passe = '8 caractères minimum';
    else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(formData.mot_de_passe))
      newErrors.mot_de_passe = 'Doit contenir majuscule, minuscule et chiffre';

    if (formData.mot_de_passe !== formData.confirmation_mot_de_passe)
      newErrors.confirmation_mot_de_passe = 'Les mots de passe ne correspondent pas';

    if (!formData.telephone) newErrors.telephone = 'Le numéro de téléphone est requis';
    if (!formData.profil) newErrors.profil = 'Veuillez sélectionner votre profil';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (validateForm()) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/inscription', formData);
        console.log('Réponse API:', response.data);

        setSuccessMessage('✅ Compte créé avec succès ! Redirection...');
        setFormData({
          email: '',
          mot_de_passe: '',
          confirmation_mot_de_passe: '',
          telephone: '',
          profil: '',
          newsletter: false
        });

        // ⏳ Petite pause avant redirection
      setTimeout(() => {
        navigate('/inscription');
      }, 1500);
      } catch (error) {
        console.error('Erreur API:', error.response?.data || error.message);
        setSuccessMessage('❌ Une erreur est survenue lors de la création du compte.');
      }
    }
  };

  return (
    <div>
      <Nav />
      <div className="inscription-container">
        <div className="inscription-header">
          <h1>Création de compte utilisateur</h1>
          <p>Remplissez le formulaire ci-dessous pour créer votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="inscription-form">
          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="exemple@email.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mot_de_passe">Mot de passe</label>
            <input
              type="password"
              id="mot_de_passe"
              name="mot_de_passe"
              value={formData.mot_de_passe}
              onChange={handleInputChange}
              className={errors.mot_de_passe ? 'error' : ''}
            />
            {errors.mot_de_passe && <span className="error-message">{errors.mot_de_passe}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmation_mot_de_passe">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmation_mot_de_passe"
              name="confirmation_mot_de_passe"
              value={formData.confirmation_mot_de_passe}
              onChange={handleInputChange}
              className={errors.confirmation_mot_de_passe ? 'error' : ''}
            />
            {errors.confirmation_mot_de_passe && (
              <span className="error-message">{errors.confirmation_mot_de_passe}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="telephone">Téléphone</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              placeholder="+261 34 12 345 67"
              className={errors.telephone ? 'error' : ''}
            />
            {errors.telephone && <span className="error-message">{errors.telephone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="profil">Profil</label>
            <select
              id="profil"
              name="profil"
              value={formData.profil}
              onChange={handleInputChange}
              className={errors.profil ? 'error' : ''}
            >
              <option value="">-- Sélectionnez --</option>
              <option value="eleve">Élève</option>
              <option value="parent">Parent</option>
              <option value="tuteur">Tuteur</option>
            </select>
            {errors.profil && <span className="error-message">{errors.profil}</span>}
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
            />
            <label htmlFor="newsletter">Recevoir la newsletter</label>
          </div>

          {successMessage && <p className="success-message">{successMessage}</p>}

          <button type="submit" className="btn btn-accent">
            <FontAwesomeIcon icon={faCheck} /> Créer mon compte
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Logclient;
