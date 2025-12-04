// import React, { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faSearch, 
//   faEye,
//   faUsers,
//   faUserCheck,
//   faUserClock
// } from '@fortawesome/free-solid-svg-icons';
// import '../Admin/styles/GestionComptes.css';

// const GestionComptesClients = () => {
//     const location = useLocation();
//     const [clients, setClients] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedClient, setSelectedClient] = useState(null);

//     const menuItems = [
//         { id: 'dashboard', icon: 'fas fa-home', label: 'Tableau de bord', path: '/dashboard' },
//         { id: 'students', icon: 'fas fa-user-graduate', label: 'Dossiers élèves', path: '/dossier' },
//         { id: 'admin-accounts', icon: 'fas fa-user-shield', label: 'Comptes Admin', path: '/admin/comptes' },
//         { id: 'user-accounts', icon: 'fas fa-users', label: 'Comptes Clients', path: '/admin/clients' },
//         { id: 'settings', icon: 'fas fa-cog', label: 'Paramètres', path: '/admin/settings' },
//         { id: 'logout', icon: 'fas fa-sign-out-alt', label: 'Déconnexion', path: '/logadmin' }
//     ];

//     const isActive = (path) => location.pathname === path;

//     const filteredClients = clients.filter(client =>
//         client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         client.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleViewDetails = (client) => {
//         setSelectedClient(client);
//     };

//     const handleCloseDetails = () => {
//         setSelectedClient(null);
//     };

//     const getStats = () => {
//         const total = clients.length;
//         const actifs = clients.filter(client => client.statut === 'actif').length;
//         const inactifs = clients.filter(client => client.statut === 'inactif').length;

//         return { total, actifs, inactifs };
//     };

//     const stats = getStats();

//     return (
//         <div className="admin-container">
//             {/* Sidebar */}
//             <aside className="sidebar">
//                 <div className="sidebar-header">
//                     <h3>Espace Admin</h3>
//                     <p>Gestion des inscriptions</p>
//                 </div>

//                 <nav className="sidebar-menu">
//                     <ul>
//                         {menuItems.map((item) => (
//                             <li key={item.id}>
//                                 <NavLink 
//                                     to={item.path}
//                                     className={isActive(item.path) ? 'active' : ''}
//                                 >
//                                     <i className={item.icon}></i>
//                                     <span>{item.label}</span>
//                                 </NavLink>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>
//             </aside>

//             {/* Main Content */}
//             <main className="main-content">
//                 {/* Header */}
//                 <header className="header">
//                     <div className="header-left">
//                         <h2>Gestion des Comptes Clients</h2>
//                     </div>
//                     <div className="header-right">
//                         <div className="admin-profile">
//                             <div className="admin-avatar">AD</div>
//                             <div className="admin-info">
//                                 <h4>Admin Dupont</h4>
//                                 <p>Administrateur système</p>
//                             </div>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Content */}
//                 <div className="content">
//                     {/* Statistiques */}
//                     <div className="stats-cards">
//                         <div className="stat-card total">
//                             <div className="stat-icon">
//                                 <FontAwesomeIcon icon={faUsers} />
//                             </div>
//                             <div className="stat-content">
//                                 <h3>{stats.total}</h3>
//                                 <p>Total clients</p>
//                             </div>
//                         </div>

//                         <div className="stat-card active">
//                             <div className="stat-icon">
//                                 <FontAwesomeIcon icon={faUserCheck} />
//                             </div>
//                             <div className="stat-content">
//                                 <h3>{stats.actifs}</h3>
//                                 <p>Comptes actifs</p>
//                             </div>
//                         </div>

//                         <div className="stat-card inactive">
//                             <div className="stat-icon">
//                                 <FontAwesomeIcon icon={faUserClock} />
//                             </div>
//                             <div className="stat-content">
//                                 <h3>{stats.inactifs}</h3>
//                                 <p>Comptes inactifs</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Barre de recherche */}
//                     <div className="action-bar">
//                         <div className="search-box">
//                             <FontAwesomeIcon icon={faSearch} />
//                             <input
//                                 type="text"
//                                 placeholder="Rechercher un client..."
//                                 value={searchTerm}
//                                 onChange={handleSearchChange}
//                             />
//                         </div>
//                     </div>

//                     {/* Tableau des clients */}
//                     <div className="table-container">
//                         <table className="accounts-table">
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Nom & Prénom</th>
//                                     <th>Email</th>
//                                     <th>Téléphone</th>
//                                     <th>Statut</th>
//                                     <th>Date inscription</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredClients.map((client) => (
//                                     <tr key={client.id}>
//                                         <td>#{client.id}</td>
//                                         <td>
//                                             <strong>{client.nom} {client.prenom}</strong>
//                                         </td>
//                                         <td>{client.email}</td>
//                                         <td>{client.telephone || 'Non renseigné'}</td>
//                                         <td>
//                                             <span className={`status-badge ${client.statut}`}>
//                                                 {client.statut === 'actif' ? 'Actif' : 'Inactif'}
//                                             </span>
//                                         </td>
//                                         <td>
//                                             {client.date_inscription && new Date(client.date_inscription).toLocaleDateString('fr-FR')}
//                                         </td>
//                                         <td>
//                                             <div className="actions-buttons">
//                                                 <button
//                                                     className="btn-view"
//                                                     onClick={() => handleViewDetails(client)}
//                                                 >
//                                                     <FontAwesomeIcon icon={faEye} />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         {filteredClients.length === 0 && (
//                             <div className="no-data">
//                                 <p>Aucun client trouvé</p>
//                             </div>
//                         )}
//                     </div>

//                     {/* Modal de détails */}
//                     {selectedClient && (
//                         <div className="modal-overlay">
//                             <div className="modal-content">
//                                 <div className="modal-header">
//                                     <h2>Détails du Client #{selectedClient.id}</h2>
//                                     <button className="close-btn" onClick={handleCloseDetails}>
//                                         <FontAwesomeIcon icon={faTimes} />
//                                     </button>
//                                 </div>

//                                 <div className="modal-body">
//                                     <div className="detail-section">
//                                         <h3>Informations Personnelles</h3>
//                                         <div className="detail-grid">
//                                             <div className="detail-item">
//                                                 <label>Nom :</label>
//                                                 <span>{selectedClient.nom}</span>
//                                             </div>
//                                             <div className="detail-item">
//                                                 <label>Prénom :</label>
//                                                 <span>{selectedClient.prenom}</span>
//                                             </div>
//                                             <div className="detail-item">
//                                                 <label>Email :</label>
//                                                 <span>{selectedClient.email}</span>
//                                             </div>
//                                             <div className="detail-item">
//                                                 <label>Téléphone :</label>
//                                                 <span>{selectedClient.telephone || 'Non renseigné'}</span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="detail-section">
//                                         <h3>Informations du Compte</h3>
//                                         <div className="detail-grid">
//                                             <div className="detail-item">
//                                                 <label>Statut :</label>
//                                                 <span className={`status-badge ${selectedClient.statut}`}>
//                                                     {selectedClient.statut === 'actif' ? 'Actif' : 'Inactif'}
//                                                 </span>
//                                             </div>
//                                             <div className="detail-item">
//                                                 <label>Date d'inscription :</label>
//                                                 <span>
//                                                     {selectedClient.date_inscription && new Date(selectedClient.date_inscription).toLocaleDateString('fr-FR')}
//                                                 </span>
//                                             </div>
//                                             <div className="detail-item">
//                                                 <label>Dernière connexion :</label>
//                                                 <span>
//                                                     {selectedClient.derniere_connexion ? 
//                                                         new Date(selectedClient.derniere_connexion).toLocaleDateString('fr-FR') : 
//                                                         'Jamais connecté'
//                                                     }
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="modal-footer">
//                                     <button className="btn btn-secondary" onClick={handleCloseDetails}>
//                                         Fermer
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default GestionComptesClients;