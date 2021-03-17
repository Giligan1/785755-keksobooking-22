import './data.js';
import './create-card.js';
import './form.js';
import './map.js';
import './server.js';
import './filter.js';
import {getData} from './server.js';
import {createMarkers} from './map.js';
import {setFilterChange} from './filter.js';

getData((dataArray) => {
  createMarkers(dataArray);
  setFilterChange(() => {
    createMarkers(dataArray);
  })
});

