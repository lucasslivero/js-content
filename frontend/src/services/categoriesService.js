import HttpClient from './client/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient();
  }

  async listCategories() {
    return this.httpClient.get('/categories');
  }
}

export default new CategoriesService();
