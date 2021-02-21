import {MIN_ARRAY_PRICES} from './data.js';

let timeIn = document.querySelector('#timein');
let timeOut = document.querySelector('#timeout');
let typeApartment = document.querySelector('#type');
let price = document.querySelector('#price');

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







