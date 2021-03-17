/* global L:readonly */

import {fragment, createCard} from './create-card.js';
import {formFilters, formMapFeatures, arrayAdvertisement} from './filter.js';

const formMapFilters = formFilters.querySelectorAll('.map__filter');
const formAd = document.querySelector('.ad-form');
const formAdHeader = formAd.querySelector('.ad-form-header');
const formAdElement = formAd.querySelectorAll('.ad-form__element');
const adress = formAd.querySelector('#address');
const NUMBER_OF_APARTMENTS = 10;

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

const createMarkers = (arrayData) => {
  adLayer.clearLayers();
  const filteredArray = arrayAdvertisement(arrayData).slice(0, NUMBER_OF_APARTMENTS);

  for (let i = 0; i < filteredArray.length; i++) {

    createCard(filteredArray);

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
    marker.addTo(adLayer).bindPopup(fragment.children[i]);
  }
}

// const removeMarkers = (markers) => {
//   markers.forEach((marker) => map.remove(marker));
//   markers = [];
// };

adress.readOnly = true;
adress.value = `${mainMarker._latlng.lat} , ${mainMarker._latlng.lng}`;

mainMarker.on('moveend', (evt) => {
  let currentCoordinates = (evt.target.getLatLng());
  adress.value = `${currentCoordinates.lat.toFixed(5)} , ${currentCoordinates.lng.toFixed(5)}`;
})

export {createMarkers, mainMarker, formMapFilters, formMapFeatures, formAd, formAdHeader, formAdElement, adress, adLayer};
