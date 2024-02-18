import HttpClient from './client/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient();
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async createContact(body) {
    return this.httpClient.post('/contacts', body);
  }
}

export default new ContactsService();
