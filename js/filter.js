const formFilters = document.querySelector('.map__filters');
const formMapFeatures = formFilters.querySelector('.map__features');
const housingType = formFilters.querySelector('#housing-type');
const housingPrice = formFilters.querySelector('#housing-price');
const housingRooms = formFilters.querySelector('#housing-rooms');
const housingGuests = formFilters.querySelector('#housing-guests');
const housingFeatures = formFilters.querySelector('#housing-features');

const FILTER_PRICES = {
  'low': 10000,
  'high': 50000,
}

const getFilterPrice = (data) => {
  switch (housingPrice.value) {
    case 'low':
      return data.offer.price < FILTER_PRICES['low'];
    case 'middle':
      return (data.offer.price >= FILTER_PRICES['low']) && (data.offer.price <= FILTER_PRICES['high']);
    case 'high':
      return data.offer.price > FILTER_PRICES['high'];
    default:
      return FILTER_PRICES;
  }
};

const getFeaturesFilter = (data) => {
  const isFeaturesChecked = housingFeatures.querySelectorAll('input:checked');

  return Array.from(isFeaturesChecked).every((input) => {
    return data.offer.features.includes(input.value);
  });
};

const getFilters = (data) => {
  const type = housingType.value === 'any' || housingType.value === data.offer.type;
  const price = getFilterPrice(data);
  const rooms = housingRooms.value === 'any' || Math.floor(housingRooms.value) === data.offer.rooms;
  const guests = housingGuests.value === 'any' || Math.floor(housingGuests.value) === data.offer.guests;
  const features = getFeaturesFilter(data);
  return type && price && rooms && guests && features;
}

const arrayAdvertisement = (data) => {
  return data.slice().filter(getFilters);
}

const setFilterChange = (cb) => {
  formFilters.addEventListener('change', () => {
    cb();
  })
}

export {setFilterChange, getFilters, formFilters, formMapFeatures, arrayAdvertisement}


