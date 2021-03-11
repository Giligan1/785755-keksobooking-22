import {  APARTMENTS } from './data.js';
import { getDeleteChild } from './utils.js'

const card = document.querySelector('#card').content;
const fragment = document.createDocumentFragment();

const getFeatureElements = (currentArray, featureFragment) => {
  currentArray.forEach(featureTitle => {
    let newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    newFeature.classList.add('popup__feature--' + featureTitle);
    featureFragment.appendChild(newFeature);
  });
};

const getImageElements = (imageArray, photo, imageFragment) => {
  imageArray.forEach(image => {
    let imageClone = photo.cloneNode();
    imageClone.src = image;
    imageFragment.appendChild(imageClone);
  });
};
const createCard = (arrayData) => {
  for (let i = 0; i < arrayData.length; i++) {
    const cardClone = card.cloneNode(true);
    let offerTitle = cardClone.querySelector('.popup__title');
    let offerAdress = cardClone.querySelector('.popup__text--address');
    let offerPrice = cardClone.querySelector('.popup__text--price');
    let offerType = cardClone.querySelector('.popup__type');
    let offerCapacity = cardClone.querySelector('.popup__text--capacity');
    let offerTextTime = cardClone.querySelector('.popup__text--time');
    let offerFeatures = cardClone.querySelector('.popup__features');
    let offerDescription = cardClone.querySelector('.popup__description');
    let offerPhotos = cardClone.querySelector('.popup__photos');
    let offerPhoto = cardClone.querySelector('.popup__photo');
    let authorAvatar = cardClone.querySelector('.popup__avatar');
    offerTitle.textContent = arrayData[i].offer.title;
    offerAdress.textContent = arrayData[i].offer.address;
    offerPrice.textContent = ` ${arrayData[i].offer.price} ₽/ночь`;
    offerCapacity.textContent = `${arrayData[i].offer.rooms} комнаты для ${arrayData[i].offer.guests} гостей`;
    offerTextTime.textContent = `Заезд после ${arrayData[i].offer.checkin} выезд до ${arrayData[i].offer.checkout}`;
    getDeleteChild(offerFeatures);
    getDeleteChild(offerPhotos);
    getFeatureElements(arrayData[i].offer.features, offerFeatures);
    getImageElements(arrayData[i].offer.photos, offerPhoto, offerPhotos);
    offerDescription.textContent = arrayData[i].offer.description;
    authorAvatar.src = arrayData[i].author.avatar;

    // APARTMENTS[] - элемент массива с названиями апартаментов, находится в модуле ./data.js
    // offerType - переменная, в которую записан html-элемент с классом .popup__type
    switch (arrayData[i].offer.type) {
      case APARTMENTS[0]:
        offerType.textContent = 'Квартира';
        break;
      case APARTMENTS[1]:
        offerType.textContent = 'Бунгало';
        break;
      case APARTMENTS[2]:
        offerType.textContent = 'Дом';
        break;
      case APARTMENTS[3]:
        offerType.textContent = 'Дворец';
        break;
    }
    fragment.appendChild(cardClone);
  }
  return fragment;
}

export {fragment, createCard};
