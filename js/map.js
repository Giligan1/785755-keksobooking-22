/* global L:readonly */

import {formFilters, formMapFeatures, arrayAdvertisement} from './filter.js';

const formMapFilters = formFilters.querySelectorAll('.map__filter');
const formAd = document.querySelector('.ad-form');
const formAdHeader = formAd.querySelector('.ad-form-header');
const formAdElement = formAd.querySelectorAll('.ad-form__element');
const adress = formAd.querySelector('#address');
const NUMBER_OF_APARTMENTS = 10;
const APARTMENTS = ['palace', 'flat', 'house', 'bungalow'];

const map = L.map('map-canvas')
  .on('load', () => {
    formFilters.classList.remove('map__filters--disabled');
    formMapFilters.forEach(filter => {
      filter.removeAttribute('disabled');
    });
    formMapFeatures.removeAttribute('disabled');
    formAd.classList.remove('ad-form--disabled');
    formAdHeader.removeAttribute('disabled');
    formAdElement.forEach(adElement => {
      adElement.removeAttribute('disabled');
    });
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIconMarker = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [45, 45],
  iconAnchor: [22.5, 50],
})

let mainMarker = L.marker(
  {
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainIconMarker,
  },
);

mainMarker.addTo(map);

const adLayer = L.layerGroup().addTo(map);

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

const createMarkers = (arrayData) => {
  adLayer.clearLayers();
  const filteredArray = arrayAdvertisement(arrayData).slice(0, NUMBER_OF_APARTMENTS);

  for (let i = 0; i < filteredArray.length; i++) {

    const iconMarker = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    })

    const marker = L.marker(
      {
        lat: filteredArray[i].location.lat,
        lng: filteredArray[i].location.lng,
      },
      {
        icon: iconMarker,
      },
    );

    let typeApartments;

    switch (filteredArray[i].offer.type) {
      case APARTMENTS[0]:
        typeApartments = 'Дворец';
        break;
      case APARTMENTS[1]:
        typeApartments = 'Квартира';
        break;
      case APARTMENTS[2]:
        typeApartments = 'Дом';
        break;
      case APARTMENTS[3]:
        typeApartments = 'Бунгало';
        break;
    }

    const card = document.querySelector('#card').content;
    const cardClone = card.cloneNode(true);

    const avatar = cardClone.querySelector('.popup__avatar');
    avatar.src = filteredArray[i].author.avatar;

    const popupFeatures = document.createElement('ul');
    popupFeatures.classList.add('popup__features');
    getFeatureElements(filteredArray[i].offer.features, popupFeatures)

    const popupPhotos = document.createElement('div');
    popupPhotos.classList.add('popup__photos');

    const popupPhoto = cardClone.querySelector('.popup__photo');
    getImageElements(filteredArray[i].offer.photos, popupPhoto, popupPhotos)

    marker.addTo(adLayer).bindPopup(`
      <article class="popup">
        <img src="${filteredArray[i].author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
        <h3 class ="popup__title">${filteredArray[i].offer.title}</h3>
        <p class ="popup__text--adress">${filteredArray[i].offer.address}</p>
        <p class ="popup__text--price">${filteredArray[i].offer.price}</p>
        <h4 class ="popup__type">${typeApartments}</h4>
        <p class ="popup__text--capacity">${filteredArray[i].offer.rooms} комнаты для ${filteredArray[i].offer.guests} гостей</p>
        <p class ="popup__text-time">Заезд после ${filteredArray[i].offer.checkin} выезд до ${filteredArray[i].offer.checkout}</p>
        ${popupFeatures.outerHTML}
        <p class ="popup__description">${filteredArray[i].offer.description}</p>
        ${popupPhotos.outerHTML}
      </article>`)
  }
}

adress.readOnly = true;
adress.value = `${mainMarker._latlng.lat} , ${mainMarker._latlng.lng}`;

mainMarker.on('moveend', (evt) => {
  let currentCoordinates = (evt.target.getLatLng());
  adress.value = `${currentCoordinates.lat.toFixed(5)} , ${currentCoordinates.lng.toFixed(5)}`;
})

export {createMarkers, mainMarker, formMapFilters, formMapFeatures, formAd, formAdHeader, formAdElement, adress, adLayer};
