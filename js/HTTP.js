import { prepareData } from "./helper-functions.js";

async function getJSON(URL, source) {
  // Fetcher og laver om til javascript objekt
  const fireBaseObjects = await fetch(`${URL}/${source}.json`);
  const fetchedObjectes = await fireBaseObjects.json();

  // Laver objekt-inde-i-objekt-listen om til et egentligt array
  const objectsToArray = prepareData(fetchedObjectes);

  return objectsToArray;
}

function createNewPost(params) {
  // getUpdatedFirebase()
}

// HTTP Method: PUT
async function updatePost(id, name, image, race, age, gender, actor, movie, origin, family, description) {
  // Variabel med properties der skal opdateres
  const characterToUpdate = { name, image, race, age, gender, actor, movie, origin, family, description };

  // Konverterer js objekt til json string
  const json = JSON.stringify(characterToUpdate);

  // Fetcher specifikt link til den character der skal opdateres, og putter nyt data ind
  const response = await fetch(`${endpoint}/characters/${id}.json`, {
    method: "PUT",
    body: json,
  });

  //Hvis response er ok, udskriv log og opdater grid
//   if (response.ok) {
//     console.log("Updated post ${id}");
//     getUpdatedFirebase();
//   }
  return response
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

export {getJSON, updatePost, deletePost, createNewPost}