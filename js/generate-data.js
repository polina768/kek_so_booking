import {checks, features, houseTypes, nums, photos, titles} from "./data.js";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateIcons(nums) {
  let randIndex = getRandomInt(0, nums.length);
  let randNum = nums[randIndex];
  nums.splice(randIndex, 1);
  return `img/avatars/user0${randNum}.png`;
}

function generateX(min, max) {
  return getRandomInt(min, max);
}

function generateY(min, max) {
  return getRandomInt(min, max);
}

function generateTitle(titles) {
  let randIndex = getRandomInt(0, titles.length);
  let randTitle = titles[randIndex];
  titles.splice(randIndex, 1);
  return randTitle;
}

function generatePrice(min, max) {
  return getRandomInt(min, max);
}

function generateType(houseTypes) {
  let randIndex = getRandomInt(0, houseTypes.length);
  let randType = houseTypes[randIndex];
  return randType;
}

function generateRooms(min, max) {
  return getRandomInt(min, max);
}

function generateGuests(min, max) {
  return getRandomInt(min, max);
}

function generateCheck(checks) {
  let randIndex = getRandomInt(0, checks.length);
  let randCheck = checks[randIndex];
  return randCheck;
}

function generateFeatures(featureArgs) {
  let features = [...featureArgs];
  let newFeat = [];
  let randLength = getRandomInt(1, features.length) + 1;
  while (newFeat.length !== randLength) {
    let randIndex = getRandomInt(0, features.length);
    let randFeat = features[randIndex];
    if (!newFeat.includes(randFeat)) {
      newFeat.push(randFeat);
      features.splice(randIndex, 1);
    }
  }
  return newFeat;
}
function generatePhotos(photoArgs) {
  let photos = [...photoArgs];
  let photoLength = photos.length;
  let newPhotos = [];
  while (newPhotos.length !== photoLength) {
    let randIndex = getRandomInt(0, photos.length);
    let randPhoto = photos[randIndex];
    if (!newPhotos.includes(randPhoto)) {
      newPhotos.push(randPhoto);
      photos.splice(randIndex, 1);
    }
  }
  return newPhotos;
}

function createOffer(location) {
  let offer = {
    title: generateTitle(titles),
    address: `${location.x}, ${location.y}`,
    price: generatePrice(1000, 1000000),
    type: generateType(houseTypes),
    rooms: generateRooms(1, 5),
    guests: generateGuests(1, 20),
    checkin: generateCheck(checks),
    checkout: generateCheck(checks),
    features: generateFeatures(features),
    description: "",
    photos: generatePhotos(photos),
  };
  return offer;
}

function createLocation() {
  let x = generateX(0, 1200);
  let y = generateY(130, 631);
  return {x, y}
}

function createAuthor() {
  return {
    avatars: generateIcons(nums),
  };
}

function generateTemplates() {
  let templates = [];
  for (let i = 0; i < 8; i++) {
    let author = createAuthor();
    let location = createLocation();
    let template = {
      author: author,
      offer: createOffer(location),
      location: location,
    };
    templates.push(template);
  }
  return templates;
}

export {generateTemplates}
