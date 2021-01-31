const getRandomInteger = (min, max) => {
  if (max < min) {
    return Math.round(Math.random() * (min - max) + max);
  }
  return Math.round(Math.random() * (max - min) + min);
}

getRandomInteger();

const getRandomDigit = (minDigit, maxDigit, decimalPlaces) => {
  let randomNumber;
  if (maxDigit < minDigit) {
    randomNumber = (Math.random() * (minDigit - maxDigit) + maxDigit);
  }
  randomNumber = (Math.random() * (maxDigit - minDigit) + minDigit);
  return randomNumber.toFixed(decimalPlaces);
}

getRandomDigit();
