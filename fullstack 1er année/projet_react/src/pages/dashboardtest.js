import React from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
import '../Admin/styles/Dashboard.css'; // Assurez-vous que tout le CSS est harmonisé ici

const Dashboard = () => {
    const location = useLocation();

    const menuItems = [
        { id: 'dashboard', icon: 'fas fa-home', label: 'Tableau de bord', path: '/dashboard' },
        { id: 'students', icon: 'fas fa-user-graduate', label: 'Dossiers élèves', path: '/admin/students' },
        { id: 'settings', icon: 'fas fa-cog', label: 'Paramètres', path: '/admin/settings' },
        { id: 'logout', icon: 'fas fa-sign-out-alt', label: 'Déconnexion', path: '/logadmin' }
    ];

    const isActive = (path) => location.pathname === path;

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
                            <li key={item.id}>
                                {item.id === 'dashboard' ? (
                                    <NavLink 
                                        to={item.path}
                                        className={isActive(item.path) ? 'active' : ''}
                                    >
                                        <i className={item.icon}></i>
                                        <span>{item.label}</span>
                                    </NavLink>
                                ) : (
                                    <span className={isActive(item.path) ? 'active' : ''}>
                                        <i className={item.icon}></i>
                                        <span>{item.label}</span>
                                    </span>
                                )}
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
                                <h4>Admin Dupont</h4>
                                <p>Administrateur système</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="content">
                    {/* Dashboard Cards */}
                    <div className="dashboard-cards">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Total des élèves</h3>
                                <div className="card-icon blue">
                                    <i className="fas fa-user-graduate"></i>
                                </div>
                            </div>
                            <div className="card-value">1,248</div>
                            <p className="card-label">+12% ce mois-ci</p>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Formulaires en attente</h3>
                                <div className="card-icon orange">
                                    <i className="fas fa-clock"></i>
                                </div>
                            </div>
                            <div className="card-value">84</div>
                            <p className="card-label">Nécessitent une vérification</p>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Formulaires validés</h3>
                                <div className="card-icon green">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                            </div>
                            <div className="card-value">956</div>
                            <p className="card-label">Cette année scolaire</p>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Taux de complétion</h3>
                                <div className="card-icon red">
                                    <i className="fas fa-chart-pie"></i>
                                </div>
                            </div>
                            <div className="card-value">78%</div>
                            <p className="card-label">Formulaires complétés</p>
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
                                    <span className="stat-value">956</span>
                                    <span className="stat-percent">76%</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">En attente</span>
                                    <span className="stat-value">84</span>
                                    <span className="stat-percent">7%</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Rejetés</span>
                                    <span className="stat-value">32</span>
                                    <span className="stat-percent">3%</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Incomplets</span>
                                    <span className="stat-value">176</span>
                                    <span className="stat-percent">14%</span>
                                </div>
                            </div>
                        </div>

                        <div className="stats-card">
                            <h3>Activité récente</h3>
                            <div className="activity-list">
                                <div className="activity-item">
                                    <div className="activity-icon">
                                        <i className="fas fa-user-plus"></i>
                                    </div>
                                    <div className="activity-content">
                                        <p>Nouvelle inscription - Marie Dubois</p>
                                        <span className="activity-time">Il y a 5 min</span>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-icon">
                                        <i className="fas fa-check-circle"></i>
                                    </div>
                                    <div className="activity-content">
                                        <p>Formulaire validé - Jean Martin</p>
                                        <span className="activity-time">Il y a 1 heure</span>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-icon">
                                        <i className="fas fa-exclamation-triangle"></i>
                                    </div>
                                    <div className="activity-content">
                                        <p>Formulaire rejeté - Sophie Bernard</p>
                                        <span className="activity-time">Il y a 2 heures</span>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-icon">
                                        <i className="fas fa-file-upload"></i>
                                    </div>
                                    <div className="activity-content">
                                        <p>Document uploadé - Thomas Petit</p>
                                        <span className="activity-time">Il y a 3 heures</span>
                                    </div>
                                </div>
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
                            <div className="performance-value">82%</div>
                            <div className="progress-bar">
                                <div className="progress" style={{width: '82%'}}></div>
                            </div>
                            <p className="performance-label">Objectif mensuel atteint</p>
                        </div>

                        <div className="performance-card">
                            <div className="performance-header">
                                <i className="fas fa-bolt"></i>
                                <h4>Temps de traitement</h4>
                            </div>
                            <div className="performance-value">2.3j</div>
                            <div className="progress-bar">
                                <div className="progress" style={{width: '65%'}}></div>
                            </div>
                            <p className="performance-label">Moyenne par dossier</p>
                        </div>

                        <div className="performance-card">
                            <div className="performance-header">
                                <i className="fas fa-users"></i>
                                <h4>Satisfaction</h4>
                            </div>
                            <div className="performance-value">4.7/5</div>
                            <div className="progress-bar">
                                <div className="progress" style={{width: '94%'}}></div>
                            </div>
                            <p className="performance-label">Note moyenne des parents</p>
                        </div>
                    </div>

                    {/* Outlet pour routes enfants si besoin */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
