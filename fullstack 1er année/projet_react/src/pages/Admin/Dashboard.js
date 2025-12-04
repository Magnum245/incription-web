import React, {useState, useEffect} from 'react';
import { NavLink, useLocation, Outlet, useNavigate } from 'react-router-dom';
import '../Admin/styles/Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
    const [nom, ] = useState('');
    const [email, ] = useState('');
    const [password, ] = useState('');
    const [stats, setStats] = useState({
        totalEleves: 0,
        formulairesEnAttente: 0,
        formulairesValides: 0,
        tauxCompletion: 0,
        statutFormulaires: {
            valides: 0,
            enAttente: 0,
            rejetes: 0,
            incomplets: 0
        },
        activiteRecente: [],
        performance: {
            generale: 0,
            tempsTraitement: 0,
            satisfaction: 0
        }
    });
    const [loading, setLoading] = useState(true);
    
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { id: 'dashboard', icon: 'fas fa-home', label: 'Tableau de bord', path: '/dashbord' },
        { id: 'students', icon: 'fas fa-user-graduate', label: 'Dossiers élèves', path: '/dossier' },
        { id: 'settings', icon: 'fas fa-cog', label: 'Paramètres', path: '/setting' },
        { id: 'logout', icon: 'fas fa-sign-out-alt', label: 'Déconnexion', path: '/logadmin', }
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('admin');
        alert('Vous avez été déconnecté avec succès.');
        navigate('/logadmin');
    };

    // Récupération des statistiques
    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            
            // Récupérer le total des utilisateurs (élèves)
            const usersResponse = await axios.get('http://localhost:8000/api/setting');
            const totalEleves = usersResponse.data.user?.length || 0;

            // Récupérer tous les formulaires
            const formulairesResponse = await axios.get('http://localhost:8000/api/dossier');
            const formulaires = formulairesResponse.data.formulaire || [];
            
            // Calculer les statistiques basées sur statut_dossier
            const formulairesValides = formulaires.filter(f => f.statut_dossier === 'valide').length;
            const formulairesEnAttente = formulaires.filter(f => f.statut_dossier === 'En attente').length;
            const formulairesRejetes = formulaires.filter(f => f.statut_dossier === 'rejete').length;
            
            // Pour "incomplets", on considère qu'il n'y en a pas dans votre modèle actuel
            const formulairesIncomplets = 0;
            
            const totalFormulaires = formulaires.length;
            const tauxCompletion = totalFormulaires > 0 ? Math.round((formulairesValides / totalFormulaires) * 100) : 0;

            // Calculer les pourcentages pour le statut des formulaires
            const pourcentageValides = totalFormulaires > 0 ? Math.round((formulairesValides / totalFormulaires) * 100) : 0;
            const pourcentageEnAttente = totalFormulaires > 0 ? Math.round((formulairesEnAttente / totalFormulaires) * 100) : 0;
            const pourcentageRejetes = totalFormulaires > 0 ? Math.round((formulairesRejetes / totalFormulaires) * 100) : 0;
            const pourcentageIncomplets = totalFormulaires > 0 ? Math.round((formulairesIncomplets / totalFormulaires) * 100) : 0;

            // Générer l'activité récente à partir des formulaires
            const activiteRecente = generateActiviteRecente(formulaires);

            setStats({
                totalEleves,
                formulairesEnAttente,
                formulairesValides,
                tauxCompletion,
                statutFormulaires: {
                    valides: formulairesValides,
                    enAttente: formulairesEnAttente,
                    rejetes: formulairesRejetes,
                    incomplets: formulairesIncomplets,
                    pourcentageValides,
                    pourcentageEnAttente,
                    pourcentageRejetes,
                    pourcentageIncomplets
                },
                activiteRecente,
                performance: {
                    generale: tauxCompletion,
                    tempsTraitement: calculerTempsMoyenTraitement(formulaires),
                    satisfaction: 4.7 // Valeur par défaut
                }
            });
            
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des statistiques:', error);
            setLoading(false);
        }
    };

    // Générer l'activité récente à partir des formulaires
    const generateActiviteRecente = (formulaires) => {
        const activites = [];
        
        // Trier les formulaires par date de création récente
        const formulairesRecents = [...formulaires]
            .sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation))
            .slice(0, 4);
        
        formulairesRecents.forEach(formulaire => {
            let icon, description;
            
            switch(formulaire.statut_dossier) {
                case 'valide':
                    icon = 'fa-check-circle';
                    description = `Formulaire validé - ${formulaire.prenoms} ${formulaire.nom}`;
                    break;
                case 'rejete':
                    icon = 'fa-exclamation-triangle';
                    description = `Formulaire rejeté - ${formulaire.prenoms} ${formulaire.nom}`;
                    break;
                case 'En attente':
                    icon = 'fa-user-plus';
                    description = `Nouvelle inscription - ${formulaire.prenoms} ${formulaire.nom}`;
                    break;
                default:
                    icon = 'fa-bell';
                    description = `Activité - ${formulaire.prenoms} ${formulaire.nom}`;
            }
            
            activites.push({
                icon,
                description,
                date: formulaire.date_creation
            });
        });
        
        return activites;
    };

    // Calculer le temps moyen de traitement
    const calculerTempsMoyenTraitement = (formulaires) => {
        const formulairesTraites = formulaires.filter(f => 
            f.statut_dossier === 'valide' || f.statut_dossier === 'rejete'
        );
        
        if (formulairesTraites.length === 0) return 2.3; // Valeur par défaut
        
        let totalJours = 0;
        formulairesTraites.forEach(formulaire => {
            if (formulaire.date_creation && formulaire.date_validation) {
                const dateCreation = new Date(formulaire.date_creation);
                const dateValidation = new Date(formulaire.date_validation);
                const diffJours = (dateValidation - dateCreation) / (1000 * 60 * 60 * 24);
                totalJours += diffJours;
            }
        });
        
        return totalJours > 0 ? (totalJours / formulairesTraites.length).toFixed(1) : 2.3;
    };

    // Fonction pour formater la date relative
    const getRelativeTime = (dateString) => {
        if (!dateString) return 'Date inconnue';
        
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) {
            return 'À l\'instant';
        } else if (diffInMinutes < 60) {
            return `Il y a ${diffInMinutes} min`;
        } else if (diffInMinutes < 1440) {
            const hours = Math.floor(diffInMinutes / 60);
            return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
        } else {
            const days = Math.floor(diffInMinutes / 1440);
            return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/loginadmin`, {
                nom,
                email,
                password
            }, { withCredentials: true});

            if (response.status === 200) {
                //rediriger ou stocker l'etat connecté
            }
        } catch (error) {
            console.error(error.response?.data?.message || 'Erreur');
        }
    }

    return (
        <div className="admin-container">
            {/* Sidebar */}
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

            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <header className="header">
                    <div className="header-left">
                        <h2>Tableau de bord administrateur</h2>
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

                {/* Dashboard Content */}
                <div className="content">
                    {loading ? (
                        <div className="loading">Chargement des statistiques...</div>
                    ) : (
                        <>
                            {/* Dashboard Cards */}
                            <div className="dashboard-cards">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Total des élèves</h3>
                                        <div className="card-icon blue">
                                            <i className="fas fa-user-graduate"></i>
                                        </div>
                                    </div>
                                    <div className="card-value">{stats.totalEleves.toLocaleString()}</div>
                                    <p className="card-label">Inscrits au total</p>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Formulaires en attente</h3>
                                        <div className="card-icon orange">
                                            <i className="fas fa-clock"></i>
                                        </div>
                                    </div>
                                    <div className="card-value">{stats.formulairesEnAttente}</div>
                                    <p className="card-label">Nécessitent une vérification</p>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Formulaires validés</h3>
                                        <div className="card-icon green">
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                    </div>
                                    <div className="card-value">{stats.formulairesValides}</div>
                                    <p className="card-label">Cette année scolaire</p>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Taux de complétion</h3>
                                        <div className="card-icon red">
                                            <i className="fas fa-chart-pie"></i>
                                        </div>
                                    </div>
                                    <div className="card-value">{stats.tauxCompletion}%</div>
                                    <p className="card-label">Formulaires traités</p>
                                </div>
                            </div>

                            {/* Graphiques */}
                            <div className="charts-container">
                                <div className="chart-card">
                                    <div className="chart-header">
                                        <h3>Inscriptions par mois</h3>
                                        <select className="chart-filter">
                                            <option>Cette année</option>
                                            <option>L'année dernière</option>
                                            <option>Toutes périodes</option>
                                        </select>
                                    </div>
                                    <div className="chart-placeholder">
                                        <i className="fas fa-chart-bar chart-icon"></i>
                                        <p>Graphique des inscriptions mensuelles</p>
                                        <small>Total: {stats.totalEleves} élèves</small>
                                    </div>
                                </div>

                                <div className="chart-card">
                                    <div className="chart-header">
                                        <h3>Répartition par classe</h3>
                                        <select className="chart-filter">
                                            <option>Tous niveaux</option>
                                            <option>Secondaire</option>
                                            <option>Lycée</option>
                                        </select>
                                    </div>
                                    <div className="chart-placeholder">
                                        <i className="fas fa-chart-pie chart-icon"></i>
                                        <p>Graphique circulaire des classes</p>
                                        <small>{stats.formulairesValides + stats.formulairesEnAttente + stats.statutFormulaires.rejetes} formulaires</small>
                                    </div>
                                </div>
                            </div>

                            {/* Statistiques */}
                            <div className="stats-grid">
                                <div className="stats-card">
                                    <h3>Statut des formulaires</h3>
                                    <div className="stats-list">
                                        <div className="stat-item">
                                            <span className="stat-label">Validés</span>
                                            <span className="stat-value">{stats.statutFormulaires.valides}</span>
                                            <span className="stat-percent">{stats.statutFormulaires.pourcentageValides}%</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">En attente</span>
                                            <span className="stat-value">{stats.statutFormulaires.enAttente}</span>
                                            <span className="stat-percent">{stats.statutFormulaires.pourcentageEnAttente}%</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Rejetés</span>
                                            <span className="stat-value">{stats.statutFormulaires.rejetes}</span>
                                            <span className="stat-percent">{stats.statutFormulaires.pourcentageRejetes}%</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Total formulaires</span>
                                            <span className="stat-value">{stats.statutFormulaires.valides + stats.statutFormulaires.enAttente + stats.statutFormulaires.rejetes}</span>
                                            <span className="stat-percent">100%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="stats-card">
                                    <h3>Activité récente</h3>
                                    <div className="activity-list">
                                        {stats.activiteRecente.length > 0 ? (
                                            stats.activiteRecente.map((activite, index) => (
                                                <div key={index} className="activity-item">
                                                    <div className="activity-icon">
                                                        <i className={`fas ${activite.icon}`}></i>
                                                    </div>
                                                    <div className="activity-content">
                                                        <p>{activite.description}</p>
                                                        <span className="activity-time">
                                                            {getRelativeTime(activite.date)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="activity-item">
                                                <div className="activity-icon">
                                                    <i className="fas fa-info-circle"></i>
                                                </div>
                                                <div className="activity-content">
                                                    <p>Aucune activité récente</p>
                                                    <span className="activity-time">--</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Indicateurs de performance */}
                            <div className="performance-cards">
                                <div className="performance-card">
                                    <div className="performance-header">
                                        <i className="fas fa-tachometer-alt"></i>
                                        <h4>Performance générale</h4>
                                    </div>
                                    <div className="performance-value">{stats.performance.generale}%</div>
                                    <div className="progress-bar">
                                        <div className="progress" style={{width: `${stats.performance.generale}%`}}></div>
                                    </div>
                                    <p className="performance-label">Taux de traitement</p>
                                </div>

                                <div className="performance-card">
                                    <div className="performance-header">
                                        <i className="fas fa-bolt"></i>
                                        <h4>Temps de traitement</h4>
                                    </div>
                                    <div className="performance-value">{stats.performance.tempsTraitement}j</div>
                                    <div className="progress-bar">
                                        <div className="progress" style={{width: '65%'}}></div>
                                    </div>
                                    <p className="performance-label">Moyenne par dossier</p>
                                </div>

                                <div className="performance-card">
                                    <div className="performance-header">
                                        <i className="fas fa-chart-line"></i>
                                        <h4>Efficacité</h4>
                                    </div>
                                    <div className="performance-value">{stats.statutFormulaires.pourcentageValides}%</div>
                                    <div className="progress-bar">
                                        <div className="progress" style={{width: `${stats.statutFormulaires.pourcentageValides}%`}}></div>
                                    </div>
                                    <p className="performance-label">Taux de validation</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Outlet pour routes enfants si besoin */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;