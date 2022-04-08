import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseUrl = 'http://localhost:3002') {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);

    let body = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }

  async post(url, body) {
    const response = await fetch(url, {
      body,
      method: 'POST',
    });
    return response.json();
  }
}

export default HttpClient;
