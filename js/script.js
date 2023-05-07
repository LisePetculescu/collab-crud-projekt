"use strict";

import { getJSON, updatePost, deletePost, createNewCharacter } from "./HTTP.js";
import {
  makeTriologyReadable,
  makeAgeReadable,
  makeFamilyReadable,
  makeOriginReadable,
} from "./helper-functions.js";

//////////////////////////////////////////////////////////////////////
//////////////////DET ER ULOVLIGT AT ARBEJDE I MAINBRANCH/////////////
//////////////////////////////////////////////////////////////////////

// MAKE GLOBAL VARIABLES - ALL WILL BE POSTS-ARRAYS, FILTERED OR SORTED IN SOME WAY.
let posts;
let filteredList;
let searchedList;

window.addEventListener("load", start);

async function start() {
  console.log("js is running");

  // Opdaterer den globale variabel til posts-arrayet
  getUpdatedFirebase();

  // Event listeners for EVERYTHING
  document
    .querySelector("#input-search")
    .addEventListener("keyup", searchBarChanged);
  document
    .querySelector("#input-search")
    .addEventListener("search", searchBarChanged);
  document
    .querySelector("#form-delete-character")
    .addEventListener("submit", deleteCharacterYes);
  document
    .querySelector("#form-update-character")
    .addEventListener("submit", updateCharacterYes);
  document
    .querySelector("#btn-create-character")
    .addEventListener("click", () =>
      document.querySelector("#dialog-create-character").showModal()
    );
  document
    .querySelector("#form-create-character")
    .addEventListener("submit", createCharacterModal);
  document
    .querySelector("#btn-no-update")
    .addEventListener("click", () =>
      document.querySelector("#dialog-update-character").close()
    );
  document
    .querySelector("#btn-no-create")
    .addEventListener("click", () =>
      document.querySelector("#dialog-create-character").close()
    );
  document
    .querySelector("#btn-no-delete")
    .addEventListener("click", () =>
      document.querySelector("#dialog-delete-character").close()
    );
  document
    .querySelector("#filter")
    .addEventListener("change", filterByProperty);
  document.querySelector("#sort").addEventListener("change", sortByX);

  document
    .querySelector("#btn-yes-update")
    .addEventListener("click", blurRemoved);
  document
    .querySelector("#btn-yes-delete")
    .addEventListener("click", blurRemoved);
  document
    .querySelector("#btn-no-update")
    .addEventListener("click", blurRemoved);
  document
    .querySelector("#btn-no-delete")
    .addEventListener("click", blurRemoved);
    
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      document.querySelector("body").classList.remove("blur");
    }
  };
}

function filterByProperty() {
  let valueToFilterBy = document.querySelector("#filter").value;
  // Save the posts array in a local variable to leave the original intact
  let listToFilter = posts.slice();

  // Change the global variable to a filtered list for future use
  filteredList = listToFilter.filter(filterFunction);

  function filterFunction(currentValue) {
    if (valueToFilterBy === "LoTR" || valueToFilterBy === "The Hobbit") {
      // console.log("valuetofilterby:", valueToFilterBy);
      return (
        currentValue.movie
          .toLowerCase()
          .includes(valueToFilterBy.toLowerCase()) ||
        currentValue.movie.toLowerCase().includes("lotr, hobbit")
      );
    } else if (valueToFilterBy === "male" || valueToFilterBy === "female") {
      return currentValue.gender.toLowerCase() === valueToFilterBy;
    } else {
      // console.log("valuetofilterby:", valueToFilterBy);
      return currentValue.race
        .toLowerCase()
        .includes(valueToFilterBy.toLowerCase());
    }
  }

  // Call the searchbar function to check for any further filtering
  searchBarChanged();
}

function searchBarChanged() {
  // Cannot use event.target.value since this needs to be callable from both filterByPropery and by the event listener
  const valueToSearchFor = document.querySelector("#input-search").value;
  // Same procedure as filterByProperty()
  const listToFilter = filteredList.slice();

  //  Further filters the filtered list according to search value and calls sortByX() for a final sorting of the array
  searchedList = listToFilter.filter((character) =>
    character.name.toLowerCase().includes(valueToSearchFor)
  );

  // Less compact code:

  // searchedList = filterBySearch(valueToSearchFor, posts);
  // function filterBySearch(valueToSearchFor, posts) {
  //   console.log("posts", posts);
  //   return listToFilter.filter((character) => character.name.toLowerCase().includes(valueToSearchFor));
  // }

  sortByX();
}

function sortByX() {
  let filteredListToSort = searchedList.slice();
  let valueToSortBy = document.querySelector("#sort").value;

  // Sorts the array based on the whether the sort value is a string, number or empty and displays the array through showCharactersAll
  if (valueToSortBy === "age") {
    showCharactersAll(filteredListToSort.sort(compareNumber));
  } else if (valueToSortBy === "default") {
    showCharactersAll(searchedList);
  } else {
    showCharactersAll(filteredListToSort.sort(compareString));
  }

  function compareString(character1, character2) {
    return character1[valueToSortBy].localeCompare(character2[valueToSortBy]);
  }

  function compareNumber(character1, character2) {
    let first = character1.age;
    let second = character2.age;
    if (first === "Unknown") {
      first = 100000000;
    } else if (second === "Unknown") {
      second = 100000000;
    }
    return first - second;
  }
}

function showCharactersAll(array) {
  document.querySelector(".grid-container").innerHTML = "";

  for (const character of array) {
    showCharacter(character);
  }
}

function showCharacter(character) {
  let age = character.age;
  if (character.age.toLowerCase() === "unknown") {
    age = "This character's age is unknown!";
  } else {
    age = "Age: " + character.age + " years old";
  }

  const html = /* HTML */ `
    <article class="grid-item">
      <h3>${character.name}</h3>
      <img src="${character.image}" />
      <p>Race: ${character.race}</p>
      <p>${age}</p>
      <p>Actor: ${character.actor}</p>
      <div class="btns">
        <button class="buttonAni">Show more info</button>
      </div>
    </article>
  `;
  // <button id="btn-delete">Delete</button>
  // <button id="btn-update">Update</button>
  document
    .querySelector(".grid-container")
    .insertAdjacentHTML("beforeend", html);

  // document.querySelector(".grid-container article:last-child #btn-delete").addEventListener("click", () => deleteButtonClickedOpenModal(character));
  // document.querySelector(".grid-container article:last-child #btn-update").addEventListener("click", () => updateButtonClicked(character));
  document
    .querySelector(".grid-container article:last-child")
    .addEventListener("click", () => showCharacterModal(character));
}

function showCharacterModal(character) {
  let age = character.age;
  let triology = character.movie;
  let family = character.family;
  let origin = character.origin;

  family = makeFamilyReadable(family, character);
  origin = makeOriginReadable(origin, character);
  triology = makeTriologyReadable(triology, character);
  age = makeAgeReadable(age, character);

  const html = /* HTML */ `
    <article class="modal-item">
      <h3>
        ${character.name} <button id="btn-close" class="buttonAni">Back</button>
      </h3>
      <img src="${character.image}" />
      <p>Race: ${character.race}</p>
      <p>Age: ${age}</p>
      <p>Actor: ${character.actor}</p>
      <p>Gender: ${character.gender}</p>
      <p>Triology: ${triology}</p>
      <p>Origin: ${origin}</p>
      <p>Family: ${family}</p>
      <p>Description: ${character.description}</p>
      <div class="btns">
        <button id="btn-delete" class="buttonAni">Delete</button>
        <button id="btn-update" class="buttonAni">Update</button>
      </div>
    </article>
  `;
  document.querySelector("#show-character-modal").innerHTML = html;
  document
    .querySelector("#btn-delete")
    .addEventListener("click", () => deleteButtonClickedOpenModal(character));
  document
    .querySelector("#btn-update")
    .addEventListener("click", () => updateButtonClicked(character));
  document
    .querySelector("#btn-close")
    .addEventListener("click", () =>
      document.querySelector("#show-character-modal").close()
    );
  document.querySelector("#show-character-modal").showModal();
  document.querySelector("body").classList.add("blur");
  document.querySelector("#btn-close").addEventListener("click", blurRemoved);
}

function updateButtonClicked(character) {
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
  document.querySelector("#show-character-modal").close();
  document.querySelector("#dialog-update-character").showModal();
}

function deleteButtonClickedOpenModal(character) {
  document.querySelector("#dialog-delete-character-title").textContent =
    character.name;
  document
    .querySelector("#form-delete-character")
    .setAttribute("data-id", character.id);
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

  const response = await createNewCharacter(
    name,
    image,
    race,
    age,
    actor,
    movie,
    origin,
    family,
    description,
    gender
  );

  if (response.ok) {
    getUpdatedFirebase();
    form.reset();
    document.querySelector("#dialog-create-character").close();
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

  const response = await updatePost(
    id,
    name,
    image,
    race,
    age,
    gender,
    actor,
    movie,
    origin,
    family,
    description
  );
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
  filteredList = result;
  searchedList = result;
  showCharactersAll(result);
}

function blurRemoved() {
  document.querySelector("body").classList.remove("blur");
}
