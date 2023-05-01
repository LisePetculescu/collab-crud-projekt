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

  // showPosts()

  // document.querySelector("#????").addEventListener("keyup",searchBarChanged)
  // document.querySelector("#????").addEventListener("search",searchBarChanged)
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

// HTTP Method: PUT
async function updatePost(id, name, image, race, age, gender, actor, movie, origin, family, description) {
    // Variabel med properties der skal opdateres
  const characterToUpdate = {name, image, race, age, gender, actor, movie, origin, family, description}

  // Konverterer js objekt til json string
  const json = JSON.stringify(characterToUpdate);

  // Fetcher specifikt link til den character der skal opdateres, og putter nyt data ind
  const response = await fetch(`${endpoint}/characters/${id}.json`, {
    method: "PUT",
    body: json
  });


  //Hvis response er ok, udskriv log og opdater grid
  if (response.ok) {
    console.log("Updated post ${id}");
    getUpdatedFirebase()
  }
}

// HTTP Method: DELETE
async function deletePost(id) {
  // Fetch link med præcis ID af det post der skal slettes
  const response = await fetch(`${endpoint}/characters/${id}.json`, {
    method: "DELETE",
    });
    // Hvis response er ok, udskriv log og opdater grid
    if (response.ok) {
      console.log("DELETED CHARACTER ${id}");
      getUpdatedFirebase();
    }
}
async function getUpdatedFirebase(params) {
  const posts = await getJSON();
  showPostsAll(posts);
}
function name(params) {

}
function name(params) {

}
function name(params) {

}
