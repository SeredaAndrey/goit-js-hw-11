const BASE_URL = 'https://pixabay.com/api';

const parameter = {
  key: '30850586-c34f803e4eb5b9dfd0cd416b1',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
};

export default class RestGalleryService {
  constructor() {
    this.searchQuery = '';
  }
  fetchArticles() {
    const url = `${BASE_URL}/?key=${parameter.key}&q=${this.searchQuery}&image_type=${parameter.image_type}`;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
