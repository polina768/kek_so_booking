//capacityGuests передать
import {capacityGuests , rooms} from "./data.js";

function disabledFieldset(fieldsets) {
  for (let fieldset of fieldsets) {
    fieldset.setAttribute("disabled", "true");
  }
}
function disableInput(capacityGuests) {
  capacityGuests.setAttribute("disabled", "true");
}
rooms.addEventListener("change", function () {
  let checkedOption = rooms.querySelector("#room_number option:checked");
  fillOptionOnCapacityGuestsHandler(checkedOption, capacityGuests);
});

function fillOptionValue(capacityGuests, value, text) {
  let option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  capacityGuests.append(option);
}

function fillOptionOnCapacityGuestsHandler(selectOption, capacityGuests) {
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
function showAddress(y, x) {
  address.value = `${x}, ${y}`;
}

fillOptionOnCapacityGuestsHandler(rooms.querySelector("option:checked"), capacityGuests);
disableInput(capacityGuests);

export {disabledFieldset , showAddress}
