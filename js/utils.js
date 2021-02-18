const getRandomInteger = (min, max) => {
  if (max < min) {
    return Math.round(Math.random() * (min - max) + max);
  }
  return Math.round(Math.random() * (max - min) + min);
}

const getRandomDigit = (minDigit, maxDigit, decimalPlaces) => {
  let randomNumber;
  if (maxDigit < minDigit) {
    randomNumber = (Math.random() * (minDigit - maxDigit) + maxDigit);
  }
  randomNumber = (Math.random() * (maxDigit - minDigit) + minDigit);
  return parseFloat(randomNumber.toFixed(decimalPlaces));
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
}

const getRandomLengthArray = (arrayTitle) => {
  arrayTitle.length = (getRandomInteger(1, arrayTitle.length));
  return arrayTitle.slice();
}

const getDeleteChild = (parentElement) => {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
};

export {getRandomInteger, getRandomDigit, getRandomArrayElement, getRandomLengthArray, getDeleteChild};
