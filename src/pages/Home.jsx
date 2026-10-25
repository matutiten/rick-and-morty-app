import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  // Estados (Requisito: Uso de useState)
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Llamada a la API (Requisito: fetch)
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        // Traemos los primeros 20 personajes
        const response = await fetch('https://rickandmortyapi.com/api/character');
        
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        
        const data = await response.json();
        setCharacters(data.results); // Guardamos el array de personajes
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Filtrado en tiempo real (Requisito Plus)
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <h1>Personajes de Rick and Morty</h1>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading && <p className="message">Cargando personajes...</p>}
      
      {error && <p className="message error">Error: {error}</p>}

      {!loading && !error && filteredCharacters.length === 0 && (
        <p className="message">No se encontraron personajes con ese nombre.</p>
      )}

      <div className="cards-grid">
        {!loading && !error && filteredCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Home;