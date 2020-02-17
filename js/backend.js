// let xhr = new XMLHttpRequest();
// xhr.responseType = "json";

// function getStatus(xhr, onSuccess, onError) {
//   xhr.addEventListener("load", function () {
//     let error;
//     if (xhr.status === 200) {
//       onSuccess(xhr.response);
//
//     } else {
//       error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
//     }
//     if (error) {
//       onError(error);
//     }
//   });
//   xhr.addEventListener("error", function () {
//     onError("Произошла ошибка соединения");
//   });
//   xhr.addEventListener("timeout", function () {
//     onError("Запрос не успел выполнениться за " + xhr.timeout + "mc");
//   });
//   xhr.timeout = 1000;
//   return xhr;
// }
let load = function (url, onSuccess, onError) {
  fetch(url)
    .then(data => {
      if (data.status === 200) {
        return data.json();
      }
      throw  `Ошибка. Статус ${data.status}`;
    })
    .then(json => {
      onSuccess(json)
    })
    .catch(error => onError(error));
};

// let load = function (url, onSuccess, onError) {
//   getStatus(xhr, onSuccess, onError);
//   xhr.open("GET", url);
//   xhr.send();
// };

let upload = (formSub, url, onSuccessForm, onError) => {
  fetch(url, {
    method: 'POST',
    body: new FormData(formSub),
  })
    .then(elem => {
      if (elem.status !== 200) {
        throw elem;
      } else {
        onSuccessForm(elem);
      }
    })
    .catch(error => error.text())
    .then(error => onError(error));
};
// let upload = function (data, url, onSuccessForm, onError) {
//   getStatus(xhr, onSuccessForm, onError);
//   xhr.open("POST", url);
//   xhr.send(data);
// };
export {load, upload};

