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

function makeTriologyReadable(triology, character) {
  if (triology.toLowerCase() === "lotr") {
    triology = "Lord of The Rings";
  } else if (triology.toLowerCase() === "lotr, hobbit") {
    triology = `${character.name} is part of both The Hobbit and Lord of The Rings`;
  }

  return triology;
}

function makeOriginReadable(origin, character) {
  if (origin === "undefined") {
    origin = `${character.name}'s origin is unknown`;
  }
  return origin;
}

function makeFamilyReadable(family, character) {
  if (family === "undefined") {
    family = `${character.name}'s family is unclear`;
  }
  return family;
}

function makeAgeReadable(age, character) {
  if (character.age.toLowerCase() === "unknown") {
    age = "This character's age is unknown!";
  } else {
    age = character.age + " years old";
  }
  return age;
}

export { prepareData, makeTriologyReadable, makeAgeReadable, makeFamilyReadable, makeOriginReadable };
