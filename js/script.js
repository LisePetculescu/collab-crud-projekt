"use strict";

import { getJSON, updatePost, deletePost, createNewCharacter } from "./HTTP.js";
import { capitalFirstLetter, showCreateCharacterDialog } from "./helper-functions.js";
//////////////////////////////////////////////////////////////////////
//////////////////DET ER ULOVLIGT AT ARBEJDE I MAINBRANCH/////////////
//////////////////////////////////////////////////////////////////////

// ////////// TILPAS OBJEKTER: MOVIES TIL movie ///////////
let posts;

window.addEventListener("load", start);

async function start() {
  console.log("js is running");

  // Opdaterer den globale variabel til posts-arrayet
  getUpdatedFirebase();

  document.querySelector("#input-search").addEventListener("keyup", searchBarChanged);
  document.querySelector("#input-search").addEventListener("search", searchBarChanged);
  document.querySelector("#form-delete-character").addEventListener("submit", deleteCharacterYes);
  document.querySelector("#form-update-character").addEventListener("submit", updateCharacterYes);
  document.querySelector("#btn-create-character").addEventListener("click", showCreateCharacterDialog);
  document.querySelector("#form-create-character").addEventListener("submit", createCharacterModal);
  document.querySelector("#btn-no-update").addEventListener("click", () => document.querySelector("#dialog-update-character").close());
  document.querySelector("#btn-no-create").addEventListener("click", () => document.querySelector("#dialog-create-character").close());
  document.querySelector("#btn-no-delete").addEventListener("click", () => document.querySelector("#dialog-delete-character").close());
}

function searchBarChanged(event) {
  console.log(event.target.value);
  const valueToSearchFor = event.target.value.toLowerCase();
  const filteredList = filterBySearch(valueToSearchFor);
  showCharactersAll(filteredList);
}

function sortByX(params) {
  // If statements for de forskellige parametre
  // showPostsAll()
}

function checkRace(character) {
  return character.race.toLowerCase() === "human";
}
function testFilter() {
  const filteredCharacters = posts.filter(checkRace);
  console.log(filteredCharacters.length);
}

function compareName(character1, character2) {
  return character1.name.localeCompare(character2.name);
}
console.log(lotrCharacters.sort(compareName));
function filterByX(params) {
  // If statements for de forskellige parametre
  // showPostsAll()
}

function showCharactersAll(array) {
  document.querySelector(".grid-container").innerHTML = "";
  console.log(posts);
  for (const character of array) {
    showCharacter(character);
  }
}

function showCharacter(character) {
  const html = /* HTML */ `
    <article class="grid-item">
      <h3>${character.name}</h3>
      <img src="${character.image}" />
      <p>Race: ${character.race}</p>
      <p>Age: ${character.age}</p>
      <p>Actor: ${character.actor}</p>
      <div class="btns">
        <button>Show more info</button>
      </div>
    </article>
  `;
  // <button id="btn-delete">Delete</button>
  // <button id="btn-update">Update</button>
  document.querySelector(".grid-container").insertAdjacentHTML("beforeend", html);

  // document.querySelector(".grid-container article:last-child #btn-delete").addEventListener("click", () => deleteButtonClickedOpenModal(character));
  // document.querySelector(".grid-container article:last-child #btn-update").addEventListener("click", () => updateButtonClicked(character));
  document.querySelector(".grid-container article:last-child").addEventListener("click", () => showCharacterModal(character));
}

function showCharacterModal(character) {
  console.log(character);
  // for (const key in character) {
  //   if (typeof character[key] === "string" && key !== "image") {
  //     character[key] = capitalFirstLetter(character[key]);
  //   }
  // }
  // <h3>${capitalFirstLetter(character.name)} <button id="btn-close">Back</button></h3>
  // <p>Gender: ${capitalFirstLetter(character.gender)}</p>
  const html = /* HTML */ `
    <article class="grid-item">
      <h3>${character.name} <button id="btn-close">Back</button></h3>
      <img src="${character.image}" />
      <p>Race: ${character.race}</p>
      <p>Age: ${character.age}</p>
      <p>Actor: ${character.actor}</p>
      <p>Gender: ${character.gender}</p>
      <p>movie:${character.movie}</p>
      <p>Origin: ${character.origin}</p>
      <p>Family: ${character.family}</p>
      <p>Description: ${character.description}</p>
      <div class="btns">
        <button id="btn-delete">Delete</button>
        <button id="btn-update">Update</button>
      </div>
    </article>
  `;
  document.querySelector("#show-character-modal").innerHTML = html;
  document.querySelector("#btn-delete").addEventListener("click", () => deleteButtonClickedOpenModal(character));
  document.querySelector("#btn-update").addEventListener("click", () => updateButtonClicked(character));
  document.querySelector("#btn-close").addEventListener("click", () => document.querySelector("#show-character-modal").close());
  document.querySelector("#show-character-modal").showModal();
}

function updateButtonClicked(character) {
  console.log("updateButtonClicked");
  const updateForm = document.querySelector("#form-update-character");
  updateForm.name.value = character.name;
  updateForm.image.value = character.image;
  updateForm.race.value = character.race;
  updateForm.age.value = character.age;
  updateForm.gender.value = character.gender;
  updateForm.actor.value = character.actor;
  updateForm.movie.value = character.movie;
  updateForm.origin.value = character.origin;
  updateForm.family.value = character.family;
  updateForm.description.value = character.description;
  updateForm.setAttribute("data-id", character.id);
  console.log("characterid", character.id);
  document.querySelector("#show-character-modal").close();
  document.querySelector("#dialog-update-character").showModal();
}

function deleteButtonClickedOpenModal(character) {
  document.querySelector("#dialog-delete-character-title").textContent = character.name;
  document.querySelector("#form-delete-character").setAttribute("data-id", character.id);
  document.querySelector("#show-character-modal").close();
  document.querySelector("#dialog-delete-character").showModal();
}

async function createCharacterModal(event) {
  event.preventDefault();
  const form = event.target;

  const name = form.name.value;
  const image = form.image.value;
  const race = form.race.value;
  const gender = form.gender.value;
  const age = form.age.value;
  const actor = form.actor.value;
  const movie = form.movie.value;
  const origin = form.origin.value;
  const family = form.family.value;
  const description = form.description.value;

  const response = await createNewCharacter(name, image, race, age, actor, movie, origin, family, description, gender);

  if (response.ok) {
    getUpdatedFirebase();
    form.reset();
  }
}

async function updateCharacterYes(event) {
  event.preventDefault();

  const form = event.target;

  const name = form.name.value;
  const image = form.image.value;
  const race = form.race.value;
  const age = form.age.value;
  const gender = form.gender.value;
  const actor = form.actor.value;
  const movie = form.movie.value;
  const origin = form.origin.value;
  const family = form.family.value;
  const description = form.description.value;

  const id = form.getAttribute("data-id");

  const response = await updatePost(id, name, image, race, age, gender, actor, movie, origin, family, description);
  if (response.ok) {
    console.log(`Updated post ${id}`);
    getUpdatedFirebase();
  }
  document.querySelector("#dialog-update-character").close();
}

async function deleteCharacterYes(event) {
  console.log("Delete????");
  // document.querySelector("#dialog-delete-character").close();
  const id = event.target.getAttribute("data-id");
  const response = await deletePost(id);
  if (response.ok) {
    console.log(`DELETED CHARACTER ${id}`);
    getUpdatedFirebase();
  }
}

async function getUpdatedFirebase(params) {
  const result = await getJSON();
  posts = result;
  showCharactersAll(result);
}
