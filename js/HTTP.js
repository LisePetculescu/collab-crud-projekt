import { prepareData } from "./helper-functions.js";

const lotrDatabase = "https://lotr-database-crud-default-rtdb.europe-west1.firebasedatabase.app";
async function getJSON() {
  // Fetcher og laver om til javascript objekt
  const fireBaseObjects = await fetch("https://lotr-database-crud-default-rtdb.europe-west1.firebasedatabase.app/posts.json");
  const fetchedObjectes = await fireBaseObjects.json();

  // Laver objekt-inde-i-objekt-listen om til et egentligt array
  const objectsToArray = prepareData(fetchedObjectes);

  return objectsToArray;
}

async function createNewPost(params) {
  // getUpdatedFirebase()

  // HELP MEEEEE
  return reponse
}

// HTTP Method: PUT
async function updatePost(id, name, image, race, age, gender, actor, movie, origin, family, description) {
  // Variabel med properties der skal opdateres
  const characterToUpdate = { name, image, race, age, gender, actor, movie, origin, family, description };
    console.log(characterToUpdate)
  // Konverterer js objekt til json string
  const json = JSON.stringify(characterToUpdate);

//   Fetcher specifikt link til den character der skal opdateres, og putter nyt data ind
  const response = await fetch(`${lotrDatabase}/posts/${id}.json`, {
    method: "PUT",
    body: json,
  });

  console.log("id",id)
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
  const response = await fetch(`${lotrDatabase}/posts/${id}.json`, {
    method: "DELETE",
  });
  console.log(`${lotrDatabase}/posts/${id}.json`);
  // Hvis response er ok, udskriv log og opdater grid
return response
}

export {getJSON, updatePost, deletePost, createNewPost}