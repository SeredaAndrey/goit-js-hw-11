import refs from './js/refs.js';
import RestGalleryService from './js/fetchgallary';
import ButtonMode from './js/buttonMode';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import photoCard from './templates/photocard.hbs';
import debounce from 'lodash.debounce';
import ButtonMode from './js/buttonMode.js';
import config from './js/simpleboxconfig.js';
import Message from './js/message.js';

const DEBOUNCE_DELAY = 300;

const buttonMode = new ButtonMode({ selector: '.load-more', hidden: true });

const restGalleryService = new RestGalleryService();

const message = new Message();

const watchGallery = new SimpleLightbox('.gallery a', config);
watchGallery.open();

// слушатель событий на ввод в поле поиска
refs.searchForm.addEventListener(
  'input',
  debounce(event => {}, DEBOUNCE_DELAY)
);

// слушатель событи на клик по кнопке поиска
refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  watchGallery.refresh();
  buttonMode.show();
  buttonMode.disable();
  restGalleryService.clearPageNumber();
  requestLengthCheck(event.target[0].value);
  clearDoom();
});

// слушатель событий на кнопку "еще картинок"
refs.more.addEventListener('click', () => {
  restGalleryService.fetchArticles().then(insertMarkup);
  buttonMode.disable();
});

// отключение дефолтного перехода по ссылкам при клике на картинки
refs.gallery.addEventListener('click', event => {
  event.preventDefault();
});

function inputRequest(request) {
  restGalleryService.query = request;
  restGalleryService.fetchArticles().then(insertMarkup);
}

// функция проверки ответа на наличие ошибки 404 'Page Not Found' и другие состояния реквеста
function insertMarkup(articles) {
  // проверка ответа на наличие ошибки 404 'Page Not Found'
  if (articles.status === 404 || articles.message === 'Page Not Found') {
    message.failure('Page Not Found');
    return;
  }
  // проверка ответа на результат поиска равный "0"
  if (articles.data.totalHits === 0) {
    message.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    buttonMode.hide();
    return;
  }
  const totalShowing = (restGalleryService.getPage() - 1) * 40;
  const showing =
    totalShowing >= articles.data.totalHits
      ? articles.data.totalHits
      : totalShowing;
  message.succes(
    `Hooray! We found ${articles.data.totalHits} images. Showing ${showing} of ${articles.data.totalHits}`
  );
  // проверка на окончание вывода результата поиска
  if (showing === articles.data.totalHits) {
    message.info("We're sorry, but you've reached the end of search results.");
    buttonMode.hide();
  }
  refs.gallery.insertAdjacentHTML('beforeend', photoCard(articles));

  watchGallery.refresh();
  buttonMode.enable();
}

// функция проверки длины запроса, если поле пустое то не сабмитить
function requestLengthCheck(value) {
  if (normalizeText(value).length === 0) {
    message.failure('The input field is empty, enter a search query!');
    buttonMode.hide();
    return;
  }
  inputRequest(normalizeText(value));
}

// функция нормализации текста, обрезание лишних пробелов в начале и в конце запроса
function normalizeText(text) {
  return text.trim();
}

// функция очистки экрана от разметки
function clearDoom() {
  refs.gallery.innerHTML = '';
  watchGallery.refresh();
}
