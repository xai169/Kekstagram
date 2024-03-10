// import { photos } from './data.js';
import { fullSizing } from './full-sizing.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = (picture) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;

  newPicture.addEventListener('click', function (evt) {
    evt.preventDefault();
    fullSizing(picture);
  });

  return newPicture;
};

const renderPictures = (photos) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());

  const PicturesListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    PicturesListFragment.appendChild(createPicture(photo));
  });

  picturesList.appendChild(PicturesListFragment);
};

export { renderPictures };
