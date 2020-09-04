import React from "react";
import NavManager from "../components/NavManager";
import "./CharacterListPage.css";
import CharacterCard from "../components/CharacterCard";
import Modal from "../components/Modal";
import CharacterPage from "./CharacterPage";
import {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from "../CharacterService";
import AddEditCharacterForm from "../components/AddEditCharacterForm";

function CharacterListPage() {
  const [
    isShowingAddEditCharacterModal,
    setIsShowingAddEditCharacterModal,
  ] = React.useState(false);
  const [currentCharacter, setCurrentCharacter] = React.useState(null);
  const [displayCharacterList, setDisplayCharacterList] = React.useState([]);
  const [originalCharacterList, setOriginalCharacterList] = React.useState(
    () => {
      fetchCharacters();
      return [];
    }
  );

  function fetchCharacters() {
    getCharacters()
      .then((response) => {
        setOriginalCharacterList(response.data);
        setDisplayCharacterList(response.data);
      })
      .catch((error) => {});
  }

  function handleCreateCharacterClick() {
    setCurrentCharacter(null);
    setIsShowingAddEditCharacterModal(true);
  }

  function handleCloseModal() {
    setIsShowingAddEditCharacterModal(false);
  }

  function handleCreateCharacter(character) {
    createCharacter(character)
      .then((response) => {
        setIsShowingAddEditCharacterModal(false);
        alert(`You have successfully created ${character.name}`);
        fetchCharacters();
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className="character-list-page">
      <header>
        <img
          src="the-last-millennium.png"
          alt="The Last Millennium"
          width="100%"
        />
      </header>
      <NavManager />
      <button onClick={handleCreateCharacterClick}>New Character</button>
      {isShowingAddEditCharacterModal ? (
        <Modal>
          <AddEditCharacterForm
            handleCloseModal={handleCloseModal}
            handleCreateCharacter={handleCreateCharacter}
          ></AddEditCharacterForm>
        </Modal>
      ) : null}
      <div className="character-list">
        {displayCharacterList && displayCharacterList.length
          ? displayCharacterList.map((character) => {
              return (
                <div className="character-card-list">
                  <CharacterCard character={character} key={character._id} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default CharacterListPage;
