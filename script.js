"use strict";

//////////////////////////////////////////////////////////////////////
//////////////////DET ER ULOVLIGT AT ARBEJDE I MAINBRANCH/////////////
//////////////////////////////////////////////////////////////////////

window.addEventListener("load", start);

let posts = [];
const lotrDatabase = "https://lotr-database-crud-default-rtdb.europe-west1.firebasedatabase.app/";

async function start() {
  console.log("js in running");

  // Opdaterer den globale variabel til posts-arrayet
  posts = await getJSON(lotrDatabase, "posts");

  // document.querySelector("#searchBar").addEventListener("keyup", searchBarChanged);
  // document.querySelector("#searchBar").addEventListener("search", searchBarChanged);
  // showPosts()
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

function searchBarChanged(event) {
  const valueToSearchFor = event.target.value.toLowerCase();
  console.log(valueToSearchFor);
  const filteredList = filterBySearch(valueToSearchFor);
  console.log(filteredList);
  // showPostsAll(filteredList)
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
