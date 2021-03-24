import {mainMarker, formMapFilters, formMapFeatures, formAd, formAdHeader, formAdElement, adress} from './map.js';
import {formFilters} from './filter.js';
import {isEscclick, isMouseclick} from './utils.js';
import {sendData} from './server.js';

/* global L:readonly */

const MIN_ARRAY_PRICES = [0, 1000, 5000, 10000];
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

const onTypeApartmentChange = () => {
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
};

typeApartment.addEventListener('change', onTypeApartmentChange)


const onTimeInChange = () => {
  let current = timeIn.selectedIndex;
  timeOut.options[current].selected = true;
};

timeIn.addEventListener('change', onTimeInChange)

const onTimeOutChange = () => {
  let current = timeOut.selectedIndex;
  timeIn.options[current].selected = true;
};

timeOut.addEventListener('change', onTimeOutChange)

const onTitleInput = () => {
  const titleValue = title.value.length;
  if (titleValue < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleValue} симв.`)
  } else if (titleValue > MAX_TITLE_LEGNTH) {
    title.setCustomValidity(`Удалите лишние ${titleValue - MAX_TITLE_LEGNTH} симв.`)
  } else {
    title.setCustomValidity('');
  }

  title.reportValidity();
};

title.addEventListener('input', onTitleInput)

const setAttributeDisabled = (input) => {
  input.setAttribute('disabled' ,'disabled');
}

const setAttributeRemove = (input) => {
  input.removeAttribute('disabled' ,'disabled');
}

if (numberOfRooms.selectedIndex === 0) {
  capacity.selectedIndex = 2;
  setAttributeDisabled(capacity.options[0]);
  setAttributeDisabled(capacity.options[1]);
  setAttributeDisabled(capacity.options[3]);
}

const onNumberOfRoomsChange = () => {
  if (numberOfRooms.selectedIndex === 0) {
    capacity.selectedIndex = 2;
    setAttributeRemove(capacity.options[2]);
    setAttributeDisabled(capacity.options[0]);
    setAttributeDisabled(capacity.options[1]);
    setAttributeDisabled(capacity.options[3]);
  } else if (numberOfRooms.selectedIndex === 1) {
    capacity.selectedIndex = 2;
    setAttributeRemove(capacity.options[1]);
    setAttributeRemove(capacity.options[2]);
    setAttributeDisabled(capacity.options[0]);
    setAttributeDisabled(capacity.options[3]);
  } else if (numberOfRooms.selectedIndex === 2) {
    capacity.selectedIndex = 2;
    setAttributeRemove(capacity.options[0]);
    setAttributeRemove(capacity.options[1]);
    setAttributeRemove(capacity.options[2]);
    setAttributeDisabled(capacity.options[3]);
  } else if (numberOfRooms.selectedIndex === 3) {
    setAttributeRemove(capacity.options[3]);
    setAttributeDisabled(capacity.options[0]);
    setAttributeDisabled(capacity.options[1]);
    setAttributeDisabled(capacity.options[2]);
    capacity.selectedIndex = 3;
  }
  capacity.reportValidity();
}

numberOfRooms.addEventListener('change', onNumberOfRoomsChange)


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
  document.addEventListener('keydown', onSuccessMessageClose);
  document.addEventListener('click', onSuccessMessageClose);
}

const onSuccessMessageClose = (evt) => {
  if (isEscclick(evt) || isMouseclick(evt)) {
    evt.preventDefault();
    successMessage.remove();
    document.removeEventListener('keydown', onSuccessMessageClose);
    document.removeEventListener('click', onSuccessMessageClose);
  }
}

const getErrorMessage = () => {
  errorMessage.style.zIndex = 100;
  main.append(errorMessage);
  formReset();
  document.addEventListener('keydown', onErrorMessageClose);
  document.addEventListener('click', onErrorMessageClose);
  errorButton.addEventListener('click', onErrorMessageClose);
}

const onErrorMessageClose = (evt) => {
  if (isEscclick(evt) || isMouseclick(evt)) {
    evt.preventDefault();
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorMessageClose);
    document.removeEventListener('click', onErrorMessageClose);
    errorButton.removeEventListener('click', onSuccessMessageClose);
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
