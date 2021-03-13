const formFilters = document.querySelector('.map__filters');
const formMapFeatures = formFilters.querySelector('.map__features');
const housingType = formFilters.querySelector('#housing-type');
// const housingPrice = formFilters.document.querySelector('#housing-price');
const housingRooms = formFilters.querySelector('#housing-rooms');
const housingGuests = formFilters.querySelector('#housing-guests');

const getFilters = (data) => {
  const type = housingType.value === 'any' || housingType.value === data.offer.type;
  const rooms = housingRooms.value === 'any' || housingRooms.value === data.offer.rooms;
  const guests = housingGuests.value === 'any' || housingGuests.value === data.offer.guests;
  return type && rooms && guests;
}

const setFilterChange = (cb) => {
  formFilters.addEventListener('change', () => {
    cb();
  })
}

export {setFilterChange, getFilters, formFilters, formMapFeatures}


