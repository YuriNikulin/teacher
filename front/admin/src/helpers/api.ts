const base = process.env.ENV === 'development' ? '/api/v1/' : '/teacher/api/v1/';

export interface IRequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: { [key: string]: string | string[] };
  body?: { [key: string]: any };
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
  public static makeRequest = async <T>({
    url,
    method = 'GET',
    params,
    body,
    useBase = true,
  }: IRequestConfig): Promise<IResponse<T>> => {
    const options = { method, body: body && JSON.stringify(body) };
    const _url = useBase ? `${base}${url}` : url;
    let res: IResponse<T> | Response;
    try {
      res = await fetch(_url, options);
      res = await res.json();
    } catch (e) {
      console.warn(e);
      res = {
        success: false,
        data: e,
      };
    }

    return res as IResponse<T>;
  };
}

export default Api;
