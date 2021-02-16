import {getRandomInteger, getRandomDigit, getRandomLengthArray, getRandomArrayElement} from './utils.js';

const APARTMENTS = ['palace', 'flat', 'house', 'bungalow'];
const MIN_ARRAY_PRICES = [0, 1000, 5000, 10000];
const NUMBER_ROOMES = [1, 2, 3, 100];
const NUMBER_GUESTS = [1, 2, 3];

let minPrice;

const getMinPrice = () => {
  if (getRandomArrayElement(APARTMENTS[0])) {
    minPrice = MIN_ARRAY_PRICES[0];
  }
  if (getRandomArrayElement(APARTMENTS[1])) {
    minPrice = MIN_ARRAY_PRICES[1];
  }
  if (getRandomArrayElement(APARTMENTS[2])) {
    minPrice = MIN_ARRAY_PRICES[2];
  }
  if (getRandomArrayElement(APARTMENTS[3])) {
    minPrice = MIN_ARRAY_PRICES[3];
  }
  return minPrice;
}

minPrice = getMinPrice();

let timeRemoval = String(getRandomInteger(11, 13)) + ':00';
let apartmentFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
let photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const createAd = () => {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png',
    },
    offer: {
      title: 'Заголовок предложения',
      address: String(getRandomDigit((3565/100), (3570/100), 5)) + ' ' + String(getRandomDigit((1397/10), (1398/10), 5)),
      price: getRandomInteger(minPrice, 1000000),
      type: getRandomArrayElement(APARTMENTS),
      roomes: getRandomArrayElement(NUMBER_ROOMES),
      guests: getRandomArrayElement(NUMBER_GUESTS),
      checkin: timeRemoval,
      checkout: timeRemoval,
      features: getRandomLengthArray(apartmentFeatures),
      description: 'Описание помещения',
      photos: getRandomLengthArray(photosArray),
    },
    location: {
      x: getRandomDigit((3565/100), (3570/100), 5),
      y: getRandomDigit((1397/10), (1398/10), 5),
    },
  }
}

const createAdList = new Array(10).fill(null).map(() => createAd());

export {createAdList};
export {APARTMENTS};
