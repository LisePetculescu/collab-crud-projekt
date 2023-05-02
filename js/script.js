import {getJSON, updatePost, deletePost, createNewPost} from "./HTTP.js"
//////////////////////////////////////////////////////////////////////
//////////////////DET ER ULOVLIGT AT ARBEJDE I MAINBRANCH/////////////
//////////////////////////////////////////////////////////////////////

window.addEventListener("load", start);

let posts = [];

function start() {
  console.log("js is running");

  // Opdaterer den globale variabel til posts-arrayet
  getUpdatedFirebase()

  document.querySelector("#input-search").addEventListener("keyup", searchBarChanged);
  document.querySelector("#input-search").addEventListener("search", searchBarChanged);
  document.querySelector("#form-delete-character").addEventListener("submit", deleteCharacterYes);
  document.querySelector("#form-update-character").addEventListener("submit", updateCharacterYes);
  document.querySelector("#btn-create-character").addEventListener("click",createCharacterModal)
  document.querySelector("#btn-no-update").addEventListener("click", () => document.querySelector("#dialog-update-character").close());
  document.querySelector("#btn-no-create").addEventListener("click", () => document.querySelector("#dialog-create-character").close());
  document.querySelector("#btn-no-delete").addEventListener("click", () => document.querySelector("#dialog-delete-character").close());
}


function searchBarChanged(event) {
  const valueToSearchFor = event.target.value.toLowerCase();

  const filteredList = filterBySearch(valueToSearchFor);

  showCharactersAll(filteredList)
}

function filterBySearch(valueToSearchFor) {
  const filteredList = posts.filter(checkName);
  function checkName(post) {
    const lowerCasePosts = post.name.toLowerCase();
    return lowerCasePosts.includes(valueToSearchFor);
  }
  return filteredList;
}

function sortByX(params) {
  // If statements for de forskellige parametre
  // showPostsAll()
}

function filterByX(params) {
  // If statements for de forskellige parametre
  // showPostsAll()
}

function showCharactersAll(array) {
  document.querySelector(".grid-container").innerHTML = "";

  for (const character of array) {
    showCharacter(character);
  }
}

function showCharacter(character) {
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
  document.querySelector(".grid-container").insertAdjacentHTML("beforeend", html);

  document.querySelector(".grid-container article:last-child #btn-delete").addEventListener("click", () => deleteButtonClickedOpenModal(character));
  document.querySelector(".grid-container article:last-child #btn-update").addEventListener("click", () => updateButtonClicked(character));
}

function updateButtonClicked(character) {
  console.log("updateButtonClicked")
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
  console.log("characterid",character.id)
  document.querySelector("#dialog-update-character").showModal();
}

function deleteButtonClickedOpenModal(character) {
  document.querySelector("#dialog-delete-character-title").textContent = character.name;
  document.querySelector("#form-delete-character").setAttribute("data-id", character.id);
  document.querySelector("#dialog-delete-character").showModal();
}

async function createCharacterModal(event) {
  event.preventDefault();
  document.querySelector("#dialog-create-character").showModal();

  // const response = await createNewPost()
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
  // document.querySelector("#dialog-delete-character").close();
  const id = event.target.getAttribute("data-id");
  const response = await deletePost(id);
    if (response.ok) {
      console.log(`DELETED CHARACTER ${id}`);
      getUpdatedFirebase();
    }
}

async function getUpdatedFirebase(params) {
  const posts = await getJSON();
  showCharactersAll(posts);
}

