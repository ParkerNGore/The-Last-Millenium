import React from "react";
import "./AddEditCharacterForm.css";

import races from "../races.json";
import classes from "../classes.json";
import backgrounds from "../backgrounds.json";
import alignments from "../alignments.json";
import CharacterCard from "./CharacterCard";

function AddEditCharacterForm({
  handleCloseModal,
  handleCreateCharacter,
  existingCharacter,
  handleUpdateCharacter,
  handleDeleteCharacter,
}) {
  const [name, setName] = React.useState(
    existingCharacter ? existingCharacter.name : ""
  );
  const [level, setLevel] = React.useState(
    existingCharacter ? existingCharacter.level : 1
  );
  const [race, setRace] = React.useState(
    existingCharacter ? existingCharacter.race : ""
  );
  const [clazz, setClazz] = React.useState(
    existingCharacter ? existingCharacter.class : ""
  );
  const [background, setBackground] = React.useState(
    existingCharacter ? existingCharacter.background : ""
  );
  const [alignment, setAlignment] = React.useState(
    existingCharacter ? existingCharacter.alignment : ""
  );
  const [errors, setErrors] = React.useState({
    name: null,
    level: null,
    race: null,
    clazz: null,
    background: null,
    alignment: null,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const errors = {
      name: null,
      level: null,
      race: null,
      clazz: null,
      background: null,
      alignment: null,
    };

    if (name.length === 0) {
      errors.name = "Character Name Cannot be Empty";
    }

    if (level <= 0) {
      errors.level = "Character Level must be greater than 0";
    }

    if (!race) {
      errors.race = "Character Race must not be empty";
    }

    if (!clazz) {
      errors.clazz = "Character Class must not be empty";
    }

    if (!background) {
      errors.background = "Character Background must not be empty";
    }

    if (!alignment) {
      errors.alignment = "Character Alignment must not be empty";
    }

    if (
      errors.name ||
      errors.level ||
      errors.race ||
      errors.clazz ||
      errors.background ||
      errors.alignment
    ) {
      setErrors(errors);
      return;
    }

    const character = {
      name: name,
      level: level,
      race: race,
      class: clazz,
      background: background,
      alignment: alignment,
    };
    if (existingCharacter) {
      character._id = existingCharacter._id;
      handleUpdateCharacter(character);
    } else {
      handleCreateCharacter(character);
    }
  }

  return (
    <div className="add-edit-character-form-container">
      <h1>{existingCharacter ? "Edit Character" : "Create Character"}</h1>
      <form onSubmit={handleSubmit} className="character-form">
        <div className="character-form-top">
          <CharacterCard
            character={{
              name: name,
              level: level,
              race: race,
              clazz: clazz,
              background: background,
              alignment: alignment,
            }}
          />
          <div className="form-column-right">
            <label>
              Name<span className="required">*</span>:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "invalid" : ""}
              />
              {errors.name ? (
                <span className="required">{errors.name}</span>
              ) : null}
            </label>
            <label>
              Level<span className="required">*</span>:
              <input
                type="number"
                min="1"
                max="20"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className={errors.level ? "invalid" : ""}
              />
              {errors.level ? (
                <span className="required">{errors.level}</span>
              ) : null}
            </label>
            <label>
              race<span className="required">*</span>:
              <select
                value={race}
                onChange={(e) => setRace(e.target.value)}
                className={errors.race ? "invalid" : ""}
              >
                <option value=""></option>
                {races.map((race) => {
                  return (
                    <option value={race.value} key={race.value}>
                      {race.label}
                    </option>
                  );
                })}
              </select>
              {errors.race ? (
                <span className="required">{errors.race}</span>
              ) : null}
            </label>
            <label>
              class<span className="required">*</span>:
              <select
                value={clazz}
                onChange={(e) => setClazz(e.target.value)}
                className={errors.clazz ? "invalid" : ""}
              >
                <option value=""></option>
                {classes.map((clazz) => {
                  return (
                    <option value={clazz.value} key={clazz.value}>
                      {clazz.label}
                    </option>
                  );
                })}
              </select>
              {errors.clazz ? (
                <span className="required">{errors.clazz}</span>
              ) : null}
            </label>
            <label>
              background<span className="required">*</span>:
              <select
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className={errors.background ? "invalid" : ""}
              >
                <option value=""></option>
                {backgrounds.map((background) => {
                  return (
                    <option value={background.value} key={background.value}>
                      {background.label}
                    </option>
                  );
                })}
              </select>
              {errors.background ? (
                <span className="required">{errors.background}</span>
              ) : null}
            </label>
            <label>
              alignment<span className="required">*</span>:
              <select
                value={alignment}
                onChange={(e) => setAlignment(e.target.value)}
                className={errors.alignment ? "invalid" : ""}
              >
                <option value=""></option>
                {alignments.map((alignment) => {
                  return (
                    <option value={alignment.value} key={alignment.value}>
                      {alignment.label}
                    </option>
                  );
                })}
              </select>
              {errors.alignment ? (
                <span className="required">{errors.alignment}</span>
              ) : null}
            </label>
          </div>
        </div>
        <div className="description-container">DESCRIPTION</div>
        <div className="button-container">
          <button>
            {existingCharacter ? "Save Character" : "Finalize Character"}
          </button>
          <button onClick={handleCloseModal} type="button">
            Close
          </button>
          {existingCharacter ? (
            <button
              type="button"
              onClick={() => handleDeleteCharacter(existingCharacter)}
            >
              Delete Character
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default AddEditCharacterForm;
