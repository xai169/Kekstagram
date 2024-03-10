import { getUniqueRandomElements } from './util.js';
import { renderPictures } from './render.js';
import _ from 'lodash';

const filterContainer = document.querySelector('.img-filters');
const defaultFilter = filterContainer.querySelector('#filter-default');
const randomFilter = filterContainer.querySelector('#filter-random');
const discussedFilter = filterContainer.querySelector('#filter-discussed');

//
const setFilters = (photos) => {
  filterContainer.classList.remove('img-filters--inactive');
  renderPictures(photos);

  const setRandomFilter = () => {
    const pictures = photos.slice();
    renderPictures(getUniqueRandomElements(pictures, 10));
    defaultFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.add('img-filters__button--active');
  };

  randomFilter.addEventListener('click', _.debounce(setRandomFilter, 500));

  const setDefaultFilter = () => {
    const pictures = photos.slice();
    renderPictures(pictures);
    randomFilter.classList.remove('img-filters__button--active');
    defaultFilter.classList.add('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
  };

  defaultFilter.addEventListener('click', _.debounce(setDefaultFilter, 500));

  const setDiscussedFilter = () => {
    const pictures = photos.slice();
    const comparePictures = (pictureA, pictureB) => {
      const lengthA = pictureA.comments.length;
      const lengthB = pictureB.comments.length;
      return lengthB - lengthA;
    };
    renderPictures(pictures.sort(comparePictures));

    randomFilter.classList.remove('img-filters__button--active');
    defaultFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.add('img-filters__button--active');
  };

  discussedFilter.addEventListener('click',  _.debounce(setDiscussedFilter, 500));
};

export { setFilters };
