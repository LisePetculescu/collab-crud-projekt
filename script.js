"use strict";

//////////////////////////////////////////////////////////////////////
//////////////////DET ER ULOVLIGT AT ARBEJDE I MAINBRANCH/////////////
//////////////////////////////////////////////////////////////////////

window.addEventListener("load", start);

const lotrDatabase =
  "https://lotr-database-crud-default-rtdb.europe-west1.firebasedatabase.app/";

  // https://lotr-characters-default-rtdb.europe-west1.firebasedatabase.app/

function start() {
  console.log("js in running");
  // getJSON()
  // showPosts()
  // document.querySelector("#????").addEventListener("keyup",searchBarChanged)
  // document.querySelector("#????").addEventListener("search",searchBarChanged)
}

function getJSON(params) {
  // LAV EN FIREBASE SOM VI KAN HENTE FRA
  prepareData();
  return;
}
function prepareData(params) {
  return;
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
