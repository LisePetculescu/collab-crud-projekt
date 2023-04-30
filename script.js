"use strict";

//////////////////////////////////////////////////////////////////////
//////////////////DET ER ULOVLIGT AT ARBEJDE I MAINBRANCH/////////////
//////////////////////////////////////////////////////////////////////

window.addEventListener("load", start);

let posts = [];
const lotrDatabase =
  "https://lotr-database-crud-default-rtdb.europe-west1.firebasedatabase.app/";

async function start() {
  console.log("js is running");

  // Opdaterer den globale variabel til posts-arrayet
  posts = await getJSON(lotrDatabase, "posts");

  // showPosts()

  // document.querySelector("#????").addEventListener("keyup",searchBarChanged)
  // document.querySelector("#????").addEventListener("search",searchBarChanged)

  document
    .querySelector("#form-delete-character")
    .addEventListener("submit", deleteCharacterYes);

  document
    .querySelector("#form-update-character")
    .addEventListener("submit", updateCharacterYes);
}

async function getJSON(URL, source) {
  // Fetcher og laver om til javascript objekt
  const fireBaseObjects = await fetch(`${URL}/${source}.json`);
  const fetchedObjectes = await fireBaseObjects.json();

  // Laver objekt-inde-i-objekt-listen om til et egentligt array
  const objectsToArray = prepareData(fetchedObjectes);

  return objectsToArray;
}

function prepareData(listOfObjects) {
  const arrayFromObjects = [];

  // looper igennem objektlisten, giver dem et id og pusher dem til det tomme array
  for (const object in listOfObjects) {
    const post = listOfObjects[object];
    post.id = object;
    arrayFromObjects.push(post);
  }

  return arrayFromObjects;
}

function searchBarChanged(input) {
  // filterBySearch(input);
}

function filterBySearch(params) {
  // showPostsAll(array)
}

function sortByX(params) {
  // If statements for de forskellige parametre
  // showPostsAll()
}
function filterByX(params) {
  // If statements for de forskellige parametre
  // showPostsAll()
}

function showPostsAll(array) {
  // omdøb til showCharactersALL?
  // appendchild() - what??

  document.querySelector(".grid-container").innerHTML = "";

  for (const character of array) {
    showPost(character);
  }
}
function showPost(character) {
  // omdøb til showCharacter??
  const html = /* HTML */ `
    <article class="grid-item">
      <h3>${character.name}</h3>
      <img src="${character.image}" />
      <p>${character.race}</p>
      <p>${character.age}</p>
      <p>${character.gender}</p>
      <p>${character.actor}</p>
      <p>${character.movie}</p>
      <p>${character.origin}</p>
      <p>${character.family}</p>
      <p>${character.description}</p>
      <div class="btns">
        <button id="btn-delete">Delete</button>
        <button id="btn-update">Update</button>
      </div>
    </article>
  `;
  document
    .querySelector(".grid-container")
    .insertAdjacentHTML("beforeend", html);

  document
    .querySelector(".grid-container article:last-child #btn-delete")
    .addEventListener("click", deleteButtonClickedOpenModal);
  document
    .querySelector(".grid-container article:last-child #btn-update")
    .addEventListener("click", updateButtonClicked);

  function updateButtonClicked() {
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
    document.querySelector("#dialog-update-character").showModal();

    // updatePost();
  }

  function deleteButtonClickedOpenModal(character) {
    document.querySelector("#dialog-delete-character-title").textContent =
      character.name;
    document
      .querySelector("#form-delete-character")
      .setAttribute("data-id", character.id);
    document.querySelector("#dialog-delete-character").showModal();

    // deletePost();
  }
}

function updateCharacterYes(event) {
  event.preventDefault();

  const form = event.target;

  const name = form.character.name;
  const image = form.character.image;
  const race = form.character.race;
  const age = form.character.age;
  const gender = form.character.gender;
  const actor = form.character.actor;
  const movie = form.character.movie;
  const origin = form.character.origin;
  const family = form.character.family;
  const description = form.character.description;

  const id = form.getAttribute("data-id");

  updatePost(
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
  document.querySelector("#dialog-update-character").close();
}

function deleteCharacterYes(event) {
  // document.querySelector("#dialog-delete-character").close();
  const id = event.target.getAttribute("data-id");
  deletePost(id);
}

function createPostModal(params) {}
function createNewPost(params) {
  // getUpdatedFirebase()
}

function updatePost(params) {
  // getUpdatedFirebase()
}
function deletePost(params) {
  // getUpdatedFirebase()
}
async function getUpdatedFirebase(params) {
  const posts = await getJSON();
  showPostsAll(posts);
}
function name(params) {}
function name(params) {}
function name(params) {}
