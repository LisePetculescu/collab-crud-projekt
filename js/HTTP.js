import { prepareData } from "./helper-functions.js";

const lotrDatabase =
  "https://lotr-database-crud-default-rtdb.europe-west1.firebasedatabase.app";

async function getJSON() {
  // Fetcher og laver om til javascript objekt
  const fireBaseObjects = await fetch(
    "https://lotr-database-crud-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
  );
  const fetchedObjectes = await fireBaseObjects.json();

  // Laver objekt-inde-i-objekt-listen om til et egentligt array
  const objectsToArray = prepareData(fetchedObjectes);

  return objectsToArray;
}

async function createNewCharacter(
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
) {
  const newCharacter = {
    name,
    image,
    race,
    age,
    actor,
    movie,
    origin,
    family,
    description,
    gender,
  };
  const json = JSON.stringify(newCharacter);

  const response = await fetch(`${lotrDatabase}/posts.json`, {
    method: "POST",
    body: json,
  });

  if (response.status === 200) {
    console.log("****************200***************");
    success();
  } else {
    console.log("################shit#############");
    failed();
  }

  return response;
}

// HTTP Method: PUT
async function updatePost(
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
) {
  // Variabel med properties der skal opdateres
  const characterToUpdate = {
    name,
    image,
    race,
    age,
    gender,
    actor,
    movie,
    origin,
    family,
    description,
  };
  console.log(characterToUpdate);
  // Konverterer js objekt til json string
  const json = JSON.stringify(characterToUpdate);

  //   Fetcher specifikt link til den character der skal opdateres, og putter nyt data ind
  const response = await fetch(`${lotrDatabase}/posts/${id}.json`, {
    method: "PUT",
    body: json,
  });

  console.log("id", id);
  //Hvis response er ok, udskriv log og opdater grid
  //   if (response.ok) {
  //     console.log("Updated post ${id}");
  //     getUpdatedFirebase();
  //   }

  if (response.status === 200) {
    console.log("****************200***************");
    success();
  } else {
    console.log("################shit#############");
    failed();
  }
  return response;
}

// HTTP Method: DELETE
async function deletePost(id) {
  // Fetch link med præcis ID af det post der skal slettes
  const response = await fetch(`${lotrDatabase}/posts/${id}.json`, {
    method: "DELETE",
  });
  console.log(`${lotrDatabase}/posts/${id}.json`);
  // Hvis response er ok, udskriv log og opdater grid

  if (response.status === 200) {
    console.log("****************200***************");
    success();
  } else {
    console.log("################shit#############");
    failed();
  }
  return response;
}

function success() {
  const alertSuccess = document.createElement("div");
  alertSuccess.id = "createSuccess";
  alertSuccess.textContent = "Success :D";

  document.body.appendChild(alertSuccess);

  // Remove after 5 seconds
  setTimeout(() => {
    alertSuccess.remove();
  }, 2000);
}

function failed() {
  const alertFailed = document.createElement("div");
  alertFailed.id = "createFailed";
  alertFailed.textContent = "Failed :(";

  document.body.appendChild(alertFailed);

  // Remove after 5 seconds
  setTimeout(() => {
    alertFailed.remove();
  }, 3000);
}

export { getJSON, updatePost, deletePost, createNewCharacter };
