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
  const [hasSubRace, setHasSubRace] = React.useState(false);
  const [raceDescription, setRaceDescription] = React.useState("");
  const [constitution, setConstitution] = React.useState(
    existingCharacter ? existingCharacter.attributes.constitution : 3
  );
  const [strength, setStrength] = React.useState(
    existingCharacter ? existingCharacter.attributes.strength : 3
  );
  const [dexterity, setDexterity] = React.useState(
    existingCharacter ? existingCharacter.attributes.dexterity : 3
  );
  const [wisdom, setWisdom] = React.useState(
    existingCharacter ? existingCharacter.attributes.wisdom : 3
  );
  const [intelligence, setIntelligence] = React.useState(
    existingCharacter ? existingCharacter.attributes.intelligence : 3
  );
  const [charisma, setCharisma] = React.useState(
    existingCharacter ? existingCharacter.attributes.charisma : 3
  );

  const [conBonusCheckBox, setConBonusCheckBox] = React.useState(false);
  const [strBonusCheckBox, setStrBonusCheckBox] = React.useState(false);
  const [dexBonusCheckBox, setDexBonusCheckBox] = React.useState(false);
  const [wisBonusCheckBox, setWisBonusCheckBox] = React.useState(false);
  const [intBonusCheckBox, setIntBonusCheckBox] = React.useState(false);
  const [chaBonusCheckBox, setChaBonusCheckBox] = React.useState(false);
  const [numberOfBoxesChecked, setNumberOfBoxesChecked] = React.useState(0);

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
    constitution: null,
    strength: null,
    dexterity: null,
    wisdom: null,
    intelligence: null,
    charisma: null,
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
      constitution: null,
      strength: null,
      dexterity: null,
      wisdom: null,
      intelligence: null,
      charisma: null,
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
      errors.race = "Character Subrace must not be empty";
    }
    if (!clazz) {
      errors.clazz = "Character Class must not be empty";
    }
    if (!subClazz) {
      errors.clazz = "Character Subclass must not be empty";
    }
    if (!background) {
      errors.background = "Character Background must not be empty";
    }
    if (!alignment) {
      errors.alignment = "Character Alignment must not be empty";
    }
    if (!constitution) {
      errors.constitution = "Character Constitution must not be empty";
    }
    if (!strength) {
      errors.strength = "Character Strength must not be empty";
    }
    if (!dexterity) {
      errors.dexterity = "Character Dexterity must not be empty";
    }
    if (!wisdom) {
      errors.wisdom = "Character Wisdom must not be empty";
    }
    if (!intelligence) {
      errors.intelligence = "Character Intelligence must not be empty";
    }
    if (!charisma) {
      errors.charisma = "Character Charisma must not be empty";
    }

    if (
      errors.name ||
      errors.level ||
      errors.race ||
      errors.subRace ||
      errors.clazz ||
      errors.subClazz ||
      errors.background ||
      errors.alignment ||
      errors.constitution ||
      errors.strength ||
      errors.dexterity ||
      errors.wisdom ||
      errors.intelligence ||
      errors.charisma
    ) {
      setErrors(errors);
      return;
    }

    const selectedRace = races.find((r) => {
      return r.value === race;
    });

    let strengthValue = strength;
    let constitutionValue = constitution;
    let dexterityValue = dexterity;
    let wisdomValue = wisdom;
    let intelligenceValue = intelligence;
    let charismaValue = charisma;

    let constitutionBonusValue = 0;
    let strengthBonusValue = 0;
    let dexterityBonusValue = 0;
    let wisdomBonusValue = 0;
    let intelligenceBonusValue = 0;
    let charismaBonusValue = 0;

    if (selectedRace) {
      const subRacesKeys = Object.keys(selectedRace.subraces);
      const subraces = subRacesKeys.map((key) => {
        const subRaceValue = selectedRace.subraces[key];
        return {
          key: key,
          ...subRaceValue,
        };
      });
      const selectedSubRace = subraces.find((sr) => {
        return sr.value === subRace;
      });

      if (selectedSubRace) {
        !isNaN(Number(selectedSubRace.conBonus))
          ? (constitutionBonusValue = selectedSubRace.conBonus)
          : (constitutionBonusValue = 0);
      }

      if (selectedSubRace) {
        !isNaN(Number(selectedSubRace.strBonus))
          ? (strengthBonusValue = selectedSubRace.strBonus)
          : (strengthBonusValue = 0);
      }

      if (selectedSubRace) {
        !isNaN(Number(selectedSubRace.dexBonus))
          ? (dexterityBonusValue = selectedSubRace.dexBonus)
          : (dexterityBonusValue = 0);
      }

      if (selectedSubRace) {
        !isNaN(Number(selectedSubRace.wisBonus))
          ? (wisdomBonusValue = selectedSubRace.wisBonus)
          : (wisdomBonusValue = 0);
      }

      if (selectedSubRace) {
        !isNaN(Number(selectedSubRace.intBonus))
          ? (intelligenceBonusValue = selectedSubRace.intBonus)
          : (intelligenceBonusValue = 0);
      }

      if (selectedSubRace) {
        !isNaN(Number(selectedSubRace.chaBonus))
          ? (charismaBonusValue = selectedSubRace.chaBonus)
          : (charismaBonusValue = 0);
      }

      if (strBonusCheckBox) {
        strengthBonusValue = 1;
      }
      if (dexBonusCheckBox) {
        dexterityBonusValue = 1;
      }
      if (conBonusCheckBox) {
        constitutionBonusValue = 1;
      }
      if (wisBonusCheckBox) {
        wisdomBonusValue = 1;
      }
      if (intBonusCheckBox) {
        intelligenceBonusValue = 1;
      }
      if (chaBonusCheckBox) {
        charismaBonusValue = 1;
      }

      console.log(strengthValue);
      console.log(constitutionValue);
      console.log(dexterityValue);
      console.log(wisdomValue);
      console.log(intelligenceValue);
      console.log(charismaValue);
      console.log("break");
      console.log(strengthBonusValue);
      console.log(constitutionBonusValue);
      console.log(dexterityBonusValue);
      console.log(wisdomBonusValue);
      console.log(intelligenceBonusValue);
      console.log(charismaBonusValue);
      console.log("break");

      strengthValue = parseInt(strengthValue) + parseInt(strengthBonusValue);
      constitutionValue =
        parseInt(constitutionValue) + parseInt(constitutionBonusValue);
      dexterityValue = parseInt(dexterityValue) + parseInt(dexterityBonusValue);
      wisdomValue = parseInt(wisdomValue) + parseInt(wisdomBonusValue);
      intelligenceValue =
        parseInt(intelligenceValue) + parseInt(intelligenceBonusValue);
      charismaValue = parseInt(charismaValue) + parseInt(charismaBonusValue);

      console.log(strengthValue);
      console.log(constitutionValue);
      console.log(dexterityValue);
      console.log(wisdomValue);
      console.log(intelligenceValue);
      console.log(charismaValue);

      setStrength(strengthValue);
      setConstitution(constitutionValue);
      setDexterity(dexterityValue);
      setWisdom(wisdomValue);
      setIntelligence(intelligenceValue);
      setCharisma(charismaValue);
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
      attributes: {
        constitution: constitutionValue,
        strength: strengthValue,
        dexterity: dexterityValue,
        wisdom: wisdomValue,
        intelligence: intelligenceValue,
        charisma: charismaValue,
      },
    };
    if (existingCharacter) {
      character._id = existingCharacter._id;
      handleUpdateCharacter(character);
    } else {
      handleCreateCharacter(character);
    }
  }

  function updateSubRaceSelector() {
    if (!race) {
      return null;
    }

    const targetSubRaces = races.find((targetRace) => targetRace.value === race)
      .subraces;

    if (!targetSubRaces) {
      if (hasSubRace) {
        setHasSubRace(false);
      }
      return null;
    }
    if (!hasSubRace) {
      setHasSubRace(true);
    }

    const subRacesKeys = Object.keys(targetSubRaces);

    return subRacesKeys.map((subRace) => {
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

  function updateRaceDescription() {
    if (!race) {
      return null;
    }

    if (!hasSubRace) {
      const testRaceDescription = races.find((r) => {
        return r.value === race;
      })?.description;
      return testRaceDescription;
    }

    races.forEach((r) => {
      for (const subCategoryName in r.subraces) {
        const subCategory = r.subraces[subCategoryName];
        if (subCategory.value === subRace) {
          if (raceDescription !== subCategory.description) {
            setRaceDescription(subCategory.description);
          }
          return;
        }
      }
    });
    return raceDescription;
  }

  function updateSubClassDescription() {
    if (!clazz) {
      return null;
    }

    let classDescription;

    classes.forEach((c) => {
      for (const subCategoryName in c.subclasses) {
        const subCategory = c.subclasses[subCategoryName];
        if (subCategory.value === subClazz) {
          classDescription = subCategory.description;
        }
      }
    });
    return classDescription;
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

  function handleCheckBoxClick(value, setFunction, event) {
    let checkboxClickedCount = 0;

    if (value) {
      if (
        (!conBonusCheckBox && setFunction === setConBonusCheckBox) ||
        conBonusCheckBox
      ) {
        checkboxClickedCount++;
      }
      if (
        (!strBonusCheckBox && setFunction === setStrBonusCheckBox) ||
        strBonusCheckBox
      ) {
        checkboxClickedCount++;
      }
      if (
        (!dexBonusCheckBox && setFunction === setDexBonusCheckBox) ||
        dexBonusCheckBox
      ) {
        checkboxClickedCount++;
      }
      if (
        (!wisBonusCheckBox && setFunction === setWisBonusCheckBox) ||
        wisBonusCheckBox
      ) {
        checkboxClickedCount++;
      }
      if (
        (!intBonusCheckBox && setFunction === setIntBonusCheckBox) ||
        intBonusCheckBox
      ) {
        checkboxClickedCount++;
      }
      if (
        (!chaBonusCheckBox && setFunction === setChaBonusCheckBox) ||
        chaBonusCheckBox
      ) {
        checkboxClickedCount++;
      }
    } else {
      if (setFunction !== setConBonusCheckBox && conBonusCheckBox) {
        checkboxClickedCount++;
      }
      if (setFunction !== setDexBonusCheckBox && dexBonusCheckBox) {
        checkboxClickedCount++;
      }
      if (setFunction !== setStrBonusCheckBox && strBonusCheckBox) {
        checkboxClickedCount++;
      }
      if (setFunction !== setWisBonusCheckBox && wisBonusCheckBox) {
        checkboxClickedCount++;
      }
      if (setFunction !== setIntBonusCheckBox && intBonusCheckBox) {
        checkboxClickedCount++;
      }
      if (setFunction !== setChaBonusCheckBox && chaBonusCheckBox) {
        checkboxClickedCount++;
      }
    }

    setNumberOfBoxesChecked(checkboxClickedCount);

    if (checkboxClickedCount <= 2) {
      setFunction(value);
    } else {
      event.preventDefault();
      alert("2 Bonus Attributes are already selected!");
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
              subrace: subRace,
              clazz: clazz,
              subclazz: subClazz,
              background: background,
              alignment: alignment,
              attributes: {
                constitution: constitution,
                strength: strength,
                dexterity: dexterity,
                wisdom: wisdom,
                intelligence: intelligence,
                charisma: charisma,
              },
            }}
          />
          <div className="form-column-center">
            <div className="form-column-center-left">
              <label htmlFor="name-input">
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

              <label htmlFor="level-input">
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

              <label htmlFor="background-selector">
                Background<span className="required">*</span>:
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

              <label htmlFor="alignment-selector">
                Alignment<span className="required">*</span>:
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
              <label htmlFor="race-selector">
                Race<span className="required">*</span>:
                {errors.race ? (
                  <span className="required">{errors.race}</span>
                ) : null}
              </label>
              <select
                id="race-selector"
                value={race}
                onChange={(e) => {
                  setRace(e.target.value);
                  setSubRace("");
                  setRaceDescription("");
                }}
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

              <label htmlFor="subrace-selector">
                Subrace<span className="required">*</span>:
                {errors.subRace ? (
                  <span className="required">{errors.subRace}</span>
                ) : null}
              </label>
              <select
                id="subrace-selector"
                value={subRace}
                onChange={(e) => setSubRace(e.target.value)}
                className={errors.subRace ? "invalid" : ""}
                disabled={!race || !hasSubRace}
              >
                <option value=""></option>
                {updateSubRaceSelector()}
              </select>

              <label htmlFor="class-selector">
                Class<span className="required">*</span>:
                {errors.clazz ? (
                  <span className="required">{errors.clazz}</span>
                ) : null}
              </label>
              <select
                id="class-selector"
                value={clazz}
                onChange={(e) => {
                  setClazz(e.target.value);
                  setSubClazz("");
                }}
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

              <label htmlFor="subclass-selector">
                Subclass<span className="required">*</span>:
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
              <div
                className={
                  (race === "human" && subRace === "variant") ||
                  race === "half-elf"
                    ? "ability-score-name-hidden"
                    : "ability-score-name"
                }
              >
                Str
              </div>

              <div
                className={
                  (race === "human" && subRace === "variant") ||
                  race === "half-elf"
                    ? "checkbox-container"
                    : "checkbox-container-hidden"
                }
              >
                Str
                <div className="plus-one">+1</div>
                <input
                  className="score-bonus-checkbox"
                  value={strBonusCheckBox}
                  disabled={
                    !strBonusCheckBox && numberOfBoxesChecked === 2
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    handleCheckBoxClick(
                      e.target.checked,
                      setStrBonusCheckBox,
                      e
                    )
                  }
                  type="checkbox"
                />
              </div>

              <input
                type="number"
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
                className="ability-score-input"
                min="3"
                max="18"
              ></input>

              <div
                className={
                  (race === "human" && subRace === "variant") ||
                  race === "half-elf"
                    ? "ability-score-name-hidden"
                    : "ability-score-name"
                }
              >
                Dex
              </div>

              <div
                className={
                  (race === "human" && subRace === "variant") ||
                  race === "half-elf"
                    ? "checkbox-container"
                    : "checkbox-container-hidden"
                }
              >
                Dex
                <div className="plus-one">+1</div>
                <input
                  className="score-bonus-checkbox"
                  value={dexBonusCheckBox}
                  disabled={
                    !dexBonusCheckBox && numberOfBoxesChecked === 2
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    handleCheckBoxClick(
                      e.target.checked,
                      setDexBonusCheckBox,
                      e
                    )
                  }
                  type="checkbox"
                />
              </div>

              <input
                value={dexterity}
                onChange={(e) => setDexterity(e.target.value)}
                type="number"
                className="ability-score-input"
                min="3"
                max="18"
              />

              <div
                className={
                  (race === "human" && subRace === "variant") ||
                  race === "half-elf"
                    ? "ability-score-name-hidden"
                    : "ability-score-name"
                }
              >
                Con
              </div>

              <div
                className={
                  (race === "human" && subRace === "variant") ||
                  race === "half-elf"
                    ? "checkbox-container"
                    : "checkbox-container-hidden"
                }
              >
                Con
                <div className="plus-one">+1</div>
                <input
                  className="score-bonus-checkbox"
                  value={conBonusCheckBox}
                  disabled={
                    !conBonusCheckBox && numberOfBoxesChecked === 2
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    handleCheckBoxClick(
                      e.target.checked,
                      setConBonusCheckBox,
                      e
                    )
                  }
                  type="checkbox"
                />
              </div>

              <input
                type="number"
                value={constitution}
                onChange={(e) => setConstitution(e.target.value)}
                className="ability-score-input"
                min="3"
                max="18"
              />
            </div>

            <div className="column-right-mental">
              <div
                className={
                  (race === "human" && subRace === "variant") ||
                  race === "half-elf"
                    ? "ability-score-name-hidden"
                    : "ability-score-name"
                }
              >
                Int
              </div>

              <div
                className={
                  (race === "human" && subRace === "variant") ||
                  race === "half-elf"
                    ? "checkbox-container"
                    : "checkbox-container-hidden"
                }
              >
                Int
                <div className="plus-one">+1</div>
                <input
                  className="score-bonus-checkbox"
                  value={intBonusCheckBox}
                  disabled={
                    !intBonusCheckBox && numberOfBoxesChecked === 2
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    handleCheckBoxClick(
                      e.target.checked,
                      setIntBonusCheckBox,
                      e
                    )
                  }
                  type="checkbox"
                />
              </div>

              <input
                value={intelligence}
                onChange={(e) => setIntelligence(e.target.value)}
                type="number"
                className="ability-score-input"
                min="3"
                max="18"
              ></input>

              <div
                className={
                  (race === "human" && subRace === "variant") ||
                  race === "half-elf"
                    ? "ability-score-name-hidden"
                    : "ability-score-name"
                }
              >
                Wis
              </div>

              <div
                className={
                  (race === "human" && subRace === "variant") ||
                  race === "half-elf"
                    ? "checkbox-container"
                    : "checkbox-container-hidden"
                }
              >
                Wis
                <div className="plus-one">+1</div>
                <input
                  className="score-bonus-checkbox"
                  value={wisBonusCheckBox}
                  disabled={
                    !wisBonusCheckBox && numberOfBoxesChecked === 2
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    handleCheckBoxClick(
                      e.target.checked,
                      setWisBonusCheckBox,
                      e
                    )
                  }
                  type="checkbox"
                />
              </div>
              <input
                value={wisdom}
                onChange={(e) => setWisdom(e.target.value)}
                type="number"
                className="ability-score-input"
                min="3"
                max="18"
              ></input>
              <div
                className={
                  (race === "human" && subRace === "variant") ||
                  race === "half-elf"
                    ? "ability-score-name-hidden"
                    : "ability-score-name"
                }
              >
                Cha
              </div>

              <div
                className={
                  (race === "human" && subRace === "variant") ||
                  race === "half-elf"
                    ? "checkbox-container"
                    : "checkbox-container-hidden"
                }
              >
                Cha
                <div className="plus-one">+1</div>
                <input
                  className="score-bonus-checkbox"
                  value={chaBonusCheckBox}
                  disabled={
                    !chaBonusCheckBox && numberOfBoxesChecked === 2
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    handleCheckBoxClick(
                      e.target.checked,
                      setChaBonusCheckBox,
                      e
                    )
                  }
                  type="checkbox"
                />
              </div>
              <input
                value={charisma}
                onChange={(e) => setCharisma(e.target.value)}
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
            <div className="race-description">{updateRaceDescription()}</div>
          ) : null}

          {clazz ? (
            <div className="class-description">
              {updateSubClassDescription()}
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
