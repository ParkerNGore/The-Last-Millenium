import React from "react";
import NavManager from "../components/NavManager";
import "./CharacterListPage.css";
import CharacterCard from "../components/CharacterCard";
import Modal from "../components/Modal";
import { getCharacters, createCharacter } from "../CharacterService";
import AddEditCharacterForm from "../components/AddEditCharacterForm";
import LoadingSpinner from "../components/LoadingSpinner";

function CharacterListPage() {
  const [
    isShowingAddEditCharacterModal,
    setIsShowingAddEditCharacterModal,
  ] = React.useState(false);
  const [currentCharacter, setCurrentCharacter] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [displayCharacterList, setDisplayCharacterList] = React.useState([]);
  const [originalCharacterList, setOriginalCharacterList] = React.useState(
    () => {
      fetchCharacters();
      return [];
    }
  );

  const [searchQuery, setSearchQuery] = React.useState("");
  React.useEffect(() => {
    if (!searchQuery) {
      setDisplayCharacterList(originalCharacterList);
      return;
    }

    const filteredCharacterList = originalCharacterList.filter((character) => {
      const searchQueryLowerCase = searchQuery.toLowerCase();
      const characterNameLowerCase = character.name.toLowerCase();

      if (
        characterNameLowerCase.startsWith(
          searchQueryLowerCase ||
            characterNameLowerCase.includes(searchQueryLowerCase)
        )
      ) {
        return true;
      }
    });

    setDisplayCharacterList(filteredCharacterList);
  }, [searchQuery]);

  function fetchCharacters() {
    setIsLoading(true);

    getCharacters()
      .then((response) => {
        setOriginalCharacterList(response.data);
        setDisplayCharacterList(response.data);
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
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
      <div className="new-character-button-container">
        <button
          className="new-character-button"
          onClick={handleCreateCharacterClick}
        >
          New Character
        </button>
        <input
          type="text"
          className="character-search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>

      {isLoading ? <LoadingSpinner type="roller" /> : null}
      {!isLoading && displayCharacterList.length === 0 ? (
        <h3>No Characters Found</h3>
      ) : null}
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
                <div className="character-card-list" key={character._id}>
                  <CharacterCard character={character} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default CharacterListPage;
