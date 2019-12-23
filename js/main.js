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

function generateFeatures(features) {
  let arrFeatures = [...features];
  let newFeat = [];
  let randLength = getRandomInt(1, arrFeatures.length) + 1;
  while (newFeat.length !== randLength) {
    let randIndex = getRandomInt(0, arrFeatures.length);
    let randFeat = arrFeatures[randIndex];
    if (newFeat.indexOf(randFeat) == -1) {
      newFeat.push(randFeat);
      arrFeatures.splice(randIndex, 1);
    }
  }
  return newFeat;
}

function generatePhotos(photos) {
  let arrPhotos = [...photos];
  let photoLength = arrPhotos.length;
  let newArr = [];
  while (newArr.length !== photoLength) {
    let randIndex = getRandomInt(0, arrPhotos.length);
    let randPhoto = arrPhotos[randIndex];
    if (newArr.indexOf(randPhoto) == -1) {
      newArr.push(randPhoto);
      arrPhotos.splice(randIndex, 1);
    }
  }
  return newArr;
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

function createPin(arr) {
  let template = document.querySelector("#pin").content.querySelector("button");
  for (let i = 0; i < arr.length; i++) {
    let pin = template.cloneNode(true);
    let pinObj = arr[i];
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
  for (let i = 0; i < images.length; i++) {
    let image = document.createElement("img");
    image.src = images[i];
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
  for (let i of fildsets) {
    i.removeAttribute("disabled");
  }
}

function showAddress(address) {
  address.value = "0, 0";
}

function showCard() {
  const btnMapPins = document.querySelectorAll(".map__pin:not(.map__pin--main)");
  for (let i = 0; i < templates.length; i++) {
    btnMapPins[i].addEventListener("click", function (evt) {
      let pinPosition = evt.target;
      if (evt.target.tagName == "IMG") {
        pinPosition = evt.target.parentNode;
      }
      let pinPositionX = pinPosition.style.left;
      let pinPositionY = pinPosition.style.top;
      for (let j = 0; j < templates.length; j++) {
        let tempХ = `${templates[j].location.x}px`;
        let tempY = `${templates[j].location.y}px`;
        if (tempХ == pinPositionX && tempY == pinPositionY) {
          let card = document.querySelector("article");
          card.innerHTML = "";
          createCard(templates[j]);
          break;
        }
      }
    });
  }
}

let templates = generateTemplates();
mapPinMain.addEventListener("mouseup", function () {
  activeMap(map, form, fildsets);
  showAddress(address);
  createPin(templates);
  createCard(templates[0]);
  showCard();

});

const rooms = document.querySelector("#room_number");
const capacityGuests = document.querySelector("#capacity");
console.log(rooms);
console.log(capacityGuests);

function disabledInput(capacityGuests) {
  capacityGuests.setAttribute("disabled", "true");
}

disabledInput(capacityGuests);
let selectOption = document.querySelector("#room_number option:checked");
console.log(selectOption);
rooms.addEventListener("change", function () {
  let selectOption = rooms.querySelector("option:checked");
  fillOptionOnCapacityGuests(selectOption, capacityGuests);
});


function fillOptionOnCapacityGuests(selectOption, capacityGuests) {
  capacityGuests.removeAttribute("disabled");
  let roomsValue = selectOption.value;
  console.log(selectOption.value);
  capacityGuests.innerHTML = "";
  if (roomsValue == 1) {
    let option = document.createElement("option");
    option.value = "1";
    option.textContent = "для 1 гостя";
    capacityGuests.append(option);
  }
  if (roomsValue == 2) {
    let option = document.createElement("option");
    option.value = "1";
    option.textContent = "для 1 гостя";
    capacityGuests.append(option);
    let option2 = document.createElement("option");
    option2.value = "2";
    option2.textContent = "для 2 гостей";
    capacityGuests.append(option2);
  }
  if (roomsValue == 3) {
    let option = document.createElement("option");
    option.value = "1";
    option.textContent = "для 1 гостя";
    capacityGuests.append(option);
    let option2 = document.createElement("option");
    option2.value = "2";
    option2.textContent = "для 2 гостей";
    capacityGuests.append(option2);
    let option3 = document.createElement("option");
    option3.value = "3";
    option3.textContent = "для 3 гостей";
    capacityGuests.append(option3);
  }
  if (roomsValue == 100) {
    let option4 = document.createElement("option");
    option4.value = "100";
    option4.textContent = "не для гостей";
    capacityGuests.append(option4);
  }
}

fillOptionOnCapacityGuests(rooms.querySelector("option:checked"), capacityGuests);
