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
  const [subRace, setSubRace] = React.useState(
    existingCharacter ? existingCharacter.race : ""
  );
  const [clazz, setClazz] = React.useState(
    existingCharacter ? existingCharacter.class : ""
  );
  const [subClazz, setSubClazz] = React.useState(
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
    subRace: null,
    clazz: null,
    subClazz: null,
    background: null,
    alignment: null,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const errors = {
      name: null,
      level: null,
      race: null,
      subRace: null,
      clazz: null,
      subClazz: null,
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

    if (!subRace) {
      errors.race = "Character Race must not be empty";
    }

    if (!subClazz) {
      errors.clazz = "Character Class must not be empty";
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
      errors.subRace ||
      errors.clazz ||
      errors.subClazz ||
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
      subrace: subRace,
      class: clazz,
      subclass: subClazz,
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

  function updateSubRaces() {
    if (!race) {
      return null;
    }
    const targetSubRaces = races.find((targetRace) => targetRace.value === race)
      .subraces;

    return Object.keys(targetSubRaces).map((subRace) => {
      return (
        <option
          value={targetSubRaces[subRace].value}
          key={targetSubRaces[subRace].value}
        >
          {targetSubRaces[subRace].label}
        </option>
      );
    });
  }

  function updateSubClasses() {
    if (!clazz) {
      return null;
    }
    const targetSubClasses = classes.find(
      (targetClass) => targetClass.value === clazz
    ).subclasses;

    return Object.keys(targetSubClasses).map((subClass) => {
      return (
        <option
          value={targetSubClasses[subClass].value}
          key={targetSubClasses[subClass].value}
        >
          {targetSubClasses[subClass].label}
        </option>
      );
    });
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
              subrace: subRace,
              clazz: clazz,
              subclazz: subClazz,
              background: background,
              alignment: alignment,
            }}
          />
          <div className="form-column-center">
            <div className="form-column-center-left">
              <label for="name-input">
                Name<span className="required">*</span>:
                {errors.name ? (
                  <span className="required">{errors.name}</span>
                ) : null}
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "invalid" : ""}
              />

              <label for="level-input">
                Level<span className="required">*</span>:
                {errors.level ? (
                  <span className="required">{errors.level}</span>
                ) : null}
              </label>
              <input
                id="level-input"
                type="number"
                min="1"
                max="20"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className={errors.level ? "invalid" : ""}
              />

              <label for="background-selector">
                background<span className="required">*</span>:
                {errors.background ? (
                  <span className="required">{errors.background}</span>
                ) : null}
              </label>
              <select
                id="background-selector"
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

              <label for="alignment-selector">
                alignment<span className="required">*</span>:
                {errors.alignment ? (
                  <span className="required">{errors.alignment}</span>
                ) : null}
              </label>
              <select
                id="alignment-selector"
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
            </div>
            <div className="form-column-center-right">
              <label for="race-selector">
                race<span className="required">*</span>:
                {errors.race ? (
                  <span className="required">{errors.race}</span>
                ) : null}
              </label>
              <select
                id="race-selector"
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

              <label for="subrace-selector">
                subrace<span className="required">*</span>:
                {errors.subRace ? (
                  <span className="required">{errors.subRace}</span>
                ) : null}
              </label>
              <select
                id="subrace-selector"
                value={subRace}
                onChange={(e) => setSubRace(e.target.value)}
                className={errors.subRace ? "invalid" : ""}
                disabled={!race}
              >
                <option value=""></option>
                {updateSubRaces()}
              </select>

              <label for="class-selector">
                class<span className="required">*</span>:
                {errors.clazz ? (
                  <span className="required">{errors.clazz}</span>
                ) : null}
              </label>
              <select
                id="class-selector"
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

              <label for="subclass-selector">
                subclass<span className="required">*</span>:
                {errors.subclass ? (
                  <span className="required">{errors.subclass}</span>
                ) : null}
              </label>
              <select
                id="subclass-selector"
                value={subClazz}
                onChange={(e) => setSubClazz(e.target.value)}
                className={errors.subclass ? "invalid" : ""}
                disabled={!clazz}
              >
                <option value=""></option>
                {updateSubClasses()}
              </select>
            </div>
          </div>
          <div className="character-form-right">
            <div className="column-left-physical">
              <div>Str</div>
              <input
                type="number"
                className="ability-score-input"
                min="3"
                max="18"
              ></input>
              <div>Dex</div>
              <input
                type="number"
                className="ability-score-input"
                min="3"
                max="18"
              ></input>
              <div>Con</div>
              <input
                type="number"
                className="ability-score-input"
                min="3"
                max="18"
              ></input>
            </div>
            <div className="column-right-mental">
              <div>Int</div>
              <input
                type="number"
                className="ability-score-input"
                min="3"
                max="18"
              ></input>
              <div>Wis</div>
              <input
                type="number"
                className="ability-score-input"
                min="3"
                max="18"
              ></input>
              <div>Cha</div>
              <input
                type="number"
                className="ability-score-input"
                min="3"
                max="18"
              ></input>
            </div>
          </div>
        </div>
        <div className="description-container">
          {race ? (
            <div className="race-description">
              {
                races.find((r) => {
                  return r.value === race;
                })?.description
              }
            </div>
          ) : null}

          {clazz ? (
            <div className="class-description">
              {
                classes.find((c) => {
                  return c.value === clazz;
                })?.description
              }
            </div>
          ) : null}

          {background ? (
            <div className="background-description">
              {
                backgrounds.find((b) => {
                  return b.value === background;
                })?.description
              }
            </div>
          ) : null}
        </div>
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
