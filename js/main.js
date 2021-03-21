/* global _:readonly */

import './form.js';
import './map.js';
import './server.js';
import './filter.js';
import {getData} from './server.js';
import {createMarkers} from './map.js';
import {setFilterChange} from './filter.js';

const DELAY = 500;

getData((dataArray) => {
  createMarkers(dataArray);
  setFilterChange(_.debounce(
    () => createMarkers(dataArray),
    DELAY,
  ));
});
