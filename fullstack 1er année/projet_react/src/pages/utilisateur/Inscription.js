import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faUser, 
  faSchool, 
  faPaperPlane, 
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../../style/Inscription.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Footer from './Footer';

const Inscription = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    nom: '',
    prenoms: '',
    date_naissance: '',
    sexe: '',
    classe: '',
    certification: false
  });

  // Vérifie si un utilisateur est connecté
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.nom || !formData.prenoms || !formData.date_naissance || 
        !formData.sexe || !formData.classe || !formData.certification) {
      alert('Veuillez remplir tous les champs et cocher la certification.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/formulaire', formData);
      alert(response.data.message || '✅ Inscription envoyée avec succès !');

      setFormData({
        nom: '',
        prenoms: '',
        date_naissance: '',
        sexe: '',
        classe: '',
        certification: false
      });
    } catch (error) {
      console.error('Erreur API:', error.response?.data || error.message);
      alert('❌ Une erreur est survenue lors de l\'inscription.');
    }
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <header className="inscription-header">
          <h1>
            <FontAwesomeIcon icon={faGraduationCap} /> 
            Formulaire d'Inscription Scolaire
          </h1>
          <p>Remplissez soigneusement les informations de l'élève</p>
        </header>

        <form onSubmit={handleSubmit} className="inscription-form">
          {/* Informations personnelles */}
          <section className="form-section">
            <h2><FontAwesomeIcon icon={faUser} /> Informations Personnelles</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nom" className="required">Nom</label>
                <input 
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="prenoms" className="required">Prénoms</label>
                <input 
                  type="text"
                  id="prenoms"
                  name="prenoms"
                  value={formData.prenoms}
                  onChange={handleInputChange}
                  placeholder="Vos prénoms"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date_naissance" className="required">Date de naissance</label>
                <input 
                  type="date"
                  id="date_naissance"
                  name="date_naissance"
                  value={formData.date_naissance}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="sexe" className="required">Sexe</label>
                <select 
                  id="sexe"
                  name="sexe"
                  value={formData.sexe}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionnez</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
            </div>
          </section>

          {/* Informations scolaires */}
          <section className="form-section">
            <h2><FontAwesomeIcon icon={faSchool} /> Informations Scolaires</h2>
            <div className="form-group full-width">
              <label htmlFor="classe" className="required">Classe demandée</label>
              <select 
                id="classe"
                name="classe"
                value={formData.classe}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionnez la classe</option>
                <option value="12eme">12ème</option>
                <option value="11eme">11ème</option>
                <option value="10eme">10ème</option>
                <option value="9eme">9ème</option>
                <option value="8eme">8ème</option>
                <option value="7eme">7ème</option>
                <option value="6eme">6ème</option>
                <option value="5eme">5ème</option>
                <option value="4eme">4ème</option>
                <option value="3eme">3ème</option>
              </select>
            </div>
          </section>

          {/* Certification */}
          <section className="form-section">
            <div className="checkbox-group">
              <input 
                type="checkbox"
                id="certification"
                name="certification"
                checked={formData.certification}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="certification" className="required">
                Je certifie l'exactitude des informations fournies.
              </label>
            </div>
          </section>

          {/* Boutons */}
          <div className="form-actions">
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Retour à l'accueil
            </button>

            {!isLoggedIn ? (
              <button 
                type="button"
                className="btn btn-warning"
                onClick={() => navigate('/login')}
              >
                Veuillez vous connecter
              </button>
            ) : (
              <button type="submit" className="btn btn-accent">
                <FontAwesomeIcon icon={faPaperPlane} /> Soumettre l'inscription
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Inscription;
