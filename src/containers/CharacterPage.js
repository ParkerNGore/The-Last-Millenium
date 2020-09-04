import React from "react";
import NavManager from "../components/NavManager";
import Modal from "../components/Modal";
import AddEditCharacterForm from "../components/AddEditCharacterForm";
import {
  getCharacter,
  updateCharacter,
  deleteCharacter,
} from "../CharacterService";
import "./CharacterPage.css";
import CharacterCard from "../components/CharacterCard";

function CharacterPage({ match, history }) {
  const characterId = match.params.characterId;

  const [
    isShowingAddEditCharacterModal,
    setIsShowingAddEditCharacterModal,
  ] = React.useState(false);

  const [character, setCharacter] = React.useState(null);
  React.useEffect(() => {
    fetchCharacter();
  }, [characterId]);

  function fetchCharacter() {
    getCharacter(characterId)
      .then((response) => {
        const character = response.data;
        setCharacter(character);
      })
      .catch((error) => {
        alert(`Character of ${characterId} has not been created... yet ;)`);
        history.push("/");
      });
  }

  function handleEditCharacter(character) {
    setCharacter(character);
    setIsShowingAddEditCharacterModal(true);
  }

  function handleDeleteCharacter(character) {
    deleteCharacter(character._id)
      .then((response) => {
        setIsShowingAddEditCharacterModal(false);
        alert(`Deleted ${character.name}`);
        history.push("/characters");
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handleCloseModal() {
    setIsShowingAddEditCharacterModal(false);
  }

  function handleUpdateCharacter(character) {
    updateCharacter(character._id, character)
      .then((response) => {
        setIsShowingAddEditCharacterModal(false);
        alert(`Successfully updated ${character.name}.`);
        fetchCharacter();
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className="character-page">
      {isShowingAddEditCharacterModal ? (
        <Modal>
          <AddEditCharacterForm
            existingCharacter={character}
            handleCloseModal={handleCloseModal}
            handleDeleteCharacter={handleDeleteCharacter}
            handleUpdateCharacter={handleUpdateCharacter}
          ></AddEditCharacterForm>
        </Modal>
      ) : null}
      <header>
        <img
          src="/the-last-millennium.png"
          alt="The Last Millennium"
          width="100%"
        />
      </header>
      <NavManager />
      {character ? (
        <div className="character-page-container">
          <CharacterCard character={character} />
          <div className="basic-info-container">
            <div className="columnOne">
              <div>Level: {character.level}</div>
              <div>Race: {character.race}</div>
              <div>Background: {character.background}</div>
            </div>

            <div className="columnTwo">
              <div>Experience:</div>
              <div>Class: {character.class}</div>
              <div>Alignment: {character.alignment}</div>
            </div>
          </div>
          <button onClick={() => handleEditCharacter(character)}>
            Edit Character
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CharacterPage;
