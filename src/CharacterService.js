import axios from "axios";

const BASE_URL = "https://character-api-parker.herokuapp.com";
// const BASE_URL = "http://localhost:3005";

const getCharacters = () => {
  return axios.get(`${BASE_URL}/api/characters`);
};

const getCharacter = (characterId) => {
  return axios.get(`${BASE_URL}/api/characters/${characterId}`);
};

const createCharacter = (character) => {
  return axios.post(`${BASE_URL}/api/characters`, character);
};

const updateCharacter = (characterId, character) => {
  return axios.put(`${BASE_URL}/api/characters/${characterId}`, character);
};

const deleteCharacter = (characterId) => {
  return axios.delete(`${BASE_URL}/api/characters/${characterId}`);
};

export {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
