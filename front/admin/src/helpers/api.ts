
const base = process.env.ENV === 'development' ? '/api/v1/' : '/teacher/api/v1/';

export interface IRequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT';
  params?: { [key: string]: string | string[] };
  body?: { [key:string]: any };
  useBase?: boolean;
}

export interface IResponse<T> {
  success: boolean;
  data: T | string;
}

export interface IApiClient {
  makeRequest: (config: IRequestConfig) => Promise<any>;
}

class Api {
  public static makeRequest = async ({
    url,
    method = 'GET',
    params,
    body,
    useBase = true,
    onError
  }: any) => {
    const options = { method, body: body && JSON.stringify(body) };
    let _url = useBase ? `${base}${url}` : url;
    let res: IResponse<any> | Response;
    try {
      res = await fetch(_url, options);
      res = await res.json();
    } catch(e) {
      console.warn(e);
      res = {
        success: false,
        data: e
      }
    }

    return res;
  }
}

export default Api;