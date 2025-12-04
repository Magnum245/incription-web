import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Setting.css';

import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const Setting = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [activeTab, setActiveTab] = useState('users'); // Pour gérer les onglets
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { id: 'dashboard', icon: 'fas fa-home', label: 'Tableau de bord', path: '/dashbord' },
        { id: 'students', icon: 'fas fa-user-graduate', label: 'Dossiers élèves', path: '/dossier' },
        { id: 'settings', icon: 'fas fa-cog', label: 'Paramètres', path: '/setting' },
        { id: 'logout', icon: 'fas fa-sign-out-alt', label: 'Déconnexion', path: '/logadmin' }
    ];
    
    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('admin');
        alert('Vous avez été déconnecté avec succès.');
        navigate('/logadmin');
    };

    useEffect(() => {
        moviesRequest();
        adminRequest();
    }, []);

    const moviesRequest = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/setting`);
            setUsers(response.data.user);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des users:', error);
            setLoading(false);
        }   
    };

    const adminRequest = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/admin`);
            setAdmins(response.data.admin);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des admins:', error);
            setLoading(false);
        }   
    };

    // Fonction pour supprimer un compte admin
    const deleteAdmin = async (adminId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte administrateur ?')) {
            try {
                await axios.delete(`http://localhost:8000/api/admin/${adminId}`);
                alert('Compte administrateur supprimé avec succès');
                // Recharger la liste des admins
                adminRequest();
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert('Erreur lors de la suppression du compte');
            }
        }
    };

    const UsersRender = () => {
        return loading ? (
            <div className="loading">Chargement...</div>
        ) : (
            <div className="users-section">
                <h3>Liste des Utilisateurs ({users.length})</h3>
                <div className="users-grid">
                    {users.map((user) => (
                        <div key={user.id} className="user-card">
                            <div className="user-info">
                                <h4>Utilisateur #{user.id}</h4>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Profil:</strong> {user.profil}</p>
                                <p><strong>Téléphone:</strong> {user.telephone}</p>
                            </div>
                            {/* Supprimé la section user-actions avec le bouton supprimer */}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const AdminsRender = () => {
        return loading ? (
            <div className="loading">Chargement...</div>
        ) : (
            <div className="admins-section">
                <h3>Liste des Administrateurs ({admins.length})</h3>
                <div className="admins-grid">
                    {admins.map((admin) => (
                        <div key={admin.id} className="admin-card">
                            <div className="admin-info">
                                <h4>Administrateur #{admin.id}</h4>
                                <p><strong>Nom:</strong> {admin.nom}</p>
                                <p><strong>Email:</strong> {admin.email}</p>
                            </div>
                            <div className="admin-actions">
                                <button 
                                    className="btn-delete"
                                    onClick={() => deleteAdmin(admin.id)}
                                >
                                    <i className="fas fa-trash"></i> Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="admin-layout">
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
            <div className="main-content-wrapper">
                <header className="header">
                    <div className="header-left">
                        <h2>Gestion des Comptes</h2>
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

                <main className="main-content">
                    {/* Navigation par onglets */}
                    <div className="tabs-navigation">
                        <button 
                            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            Utilisateurs ({users.length})
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'admins' ? 'active' : ''}`}
                            onClick={() => setActiveTab('admins')}
                        >
                            Administrateurs ({admins.length})
                        </button>
                    </div>

                    {/* Contenu des onglets */}
                    <div className="tab-content">
                        {activeTab === 'users' && <UsersRender />}
                        {activeTab === 'admins' && <AdminsRender />}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Setting;