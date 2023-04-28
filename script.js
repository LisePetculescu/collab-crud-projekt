"use strict";

//////////////////////////////////////////////////////////////////////
//////////////////DET ER ULOVLIGT AT ARBEJDE I MAINBRANCH/////////////
//////////////////////////////////////////////////////////////////////

window.addEventListener("load", start);

const lotrDatabase = "https://test-project-8f8dd-default-rtdb.europe-west1.firebasedatabase.app";
let posts = [];
// const lotrDatabase =
//   "https://lotr-database-crud-default-rtdb.europe-west1.firebasedatabase.app/";

async function start() {
  console.log("js in running");
  getJSON(lotrDatabase, "users")
  // showPosts()
  // document.querySelector("#????").addEventListener("keyup",searchBarChanged)
  // document.querySelector("#????").addEventListener("search",searchBarChanged)
}

// getJSON(lotrDatabase, "characters")

async function getJSON(URL, source) {
  // LAV EN FIREBASE SOM VI KAN HENTE FRA
  const fireBaseObjects = await fetch(`${URL}/${source}.json`)
  const fetchedObjectes = await fireBaseObjects.json()
  console.log(fetchedObjectes)
  const objectsToArray = prepareData(fetchedObjectes)
  // prepareData();
  // return objectsToArray;
}

async function prepareData(listOfObjects) {
  const arrayFromObjects = []
  console.log(listOfObjects)
  for (const object in listOfObjects) {
    const post = listOfObjects[object]
    post.id = object
    arrayFromObjects.push(post)
  }
  console.log(arrayFromObjects)
  return arrayFromObjects
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
function getUpdatedFirebase(params) {
  showPostsAll();
}
function name(params) {}
function name(params) {}
function name(params) {}
