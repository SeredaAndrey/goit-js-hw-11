const request = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
import key from './key';

// const parameter = {
// image_type: 'photo',
// orientation: 'horizontal',
// safesearch: 'true',
// page: null,
// per_page: 40,
// };

export default class RestGalleryService {
  constructor() {
    this.searchQuery = '';
    this.answer = '';
    this.page = 1;
  }
  async fetchArticles() {
    try {
      // parameter.page = this.page;
      // console.log(`${BASE_URL}?key=${key}&q=${this.searchQuery}`);
      const responce = await request.get(
        `${BASE_URL}?key=${key}&q=${this.searchQuery}&image_type="photo"&page=${this.page}&orientation="horizontal"&safesearch="true"&per_page=40`
      );
      console.log(responce);
      this.increasePage();
      return responce;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  increasePage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
    console.log('new querry - ', this.searchQuery);
  }
}
