import React from 'react';

const CharacterCard = ({ character }) => {
  return (
    <div className="card">
      <img src={character.image} alt={character.name} className="card-img" />
      <div className="card-content">
        <h3>{character.name}</h3>
        {/* Mínimo 4 datos: Nombre, Especie, Estado, Género */}
        <p><strong>Especie:</strong> {character.species}</p>
        <p><strong>Estado:</strong> <span className={`status ${character.status.toLowerCase()}`}>{character.status}</span></p>
        <p><strong>Género:</strong> {character.gender}</p>
      </div>
    </div>
  );
};

export default CharacterCard;