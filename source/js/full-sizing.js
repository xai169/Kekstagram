import { isEscEvent } from './util.js';
import { renderComments, getComments } from './comments-render.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const body = document.querySelector('body');


// Функции закрытия
const onBigPictureClose = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  bigPictureCloseElement.removeEventListener ('click', onBigPictureClose);
  document.removeEventListener ('keydown', onBigPictureClose);
  commentsList.innerHTML = '';
};

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onBigPictureClose();
  }
};

//Отрисовка полноразмерного изображения
const fullSizing = (picture) => {
  body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img > img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPictureCloseElement.addEventListener('click', onBigPictureClose);
  document.addEventListener('keydown', onEscKeydown);
  renderComments(picture);
  getComments(picture);
  bigPicture.classList.remove('hidden');
};

export { fullSizing };
