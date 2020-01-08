import {map} from "./data.js"

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

function findCardByPosition(x, y , templates) {
  for (let template of templates) {
    let tempХ = `${template.location.x}px`;
    let tempY = `${template.location.y}px`;
    if (tempХ == x && tempY == y) {
      return template;
    }
  }
}

export {createCard , showCardHandler}
