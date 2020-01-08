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

export {nums , titles , houseTypes , checks , features , photos , map_pins , map , fildsets , address , rooms , mapPinMain , capacityGuests , form}
