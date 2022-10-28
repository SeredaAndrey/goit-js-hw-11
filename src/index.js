import refs from './js/refs.js';
import RestGalleryService from './js/fetchgallary';
import SimpleLightbox from 'simplelightbox';

import Notiflix from 'notiflix';

import photoCard from './templates/photocard.hbs';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const restGalleryService = new RestGalleryService();

// слушатель событий на ввод в поле поиска
refs.searchForm.addEventListener(
  'input',
  debounce(event => {
    // console.log(event.target.value);
  }, DEBOUNCE_DELAY)
);

// слушатель событи на клик по кнопке поиска
refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  requestLengthCheck(event.target[0].value);
  clearDoom();
});
refs.more.addEventListener('click', () => {
  restGalleryService.fetchArticles().then(insertMarkup);
});

function inputRequest(request) {
  restGalleryService.query = request;
  restGalleryService.fetchArticles().then(insertMarkup);
}

function insertMarkup(articles) {
  if (articles.status === 404 || articles.message === 'Page Not Found') {
    failureMesage('Page Not Found');
    return;
  } else {
    // insertMarkup(photoCard(articles));
    refs.gallery.insertAdjacentHTML('beforeend', photoCard(articles));
  }
}

// функция проверки длины запроса, если поле пустое то не сабмитить
function requestLengthCheck(value) {
  // console.log(value);
  if (normalizeText(value).length === 0) {
    infoMesage('The input field is empty, enter a search query!');
    console.log('The input field is empty, enter a search query!');
    return;
  }
  inputRequest(normalizeText(value));
}

// функция нормализации текста, обрезание лишних пробелов в начале и в конце запроса
function normalizeText(text) {
  return text.trim();
}

function clearDoom() {
  refs.gallery.innerHTML = '';
}

// вывод информационного сообщения
function infoMesage(message) {
  Notiflix.Notify.info(message);
}
// вывод сообщения об ошибке
function failureMesage(message) {
  Notiflix.Notify.failure(message);
}
// Вывод сообщеня об удачной операции
function succesMessage(message) {
  Notiflix.Notify.success(message);
}
