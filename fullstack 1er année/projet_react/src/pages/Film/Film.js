import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Film() {
  const [loading, setLoading] = useState(true);
  const [films, setFilm] = useState([]);

  let navigate = useNavigate();
  // Utilisation de useEffect pour charger les films au montage du composant
  useEffect(() => {
    moviesRequest();
  }, []);

  // Fonction asynchrone pour récupérer les films sur Laravel
  const moviesRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/films`);
      setFilm(response.data.film);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des films:', error);
      setLoading(false);
    }
  };

  

  // Méthode de rendu
  const MoviesRender = () => {
    return loading ? (
      <div>Chargement...</div>
    ) : (
      <div>
        {films.map((film, id) => {
          return (
            <div key={film.id}>
              <h3 onClick={()=> navigate(`/films/${id}`)}>{film.titre}</h3>
              <h3>{film.description}</h3>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className='header'>Films {films.length}</div>
      <div>{MoviesRender()}</div>
    </div>
  );
}