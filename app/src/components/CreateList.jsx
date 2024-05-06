import React, { useState } from 'react';
import './CreateList.css';

function CreateList() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [isSetter, setIsSetter] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleIsSetterChange = (e) => {
    setIsSetter(e.target.checked);
  };

  const handleIsFemaleChange = (e) => {
    setIsFemale(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[editIndex] = {
        name: name,
        isSetter: isSetter,
        isFemale: isFemale
      };
      setPlayers(updatedPlayers);
      setEditIndex(null);
    } else {
      const newPlayer = {
        name: name,
        isSetter: isSetter,
        isFemale: isFemale
      };
      setPlayers([...players, newPlayer]);
    }
    // Clear input fields
    setName('');
    setIsSetter(false);
    setIsFemale(false);
  };

  const handleEdit = (index) => {
    const playerToEdit = players[index];
    setName(playerToEdit.name);
    setIsSetter(playerToEdit.isSetter);
    setIsFemale(playerToEdit.isFemale);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  return (
    <div>
      <h2>Organizador de Listas de Vôlei</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Levantador:
          <input type="checkbox" checked={isSetter} onChange={handleIsSetterChange} />
        </label>
        <label>
          Feminino:
          <input type="checkbox" checked={isFemale} onChange={handleIsFemaleChange} />
        </label>
        <button type="submit">{editIndex !== null ? 'Editar Jogador' : 'Adicionar Jogador'}</button>
      </form>
      <h3>Lista de Jogadores:</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index} className={`player ${player.isSetter ? 'setter' : ''} ${player.isFemale ? 'female' : ''}`}>
            {player.name} - {player.isSetter ? 'Levantador' : 'Não Levantador'} - {player.isFemale ? 'Feminino' : 'Masculino'}
            <button onClick={() => handleEdit(index)}>Editar</button>
            <button onClick={() => handleDelete(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateList;
