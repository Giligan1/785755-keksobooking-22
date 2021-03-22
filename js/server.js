import {showAlert} from './utils.js';

const ERROR_MESSAGE = 'При загрузке данных с сервера произошла ошибка. Попробуйте ещё раз';

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      return (response.ok) ? response.json() : showAlert(ERROR_MESSAGE);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert(ERROR_MESSAGE);
    });
}

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      return (response.ok) ? onSuccess() : onFail();
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
