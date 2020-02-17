import {map_pins} from "./data.js"

function createPin(templates) {
  const template = document.querySelector("#pin").content.querySelector("button");
  for (let item of templates) {
    let pin = template.cloneNode(true);
    let pinObj = item;
    pin.style.left = `${pinObj.location.x}px`;
    pin.style.top = `${pinObj.location.y}px`;
    pin.firstChild.src = `${pinObj.author.avatar}`;
    pin.firstChild.alt = `${pinObj.offer.title}`;
    map_pins.append(pin);
  }
}

export {createPin}
