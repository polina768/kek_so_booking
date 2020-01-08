import {mapPinMain} from "./data.js";
import {showCardHandler} from "./card.js";
import {showAddress} from "./form.js";

function activeMap(map, form, fildsets) {
  map.classList.remove("map--faded");
  form.classList.remove("ad-form--disabled");
  for (let fieldset of fildsets) {
    fieldset.removeAttribute("disabled");
  }
}

function subscribePinsOnClick() {
  const btnMapPins = document.querySelectorAll(".map__pin:not(.map__pin--main)");
  for (let btnMapPin of btnMapPins) {
    btnMapPin.addEventListener("click", showCardHandler);
  }
}

mapPinMain.addEventListener("mousedown", function (evt) {
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };

  let onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY,
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };

    let finishCoordTop = mapPinMain.offsetTop - shift.y;
    let finishCoordLeft = mapPinMain.offsetLeft - shift.x;
    if (finishCoordTop<0){
      finishCoordTop = 0;
    }
    if (finishCoordLeft<0){
      finishCoordLeft = 0;
    }
    if (finishCoordTop>630){
      finishCoordTop = 630;
    }
    if (finishCoordLeft>1180){
      finishCoordLeft = 1180;
    }

    showAddress(finishCoordTop, finishCoordLeft);
    mapPinMain.style.top = finishCoordTop + "px";
    mapPinMain.style.left = finishCoordLeft + "px";



  };

  let onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

export {activeMap , subscribePinsOnClick}
