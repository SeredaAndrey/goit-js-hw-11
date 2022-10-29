import refs from './js/refs.js';
import RestGalleryService from './js/fetchgallary';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import photoCard from './templates/photocard.hbs';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const restGalleryService = new RestGalleryService();

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true, //true	bool	show captions if availabled or not
  captionSelector: 'img', //'img'	string or function	set the element where the caption is. Set it to "self" for the A-Tag itself or use a callback which returns the element
  captionType: 'attr', //'attr'	string	how to get the caption. You can choose between attr, data or text
  captionsData: 'alt', //title	string	get the caption from given attribute
  captionPosition: 'bottom', //'bottom'	string	the position of the caption. Options are top, bottom or outside (note that outside can be outside the visible viewport!)
  captionDelay: 250, //int	adds a delay before the caption shows (in ms)
});

// слушатель событий на ввод в поле поиска
refs.searchForm.addEventListener(
  'input',
  debounce(event => {}, DEBOUNCE_DELAY)
);

// слушатель событи на клик по кнопке поиска
refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  restGalleryService.clearPageNumber();
  requestLengthCheck(event.target[0].value);
  clearDoom();
});

// слушатель событий на кнопку "еще картинок"
refs.more.addEventListener('click', () => {
  restGalleryService.fetchArticles().then(insertMarkup);
});

function inputRequest(request) {
  restGalleryService.query = request;
  restGalleryService.fetchArticles().then(insertMarkup);
}

// функция проверки ответа на наличие ошибки 404 'Page Not Found'
function insertMarkup(articles) {
  if (articles.status === 404 || articles.message === 'Page Not Found') {
    failureMesage('Page Not Found');
    return;
  } else {
    succesMessage(`Hooray! We found ${articles.data.totalHits} images.`);
    refs.gallery.insertAdjacentHTML('beforeend', photoCard(articles));
  }
}

// функция проверки длины запроса, если поле пустое то не сабмитить
function requestLengthCheck(value) {
  if (normalizeText(value).length === 0) {
    failureMesage('The input field is empty, enter a search query!');
    console.log('The input field is empty, enter a search query!');
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
