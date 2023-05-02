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

function filterBySearch(valueToSearchFor) {
  console.log("posts", posts);
  return posts.filter((post) => post.name.toLowerCase().includes(valueToSearchFor));
  // const filteredList = posts.filter(checkName);
  // function checkName(post) {
  //   const lowerCasePosts = post.name.toLowerCase();
  //   return lowerCasePosts.includes(valueToSearchFor);
  // }
  // return filteredList;
}


function capitalFirstLetter(string) {
  const result = string.slice(0, 1).toUpperCase() + string.slice(1)
  console.log(result)
return result
}

export { prepareData, capitalFirstLetter, filterBySearch };
// export {prepareData}
