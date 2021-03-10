/* global L:readonly */

import {fragment} from './create-card.js';

let formFilters = document.querySelector('.map__filters');
let formMapFilters = formFilters.querySelectorAll('.map__filter');
let formMapFeatures = formFilters.querySelector('.map__features');
let formAd = document.querySelector('.ad-form');
let formAdHeader = formAd.querySelector('.ad-form-header');
let formAdElement = formAd.querySelectorAll('.ad-form__element');
let adress = formAd.querySelector('#address');

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
  iconSize: [50, 50],
  iconAnchor: [25, 50],
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

const iconMarker = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
})

const createMarkers = (arrayData) => {
  for (let i = 0; i < arrayData.length; i++) {
    const marker = L.marker(
      {
        lat: arrayData[i].location.lat,
        lng: arrayData[i].location.lng,
      },
      {
        icon: iconMarker,
      },
    );
    marker.addTo(map).bindPopup(fragment.children[i]);
  }
}

adress.readOnly = true;
adress.value = `${mainMarker._latlng.lat} , ${mainMarker._latlng.lng}`;

mainMarker.on('moveend', (evt) => {
  let currentCoordinates = (evt.target.getLatLng());
  adress.value = `${currentCoordinates.lat.toFixed(5)} , ${currentCoordinates.lng.toFixed(5)}`;
})

export {createMarkers, mainMarker, formFilters, formMapFilters, formMapFeatures, formAd, formAdHeader, formAdElement, adress};
