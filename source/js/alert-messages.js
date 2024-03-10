import { isEscEvent } from './util.js';

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const body = document.querySelector('body');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

//Ошибка рендера изображений
const renderError = () => {
  const newError = errorTemplate.cloneNode(true);
  newError.querySelector('.error__title').textContent = 'Ошибка загрузки данных';
  newError.querySelector('.error__button').textContent = 'Перезагрузить страницу'
  body.appendChild(newError);
  newError.querySelector('.error__button').addEventListener('click', () => {
    window.location.reload();
  })
}

//Ошибка отправки формы
const formError = () => {
  const newError = errorTemplate.cloneNode(true);
  body.appendChild(newError);

  newError.querySelector('.error__button').addEventListener('click', () => {
    newError.classList.add('hidden');
  })
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      newError.classList.add('hidden');
      document.removeEventListener('keydown', isEscEvent);
    }
  });

  document.addEventListener('click', (e) => {
    if (newError === e.target) {
      newError.classList.add('hidden');
    }
  });

  return newError;
}

const formSuccess = () => {
  const newSuccess = successTemplate.cloneNode(true);
  body.appendChild(newSuccess);

  newSuccess.querySelector('.success__button').addEventListener('click', () => {
    newSuccess.classList.add('hidden');
  })
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      newSuccess.classList.add('hidden');
      document.removeEventListener('keydown', isEscEvent);
    }
  });

  document.addEventListener('click', (e) => {
    if (newSuccess === e.target) {
      newSuccess.classList.add('hidden');
    }
  });

  return newSuccess;
}

export { renderError, formError, formSuccess }
