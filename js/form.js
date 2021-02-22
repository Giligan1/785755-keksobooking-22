import {MIN_ARRAY_PRICES} from './data.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LEGNTH = 100;

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
  capacity.setCustomValidity('Для 1 гостя');
}

numberOfRooms.addEventListener('change', () => {
  if (numberOfRooms.selectedIndex === 0) {
    capacity.selectedIndex = 2;
    capacity.options[2].removeAttribute('disabled' ,'disabled');
    capacity.options[0].setAttribute('disabled' ,'disabled');
    capacity.options[1].setAttribute('disabled' ,'disabled');
    capacity.options[3].setAttribute('disabled' ,'disabled');
    capacity.setCustomValidity('Для 1 гостя');
  } else if (numberOfRooms.selectedIndex === 1) {
    capacity.selectedIndex = 2;
    capacity.options[1].removeAttribute('disabled' ,'disabled');
    capacity.options[2].removeAttribute('disabled' ,'disabled');
    capacity.options[0].setAttribute('disabled' ,'disabled');
    capacity.options[3].setAttribute('disabled' ,'disabled');
    capacity.setCustomValidity('Для 2 гостей или для 1 гостя');
  } else if (numberOfRooms.selectedIndex === 2) {
    capacity.selectedIndex = 2;
    capacity.options[0].removeAttribute('disabled' ,'disabled');
    capacity.options[1].removeAttribute('disabled' ,'disabled');
    capacity.options[2].removeAttribute('disabled' ,'disabled');
    capacity.options[3].setAttribute('disabled' ,'disabled');
    capacity.setCustomValidity('Для 3 гостей, для 2 гостей или для 1 гостя');
  } else if (numberOfRooms.selectedIndex === 3) {
    capacity.options[3].removeAttribute('disabled' ,'disabled');
    capacity.options[0].setAttribute('disabled' ,'disabled');
    capacity.options[1].setAttribute('disabled' ,'disabled');
    capacity.options[2].setAttribute('disabled' ,'disabled');
    capacity.selectedIndex = 3;
    capacity.setCustomValidity('Не для гостей');
  }
  capacity.reportValidity();
});
