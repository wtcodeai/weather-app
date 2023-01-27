export class BaseRequest {
  protected baseurl = '';

  constructor(baseurl: string) { 
    this.baseurl = baseurl;
  }

  static handleError = async (error: unknown): Promise<unknown> => {
    const Error = await error;

    return Promise.reject(Error);
  };


  fetch(url: string, config: Record<string, unknown>): Promise<Response> {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    };

    return fetch(this.baseurl + url, {
      headers,
      ...config
    }).then((response) => {
      if (!response.status || response.status < 200 || response.status >= 300) {
        throw response.json();
      }

      return response;
    });
  }
}
