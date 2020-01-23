import {fildsets, form, map , mapPinMain} from "./data.js";
import {disabledFieldset} from "./form.js"
import {activeMap, subscribePinsOnClick} from "./map.js";
import {createPin} from "./pin.js";
import {createCard} from "./card.js";
import {load,upload} from "./backend.js";

let templates = undefined;
// = generateTemplates();
disabledFieldset(fildsets);

function activateMapHandler() {
  return function () {
    activeMap(map, form, fildsets);
    createPin(templates);
    createCard(templates[0]);
    subscribePinsOnClick(templates);
  };
}

mapPinMain.addEventListener("mouseup", activateMapHandler());

let onError = function(message){
  alert(message);
};
let onSuccess = function(data){
  templates = data;
  document.querySelector(".map__pin--main").removeAttribute("disabled");
  console.log(templates);
};

let onSuccessForm = function(){
  document.querySelector(".ad-form").reset();
  alert("Пин добавлен");
};

load("https://js.dump.academy/keksobooking/data", onSuccess, onError);

let formSub = document.querySelector(".ad-form");
formSub.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const formData = new FormData(form);
  console.log(formData);
  upload(formData, "https://js.dump.academy/keksobooking", onSuccessForm , onError);
});
