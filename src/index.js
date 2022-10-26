import refs from './js/refs.js';
import RestGalleryService from './js/fetchgallary';

import Notiflix from 'notiflix';

import photoCard from './templates/photocard.hbs';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const restGalleryService = new RestGalleryService();

refs.searchForm.addEventListener(
  'input',
  debounce(event => {
    console.log(event.target.value);
  }, DEBOUNCE_DELAY)
);
refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
});

function requestLengthCheck(event) {
  if (normalizeText(event.target.value).length === 0) {
    clearDoom();
    return;
  }
  //   inputValidation(event);
}
function normalizeText(text) {
  return text.trim();
}
