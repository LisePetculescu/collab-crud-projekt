"use strict";

//////////////////////////////////////////////////////////////////////
//////////////////DET ER ULOVLIGT AT ARBEJDE I MAINBRANCH/////////////
//////////////////////////////////////////////////////////////////////

window.addEventListener("load", start);

// const lotrDatabase = "https://test-project-8f8dd-default-rtdb.europe-west1.firebasedatabase.app";
let posts = [];
const lotrDatabase =
  "https://lotr-database-crud-default-rtdb.europe-west1.firebasedatabase.app/";

// https://lotr-characters-default-rtdb.europe-west1.firebasedatabase.app/

async function start() {
  console.log("js in running");
  // getJSON(lotrDatabase, "users")

  // showPosts()

  // document.querySelector("#????").addEventListener("keyup",searchBarChanged)
  // document.querySelector("#????").addEventListener("search",searchBarChanged)
}

// getJSON(lotrDatabase, "characters")

async function getJSON(URL, source) {
  // Fetcher og laver om til javascript objekt
  const fireBaseObjects = await fetch(`${URL}/${source}.json`);
  // const fireBaseObjects = await fetch(`${URL}.json`)
  const fetchedObjectes = await fireBaseObjects.json();

  // Laver objekt-inde-i-objekt-listen om til et egentligt array
  const objectsToArray = prepareData(fetchedObjectes);

  // Gemmer værdien i den globale variabel og returnerer værdien
  posts = objectsToArray;
  console.log(posts);
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
  filterBySearch(input);
}

function filterBySearch(params) {
  // showPostsAll(array)
}

function sortByX(params) {
  // showPostsAll()
}
function sortByXX(params) {
  // showPostsAll()
}

function filterByX(params) {
  // showPostsAll()
}
function filterByXX(params) {
  // showPostsAll()
}

function showPostsAll(array) {
  // appendchild()
  for (const post of array) {
  }
}
function showPost(post) {
  // document.querySelector("#deleteBtn").addEventListener("click",deleteButtonClickedOpenModal)
  // document.querySelector("#updateBtn").addEventListener("click",updateButtonClicked)
  function updateButtonClicked(params) {
    updatePost();
  }
  function deleteButtonClickedOpenModal(params) {
    deletePost();
  }
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
