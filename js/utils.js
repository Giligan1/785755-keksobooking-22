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

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const isEscclick = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const isMouseclick = (evt) => {
  return evt.type === 'click';
};

export {getRandomInteger, getRandomDigit, getRandomArrayElement, getRandomLengthArray, getDeleteChild, showAlert, isEscclick, isMouseclick};
