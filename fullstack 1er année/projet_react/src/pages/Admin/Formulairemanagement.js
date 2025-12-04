import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faEye, 
  faCheck, 
  faTimes, 
  faFilter,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import '../Admin/styles/Formulairemanagement.css';

const FormulaireManagement = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formulaires, setFormulaires] = useState([]);
    const [filteredFormulaires, setFilteredFormulaires] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [filters, setFilters] = useState({
        statut: 'tous',
        classe: 'toutes',
        search: ''
    });

    const menuItems = [
        { id: 'dashboard', icon: 'fas fa-home', label: 'Tableau de bord', path: '/dashbord' },
        { id: 'students', icon: 'fas fa-user-graduate', label: 'Dossiers élèves', path: '/dossier' },
        { id: 'settings', icon: 'fas fa-cog', label: 'Paramètres', path: '/setting' },
        { id: 'logout', icon: 'fas fa-sign-out-alt', label: 'Déconnexion', path: '/logadmin' }
    ];

    const isActive = (path) => location.pathname === path;

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

    const handleFilterChange = (filterName, value) => {
        const newFilters = {
            ...filters,
            [filterName]: value
        };
        setFilters(newFilters);
        filterFormulaires(newFilters);
    };

    const filterFormulaires = (currentFilters) => {
        let filtered = [...formulaires];

        if (currentFilters.statut !== 'tous') {
            filtered = filtered.filter(form => form.statut_dossier === currentFilters.statut);
        }

        if (currentFilters.classe !== 'toutes') {
            filtered = filtered.filter(form => form.classe === currentFilters.classe);
        }

        if (currentFilters.search) {
            const searchLower = currentFilters.search.toLowerCase();
            filtered = filtered.filter(form => 
                form.nom.toLowerCase().includes(searchLower) ||
                form.prenoms.toLowerCase().includes(searchLower)
            );
        }

        setFilteredFormulaires(filtered);
    };

    const handleValider = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/formulaire/${id}/valider`);
            
            if (response.data.status === 200) {
                setFormulaires(prev => 
                    prev.map(form => 
                        form.id === id ? { ...form, statut_dossier: 'valide' } : form
                    )
                );
                setFilteredFormulaires(prev => 
                    prev.map(form => 
                        form.id === id ? { ...form, statut_dossier: 'valide' } : form
                    )
                );
                setSelectedForm(null);
                alert('Formulaire validé avec succès !');
            } else {
                alert(response.data.error || 'Erreur lors de la validation');
            }
        } catch (error) {
            console.error('Erreur lors de la validation:', error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('Erreur lors de la validation du formulaire');
            }
        }
    };

    const handleRejeter = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/formulaire/${id}/rejeter`);
            
            if (response.data.status === 200) {
                setFormulaires(prev => 
                    prev.map(form => 
                        form.id === id ? { ...form, statut_dossier: 'rejete' } : form
                    )
                );
                setFilteredFormulaires(prev => 
                    prev.map(form => 
                        form.id === id ? { ...form, statut_dossier: 'rejete' } : form
                    )
                );
                setSelectedForm(null);
                alert('Formulaire rejeté !');
            } else {
                alert(response.data.error || 'Erreur lors du rejet');
            }
        } catch (error) {
            console.error('Erreur lors du rejet:', error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('Erreur lors du rejet du formulaire');
            }
        }
    };

    const handleVoirDetails = (formulaire) => {
        setSelectedForm(formulaire);
    };

    const handleFermerDetails = () => {
        setSelectedForm(null);
    };

    const getStats = () => {
        const total = formulaires.length;
        const enAttente = formulaires.filter(f => f.statut_dossier === 'En attente').length;
        const valides = formulaires.filter(f => f.statut_dossier === 'valide').length;
        const rejetes = formulaires.filter(f => f.statut_dossier === 'rejete').length;

        return { total, enAttente, valides, rejetes };
    };

    const stats = getStats();

    const handleLogout = () => {
        localStorage.removeItem('admin');
        alert('Vous avez été déconnecté avec succès.');
        navigate('/logadmin');
    };

    useEffect(() => {
        fetchFormulaires();
    }, []);

    const fetchFormulaires = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/dossier`);
            setFormulaires(response.data.formulaire || []);
            setFilteredFormulaires(response.data.formulaire || []);
        } catch (error) {
            console.error('Erreur lors de la récupération des formulaires:', error);
            setFormulaires([]);
            setFilteredFormulaires([]);
        }   
    };

    if (formulaires.length === 0) {
        return (
            <div className="admin-container">
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <h3>Espace Admin</h3>
                        <p>Gestion des inscriptions</p>
                    </div>
                    <nav className="sidebar-menu">
                        <ul>
                            {menuItems.map((item) => (
                                <li key={item.id} onClick={item.label === 'Déconnexion' ? handleLogout : null}>
                                    <NavLink 
                                        to={item.path}
                                        className={isActive(item.path) ? 'active' : ''}
                                    >
                                        <i className={item.icon}></i>
                                        <span>{item.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className="main-content">
                    <header className="header">
                        <div className="header-left">
                            <h2>Gestion des Formulaires d'Inscription</h2>
                        </div>
                        <div className="header-right">
                            <div className="admin-profile">
                                <div className="admin-avatar">AD</div>
                                <div className="admin-info">
                                    <h4>Allan</h4>
                                    <p>Administrateur système</p>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="content">
                        <div className="no-data">
                            <p>Aucun formulaire disponible pour le moment</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h3>Espace Admin</h3>
                    <p>Gestion des inscriptions</p>
                </div>
                <nav className="sidebar-menu">
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.id} onClick={item.label === 'Déconnexion' ? handleLogout : null}>
                                <NavLink 
                                    to={item.path}
                                    className={isActive(item.path) ? 'active' : ''}
                                >
                                    <i className={item.icon}></i>
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <header className="header">
                    <div className="header-left">
                        <h2>Gestion des Formulaires d'Inscription</h2>
                    </div>
                    <div className="header-right">
                        <div className="admin-profile">
                            <div className="admin-avatar">AD</div>
                            <div className="admin-info">
                                <h4>Allan</h4>
                                <p>Administrateur système</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="content">
                    <div className="stats-cards">
                        <div className="stat-card total">
                            <div className="stat-icon">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className="stat-content">
                                <h3>{stats.total}</h3>
                                <p>Total des formulaires</p>
                            </div>
                        </div>
                        <div className="stat-card pending">
                            <div className="stat-icon">
                                <FontAwesomeIcon icon={faFilter} />
                            </div>
                            <div className="stat-content">
                                <h3>{stats.enAttente}</h3>
                                <p>En attente</p>
                            </div>
                        </div>
                        <div className="stat-card validated">
                            <div className="stat-icon">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <div className="stat-content">
                                <h3>{stats.valides}</h3>
                                <p>Validés</p>
                            </div>
                        </div>
                        <div className="stat-card rejected">
                            <div className="stat-icon">
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                            <div className="stat-content">
                                <h3>{stats.rejetes}</h3>
                                <p>Rejetés</p>
                            </div>
                        </div>
                    </div>

                    <div className="filters-section">
                        <div className="search-box">
                            <FontAwesomeIcon icon={faSearch} />
                            <input
                                type="text"
                                placeholder="Rechercher par nom ou prénom..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <FontAwesomeIcon icon={faFilter} />
                            <select
                                value={filters.statut}
                                onChange={(e) => handleFilterChange('statut', e.target.value)}
                            >
                                <option value="tous">Tous les statuts</option>
                                <option value="En attente">En attente</option>
                                <option value="valide">Validés</option>
                                <option value="rejete">Rejetés</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <select
                                value={filters.classe}
                                onChange={(e) => handleFilterChange('classe', e.target.value)}
                            >
                                <option value="toutes">Toutes les classes</option>
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
                    </div>

                    <div className="formulaires-table-container">
                        <table className="formulaires-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom & Prénoms</th>
                                    <th>Date de naissance</th>
                                    <th>Classe</th>
                                    <th>Date soumission</th>
                                    <th>Statut</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFormulaires.map((formulaire) => (
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
                                        <td>
                                            <div className="actions-buttons">
                                                <button
                                                    className="btn-view"
                                                    onClick={() => handleVoirDetails(formulaire)}
                                                >
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                                {formulaire.statut_dossier === 'En attente' && (
                                                    <>
                                                        <button
                                                            className="btn-validate"
                                                            onClick={() => handleValider(formulaire.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faCheck} />
                                                        </button>
                                                        <button
                                                            className="btn-reject"
                                                            onClick={() => handleRejeter(formulaire.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTimes} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredFormulaires.length === 0 && (
                            <div className="no-data">
                                <p>Aucun formulaire trouvé avec les filtres actuels</p>
                            </div>
                        )}
                    </div>

                    {/* Modal de détails - CONTENU AJOUTÉ */}
                    {selectedForm && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2>Détails du Formulaire #{selectedForm.id}</h2>
                                    <button className="close-btn" onClick={handleFermerDetails}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>

                                <div className="modal-body">
                                    <div className="detail-section">
                                        <h3>Informations Personnelles</h3>
                                        <div className="detail-grid">
                                            <div className="detail-item">
                                                <label>Nom :</label>
                                                <span>{selectedForm.nom}</span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Prénoms :</label>
                                                <span>{selectedForm.prenoms}</span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Date de naissance :</label>
                                                <span>
                                                    {selectedForm.date_naissance && new Date(selectedForm.date_naissance).toLocaleDateString('fr-FR')}
                                                </span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Sexe :</label>
                                                <span>{selectedForm.sexe === 'M' ? 'Masculin' : 'Féminin'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="detail-section">
                                        <h3>Informations Scolaires</h3>
                                        <div className="detail-grid">
                                            <div className="detail-item">
                                                <label>Classe demandée :</label>
                                                <span>{selectedForm.classe}</span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Date de soumission :</label>
                                                <span>
                                                    {selectedForm.created_at && new Date(selectedForm.created_at).toLocaleDateString('fr-FR')}
                                                </span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Statut :</label>
                                                <span className={`statut-badge ${getStatutClass(selectedForm.statut_dossier)}`}>
                                                    {getStatutLabel(selectedForm.statut_dossier)}
                                                </span>
                                            </div>
                                            {selectedForm.date_validation && (
                                                <div className="detail-item">
                                                    <label>Date de traitement :</label>
                                                    <span>
                                                        {new Date(selectedForm.date_validation).toLocaleDateString('fr-FR')}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    {selectedForm.statut_dossier === 'En attente' && (
                                        <>
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handleValider(selectedForm.id)}
                                            >
                                                <FontAwesomeIcon icon={faCheck} /> Valider
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleRejeter(selectedForm.id)}
                                            >
                                                <FontAwesomeIcon icon={faTimes} /> Rejeter
                                            </button>
                                        </>
                                    )}
                                    <button className="btn btn-secondary" onClick={handleFermerDetails}>
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default FormulaireManagement;