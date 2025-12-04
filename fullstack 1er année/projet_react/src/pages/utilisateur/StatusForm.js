import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Footer from './Footer';
import '../../style/StatusForm.css';

const StatusFormulaire = () => {
  const [formulaires, setFormulaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormulaires();
  }, []);

  const fetchFormulaires = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/dossier`);
      setFormulaires(response.data.formulaire || []);
    } catch (error) {
      console.error('Erreur:', error);
      setFormulaires([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatutLabel = (statut_dossier) => {
    switch(statut_dossier) {
      case 'En attente': return 'En attente';
      case 'valide': return 'Validé';
      case 'rejete': return 'Rejeté';
      default: return statut_dossier;
    }
  };

  const getStatutClass = (statut_dossier) => {
    switch(statut_dossier) {
      case 'En attente': return 'statut-en-attente';
      case 'valide': return 'statut-valide';
      case 'rejete': return 'statut-rejete';
      default: return '';
    }
  };

  const getStats = () => {
    const total = formulaires.length;
    const enAttente = formulaires.filter(f => f.statut_dossier === 'En attente').length;
    const valides = formulaires.filter(f => f.statut_dossier === 'valide').length;
    const rejetes = formulaires.filter(f => f.statut_dossier === 'rejete').length;

    return { total, enAttente, valides, rejetes };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="container">
          <div className="loading">Chargement des formulaires...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="container">
        <header className="inscription-header">
          <h1>Suivi des Formulaires</h1>
          <p>Consultez l'état de tous les formulaires d'inscription</p>
        </header>

        {/* Statistiques */}
        {formulaires.length > 0 && (
          <section className="form-section">
            <h2>Aperçu des Demandes</h2>
            <div className="stats-grid">
              <div className="stat-item total">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total</div>
              </div>
              <div className="stat-item pending">
                <div className="stat-number">{stats.enAttente}</div>
                <div className="stat-label">En attente</div>
              </div>
              <div className="stat-item validated">
                <div className="stat-number">{stats.valides}</div>
                <div className="stat-label">Validés</div>
              </div>
              <div className="stat-item rejected">
                <div className="stat-number">{stats.rejetes}</div>
                <div className="stat-label">Rejetés</div>
              </div>
            </div>
          </section>
        )}

        {/* Liste des formulaires */}
        {formulaires.length === 0 ? (
          <section className="form-section">
            <div className="no-data">
              <p>Aucun formulaire d'inscription trouvé.</p>
            </div>
          </section>
        ) : (
          <section className="form-section">
            <h2>Liste des formulaires</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom & Prénoms</th>
                    <th>Date de naissance</th>
                    <th>Classe</th>
                    <th>Date soumission</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {formulaires.map((formulaire) => (
                    <tr key={formulaire.id}>
                      <td>{formulaire.id}</td>
                      <td>
                        <strong>{formulaire.nom} {formulaire.prenoms}</strong>
                      </td>
                      <td>
                        {formulaire.date_naissance && new Date(formulaire.date_naissance).toLocaleDateString('fr-FR')}
                      </td>
                      <td>{formulaire.classe}</td>
                      <td>
                        {formulaire.created_at && new Date(formulaire.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td>
                        <span className={`statut-badge ${getStatutClass(formulaire.statut_dossier)}`}>
                          {getStatutLabel(formulaire.statut_dossier)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <div className="form-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Retour à l'accueil
          </button>
          <button 
            className="btn btn-accent"
            onClick={() => navigate('/inscription')}
          >
            Nouvelle inscription
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatusFormulaire;