export class ApiConnection {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  get() {
    return fetch(`${this.url}`);
  }

  post(data: any) {
    return fetch(`${this.url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
