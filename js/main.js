import './data.js';
import './create-card.js';
import './form.js';
import './map.js';
import './server.js';
import {getData} from './server.js';
import {createCard} from './create-card.js';
import {createMarkers} from './map.js';

getData(createCard);
getData(createMarkers);
