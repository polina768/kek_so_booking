import {fildsets, form, map , mapPinMain} from "./data.js";
import {disabledFieldset} from "./form.js"
import {generateTemplates} from "./generate-data.js";
import {activeMap, subscribePinsOnClick} from "./map.js";
import {createPin} from "./pin.js";
import {createCard} from "./card.js";


let templates = generateTemplates();
disabledFieldset(fildsets);
mapPinMain.addEventListener("mouseup", function () {
  activeMap(map, form, fildsets);
  createPin(templates);
  createCard(templates[0]);
  subscribePinsOnClick();
});

