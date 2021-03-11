import {MIN_ARRAY_PRICES} from './data.js';
import {mainMarker, formFilters, formMapFilters, formMapFeatures, formAd, formAdHeader, formAdElement, adress} from './map.js';
import {isEscclick, isMouseclick} from './utils.js';
import {sendData} from './server.js';

/* global L:readonly */

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LEGNTH = 100;
const centerTokyoCoordinates = {
  LATITUDE: 35.68950,
  LONGTITUDE: 139.69171,
}

const main = document.querySelector('main');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorButton = errorMessage.querySelector('.error__button');
let timeIn = document.querySelector('#timein');
let timeOut = document.querySelector('#timeout');
let typeApartment = document.querySelector('#type');
let price = document.querySelector('#price');
let title = document.querySelector('#title');
let numberOfRooms = document.querySelector('#room_number');
let capacity = document.querySelector('#capacity');

if (typeApartment.selectedIndex === 1) {
  price.placeholder = MIN_ARRAY_PRICES[1];
  price.min = MIN_ARRAY_PRICES[1];
}

typeApartment.addEventListener('change', () => {
  if (typeApartment.selectedIndex === 0) {
    price.placeholder = MIN_ARRAY_PRICES[0];
    price.min = MIN_ARRAY_PRICES[0];
  }
  if (typeApartment.selectedIndex === 1) {
    price.placeholder = MIN_ARRAY_PRICES[1];
    price.min = MIN_ARRAY_PRICES[1];
  }
  if (typeApartment.selectedIndex === 2) {
    price.placeholder = MIN_ARRAY_PRICES[2];
    price.min = MIN_ARRAY_PRICES[2];
  }
  if (typeApartment.selectedIndex === 3) {
    price.placeholder = MIN_ARRAY_PRICES[3];
    price.min = MIN_ARRAY_PRICES[3];
  }
});

timeIn.addEventListener('change', () => {
  let current = timeIn.selectedIndex;
  timeOut.options[current].selected = true;
});

timeOut.addEventListener('change', () => {
  let current = timeOut.selectedIndex;
  timeIn.options[current].selected = true;
});

title.addEventListener('input', () => {
  const titleValue = title.value.length;
  if (titleValue < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleValue} симв.`)
  } else if (titleValue > MAX_TITLE_LEGNTH) {
    title.setCustomValidity(`Удалите лишние ${titleValue - MAX_TITLE_LEGNTH} симв.`)
  } else {
    title.setCustomValidity('');
  }

  title.reportValidity();
});

if (numberOfRooms.selectedIndex === 0) {
  capacity.selectedIndex = 2;
  capacity.options[0].setAttribute('disabled' ,'disabled');
  capacity.options[1].setAttribute('disabled' ,'disabled');
  capacity.options[3].setAttribute('disabled' ,'disabled');
}

numberOfRooms.addEventListener('change', () => {
  if (numberOfRooms.selectedIndex === 0) {
    capacity.selectedIndex = 2;
    capacity.options[2].removeAttribute('disabled' ,'disabled');
    capacity.options[0].setAttribute('disabled' ,'disabled');
    capacity.options[1].setAttribute('disabled' ,'disabled');
    capacity.options[3].setAttribute('disabled' ,'disabled');
  } else if (numberOfRooms.selectedIndex === 1) {
    capacity.selectedIndex = 2;
    capacity.options[1].removeAttribute('disabled' ,'disabled');
    capacity.options[2].removeAttribute('disabled' ,'disabled');
    capacity.options[0].setAttribute('disabled' ,'disabled');
    capacity.options[3].setAttribute('disabled' ,'disabled');
  } else if (numberOfRooms.selectedIndex === 2) {
    capacity.selectedIndex = 2;
    capacity.options[0].removeAttribute('disabled' ,'disabled');
    capacity.options[1].removeAttribute('disabled' ,'disabled');
    capacity.options[2].removeAttribute('disabled' ,'disabled');
    capacity.options[3].setAttribute('disabled' ,'disabled');
  } else if (numberOfRooms.selectedIndex === 3) {
    capacity.options[3].removeAttribute('disabled' ,'disabled');
    capacity.options[0].setAttribute('disabled' ,'disabled');
    capacity.options[1].setAttribute('disabled' ,'disabled');
    capacity.options[2].setAttribute('disabled' ,'disabled');
    capacity.selectedIndex = 3;
  }
  capacity.reportValidity();
});

const formReset = () => {
  formAd.reset(),
  formFilters.reset(),
  mainMarker.setLatLng(L.latLng(centerTokyoCoordinates.LATITUDE, centerTokyoCoordinates.LONGTITUDE)),
  adress.value = `${centerTokyoCoordinates.LATITUDE} , ${centerTokyoCoordinates.LONGTITUDE}`;
};

const getSuccessMessage = () => {
  successMessage.style.zIndex = 100;
  main.append(successMessage);
  formReset();
  document.addEventListener('keydown', closeSuccessMessage);
  document.addEventListener('click', closeSuccessMessage);
}

const closeSuccessMessage = (evt) => {
  if (isEscclick(evt) || isMouseclick(evt)) {
    evt.preventDefault();
    successMessage.remove();
    document.removeEventListener('keydown', closeSuccessMessage);
    document.removeEventListener('click', closeSuccessMessage);
  }
}

const getErrorMessage = () => {
  errorMessage.style.zIndex = 100;
  main.append(errorMessage);
  formReset();
  document.addEventListener('keydown', closeErrorMessage);
  document.addEventListener('click', closeErrorMessage);
  errorButton.addEventListener('click', closeErrorMessage);
}

const closeErrorMessage = (evt) => {
  if (isEscclick(evt) || isMouseclick(evt)) {
    evt.preventDefault();
    errorMessage.remove();
    document.removeEventListener('keydown', closeErrorMessage);
    document.removeEventListener('click', closeErrorMessage);
    errorButton.removeEventListener('click', closeSuccessMessage);
  }
}

const setFormSubmit = () => {
  formAd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(getSuccessMessage, getErrorMessage, new FormData(evt.target));
  })
}

setFormSubmit();

export {formFilters, formMapFilters, formMapFeatures, formAd, formAdHeader, formAdElement, adress};
