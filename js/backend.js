let xhr = new XMLHttpRequest();
xhr.responseType = "json";

function getStatus(xhr, onSuccess, onError) {
  xhr.addEventListener("load", function () {
    let error;
    if (xhr.status === 200) {
      onSuccess(xhr.response);
    } else {
      error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
    }
    if (error) {
      onError(error);
    }
  });
  xhr.addEventListener("error", function () {
    onError("Произошла ошибка соединения");
  });
  xhr.addEventListener("timeout", function () {
    onError("Запрос не успел выполнениться за " + xhr.timeout + "mc");
  });
  xhr.timeout = 1000;
  return xhr;
}

let load = function (url, onSuccess, onError) {
  getStatus(xhr, onSuccess, onError);
  xhr.open("GET", url);
  xhr.send();
};

let upload = function (data, url, onSuccessForm, onError) {
  getStatus(xhr, onSuccessForm, onError);
  xhr.open("POST", url);
  xhr.send(data);
};
export {load, upload}

