class HttpClient {
  constructor(baseUrl = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);
    return response.json();
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
