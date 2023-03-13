/* IMPORT */

import "../styles/App.scss";
import callToApi from "../services/api";
import { useEffect, useState } from "react";

function App() {
  /* VARIABLES Y DATOS */
  const [dataFetch, setDataFetch] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchcharacter, setSearchcharacter] = useState("all");
  const [newPhrase, setNewPhrase] = useState("");
  const [newCharacter, setNewCharacter] = useState("");

  /* EFECTOS */

  useEffect(() => {
    callToApi().then((response) => {
      setDataFetch(response);
    });
  }, []);

  /* FUNCIONES HANDLER */

  const handlePhrase = (ev) => {
    setSearchPhrase(ev.target.value);
  };

  const handleCharacter = (ev) => {
    setSearchcharacter(ev.target.value);
  };

  const handleNewPhrase = (ev) => {
    setNewPhrase(ev.target.value);
  };

  const handleNewCharacter = (ev) => {
    setNewCharacter(ev.target.value);
  };

  const handleForm = (ev) => {
    ev.preventDefault();
  };

  //Añadir nueva frase

  const handleButton = () => {
    const NewObject = { character: newCharacter, quote: newPhrase };
    const objectAll = [...dataFetch, NewObject];
    setDataFetch(objectAll);
  };
  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */

  const renderList = () => {
    return dataFetch
      .filter((phrase) => {
        return phrase.quote.toLowerCase().includes(searchPhrase.toLowerCase());
      })
      .filter((name) => {
        if (searchcharacter === "all") {
          return name;
        } else {
          return name.character
            .toLowerCase()
            .includes(searchcharacter.toLowerCase());
        }
      })
      .map((character, index) => {
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
            value={searchPhrase}
            onChange={handlePhrase}
          />
          <label htmlFor='character'>Filtrar por personaje:</label>
          <select
            id='character'
            name='character'
            value={searchcharacter}
            onChange={handleCharacter}
          >
            <option value='all'>Todos</option>
            <option value='ross'>Ross</option>
            <option value='monica'>Mónica</option>
            <option value='joey'>Joey</option>
            <option value='phoebe'>Phoebe</option>
            <option value='chandler'>Chandler</option>
            <option value='rachel'>Rachel</option>
          </select>

          <ul>{renderList()}</ul>
          <h2>Añadir una nueva frase</h2>
          <label htmlFor='newPhrase'>Nueva frase:</label>
          <input
            type='name'
            name='newPhrase'
            id='newPhrase'
            value={newPhrase}
            onChange={handleNewPhrase}
          />
          <label htmlFor='newCharacter'>Personaje:</label>
          <input
            type='name'
            name='newCharacter'
            id='newCharacter'
            value={newCharacter}
            onChange={handleNewCharacter}
          />
          <input
            type='submit'
            name='button'
            value='Añadir una frase'
            onClick={handleButton}
          />
        </form>
      </main>
      <footer className='footer'></footer>
    </div>
  );
}

export default App;
