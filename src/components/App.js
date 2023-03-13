/* IMPORT */

import "../styles/App.scss";
import callToApi from "../services/api";
import { useEffect, useState } from "react";

function App() {
  /* VARIABLES Y DATOS */
  const [data, setData] = useState([]);
  const [phrase, setPhrase] = useState("");
  const [character, setcharacter] = useState("all");

  /* EFECTOS */

  useEffect(() => {
    callToApi().then((response) => {
      setData(response);
    });
  }, []);

  console.log(data);

  /* FUNCIONES HANDLER */

  const handlePhrase = (ev) => {
    setPhrase(ev.target.value);
  };

  const handleCharacter = (ev) => {
    setcharacter(ev.target.value);
  };

  const handleForm = (ev) => {
    ev.preventDefault();
  };

  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */

  const renderList = () => {
    return data.map((character, index) => {
      return (
        <li key={index}>
          <p>
            {character.quote} - <strong>{character.character}</strong>
          </p>
        </li>
      );
    });
  };

  /* HTML */
  return (
    <div className='App'>
      <header className='header'>
        <h1 className='header__title'>Frases de friends</h1>
      </header>
      <main className='main'>
        <form onSubmit={handleForm}>
          <label htmlFor='phrase'>Filtrar por frase:</label>
          <input
            type='name'
            name='phrase'
            id='phrase'
            value={phrase}
            onChange={handlePhrase}
          />
          <label htmlFor='character'>Filtrar por personaje:</label>
          <select
            id='character'
            name='character'
            onChange={handleCharacter}
            value={character}
          >
            <option value='all'>Todos</option>
            <option value='ross'>Ross</option>
            <option value='monica'>Mónica</option>
            <option value='joey'>Joey</option>
            <option value='phoebe'>Phoebe</option>
            <option value='chandler'>Chandler</option>
            <option value='rachel'>Rachel</option>
          </select>
        </form>
        <ul>{renderList()}</ul>
      </main>
      <footer className='footer'></footer>
    </div>
  );
}

export default App;
