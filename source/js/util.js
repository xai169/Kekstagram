const getRandomNumber = (min, max) => {
  if (min >= max || min < 0 || max < 0) {
    return 'Ошибка! Введите корректное значения!';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const compareStringLength = (string, maxStringLength) => {
  return string.length < maxStringLength;
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const shuffleArray = (array) => {
  for(let j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return array;
}

const getUniqueRandomElements = (elements, quantityOfElements) => {
  if (quantityOfElements > elements.length) {
    return alert('Количество элементов должно быть меньше длины исходного массива');
  } else {
    const testArr = [];
    const resultArr = [];
    const slicedNumbers = elements.slice();
    const uniqueCheck = (array, element) => array.every((number) => element !== number);

    while (resultArr.length < quantityOfElements) {
      const randomElement = getRandomArrayElement(slicedNumbers);
      if (uniqueCheck(testArr, randomElement)) {
        resultArr.push(randomElement)
      }
      testArr.push(randomElement);
    }
    return resultArr;
  }
};

export { getRandomNumber, compareStringLength, getRandomArrayElement, isEnterEvent, isEscEvent, shuffleArray, getUniqueRandomElements };
