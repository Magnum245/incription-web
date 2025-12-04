import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Admin/styles/Login.css';
import axios from 'axios';



const Logadmin = () => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

    try{
        const response = await axios.post('http://127.0.0.1:8000/api/loginadmin', {
            nom,
            email,
            password
        }
        
    );

    if (response.data.success) {
        //stock de admin dans local storage
        localStorage.setItem('admin', JSON.stringify(response.data.admin));

        //pop-ups de bienvenu
        alert(`Bienvenue Administrateur ${response.data.admin.nom} !`);

        //redirection vers dashboard
        navigate('/dashbord');
        }

        

     }catch (error) {
        console.error(error);
        setErrorMessage('Email ou mot de passe incorrect');
     }
    };






    return (
        <div>
        
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo">
                        <i className="fas fa-shield-alt"></i>
                        <h2>Administration</h2>
                    </div>
                    <p>Accès sécurisé au panneau d'administration</p>
                </div>
                
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nom">
                            <i className="fas fa-user"></i>
                            Nom d'administrateur
                        </label>
                        <input 
                            type="text" 
                            id="nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)} 
                            // name="nom" 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">
                            <i className="fas fa-envelope"></i>
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            // name="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">
                            <i className="fas fa-lock"></i>
                            Mot de passe
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            // name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    {errorMessage && <p>{errorMessage}</p>}
                    
                    <button type="submit" className="login-btn">
                        <i className="fas fa-sign-in-alt"></i>
                        Se connecter
                    </button>
                </form>
                
                <div className="login-footer">
                    <NavLink to="#" className="forgot-password">
                        <i className="fas fa-key"></i>
                        créer un compte
                    </NavLink>
                </div>
            </div>
        </div>
        
        </div>
    );
};

export default Logadmin;