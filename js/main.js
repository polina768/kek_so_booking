const nums = [1, 2, 3, 4, 5, 6, 7, 8];
const titles = [
  "Большая уютная квартира", "Маленькая неуютная квартира",
  "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик",
  "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
const houseTypes = ["palace", "flat", "house", "bungalo"];
const checks = ["12:00", "13:00", "14:00"];
const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const photos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

const map_pins = document.querySelector(".map__pins");
const map = document.querySelector(".map");
const mapPinMain = document.querySelector(".map__pin--main");

const form = document.querySelector(".ad-form");
const fildsets = document.querySelectorAll("fieldset");
const address = document.querySelector("#address");

const rooms = document.querySelector("#room_number");
const capacityGuests = document.querySelector("#capacity");

function disabledFildset(fildsets) {
  for (let i of fildsets) {
    i.setAttribute("disabled", "true");
  }
}

disabledFildset(fildsets);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function createIcons(nums) {
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
  return {x, y} // Из svg взято
}

function createAuthor() {
  return {
    avatars: createIcons(nums),
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

function createPin(templates) {
  const template = document.querySelector("#pin").content.querySelector("button");
  for (let item of templates) {
    let pin = template.cloneNode(true);
    let pinObj = item;
    pin.style.left = `${pinObj.location.x}px`;
    pin.style.top = `${pinObj.location.y}px`;
    pin.firstChild.src = `${pinObj.author.avatars}`;
    pin.firstChild.alt = `${pinObj.offer.title}`;
    map_pins.append(pin);
  }
}

function getTypeHouse(str) {
  switch (str) {
    case "flat":
      return "Квартира";
    case "bungalo":
      return "Бунгало";
    case "house":
      return "Дом";
    case "palace":
      return "Дворец";
  }
}

function createPhotos(photoContainer, images) {
  photoContainer.innerHTML = "";
  for (let item of images) {
    let image = document.createElement("img");
    image.src = item;
    image.classList.add("popup__photo");
    image.width = 45;
    image.height = 40;
    image.alt = "Фотография жилья";
    photoContainer.append(image);
  }
}

function createFeature(featureContainer, features) {
  featureContainer.innerHTML = "";
  for (let feature of features) {
    let featureElement = document.createElement("li");
    featureElement.classList.add("popup__feature");
    featureElement.classList.add(`popup__feature--${feature}`);
    featureContainer.append(featureElement);
  }
}

function createCard(cardTemplates) {
  let template = document.querySelector("#card").content.querySelector("article");
  let card = template.cloneNode(true);
  let cardObj = cardTemplates;
  card.querySelector(".popup__title").textContent = cardObj.offer.title;
  card.querySelector(".popup__text--address").textContent = cardObj.offer.address;
  card.querySelector(".popup__text--price").textContent = `${cardObj.offer.price}₽/ночь`;
  card.querySelector(".popup__type").textContent = getTypeHouse(cardObj.offer.type);
  card.querySelector(".popup__text--capacity").textContent = `${cardObj.offer.rooms} комнаты для ${cardObj.offer.guests} гостей.`;
  card.querySelector(".popup__text--time").textContent = `Заезд после ${cardObj.offer.checkin}, выезд до ${cardObj.offer.checkout}`;

  let featureContainer = card.querySelector(".popup__features");
  createFeature(featureContainer, cardObj.offer.features);

  card.querySelector(".popup__description").textContent = cardObj.offer.description;

  let photoContainer = card.querySelector(".popup__photos");
  createPhotos(photoContainer, cardObj.offer.photos);

  card.querySelector(".popup__avatar").src = cardObj.author.avatars;
  map.append(card);
}


function activeMap(map, form, fildsets) {
  map.classList.remove("map--faded");
  form.classList.remove("ad-form--disabled");
  for (let fildset of fildsets) {
    fildset.removeAttribute("disabled");
  }
}

function showAddress(address) {
  address.value = "0, 0";
}

let templates = generateTemplates();

function showCardHandler(evt) {
  let pinPosition = evt.target;
  if (evt.target.tagName == "IMG") {
    pinPosition = evt.target.parentNode;
  }
  let pinPositionX = pinPosition.style.left;
  let pinPositionY = pinPosition.style.top;
  let card = document.querySelector("article");
  card.innerHTML = "";
  let template = findCardByPosition(pinPositionX, pinPositionY);
  createCard(template);
}

function subscribePinsOnClick() {
  const btnMapPins = document.querySelectorAll(".map__pin:not(.map__pin--main)");
  for (let btnMapPin of btnMapPins) {
    btnMapPin.addEventListener("click", showCardHandler);
  }
}

function findCardByPosition(x, y) {
  for (let template of templates) {
    let tempХ = `${template.location.x}px`;
    let tempY = `${template.location.y}px`;
    if (tempХ == x && tempY == y) {
      return template;
    }
  }
}

  mapPinMain.addEventListener("mouseup", function () {
    activeMap(map, form, fildsets);
    showAddress(address);
    createPin(templates);
    createCard(templates[0]);
    subscribePinsOnClick();
  });

  function disableInput(capacityGuests) {
    capacityGuests.setAttribute("disabled", "true");
  }

  rooms.addEventListener("change", function () {
    let checkedOption = rooms.querySelector("#room_number option:checked");
    fillOptionOnCapacityGuests(checkedOption, capacityGuests);
  });

function fillOptionValue(capacityGuests, value, text) {
  let option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  capacityGuests.append(option);
}

function fillOptionOnCapacityGuests(selectOption, capacityGuests) {
    capacityGuests.removeAttribute("disabled");
    let roomsValue = selectOption.value;
    capacityGuests.innerHTML = "";
    if (roomsValue == 1) {
      fillOptionValue(capacityGuests, "1", "для 1 гостя");
    }
    if (roomsValue == 2) {
      fillOptionValue(capacityGuests, "1", "для 1 гостя");
      fillOptionValue(capacityGuests, "2", "для 2 гостей");
    }
    if (roomsValue == 3) {
      fillOptionValue(capacityGuests, "1", "для 1 гостя");
      fillOptionValue(capacityGuests, "2", "для 2 гостей");
      fillOptionValue(capacityGuests, "3", "для 3 гостей");
    }
    if (roomsValue == 100) {
      fillOptionValue(capacityGuests, "100", "не для гостей");
    }
  }

  fillOptionOnCapacityGuests(rooms.querySelector("option:checked"), capacityGuests);
  disableInput(capacityGuests);
