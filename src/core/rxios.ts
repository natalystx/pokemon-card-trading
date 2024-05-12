/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Observable } from "rxjs";

export type RxiosConfig = AxiosRequestConfig;

type BasicObject = Record<string, unknown>;

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export abstract class Rxios {
  private httpClient: AxiosInstance;

  constructor(options: RxiosConfig = {}) {
    this.httpClient = axios.create({
      ...options,
      headers: {
        "X-Api-Key": import.meta.env.VITE_API_KEY as string,
      },
    });
  }

  interceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config;
  };

  private observableRequest<T>(config: RxiosConfig) {
    const request = this.httpClient.request<T>(this.interceptor(config));

    return new Observable<T>((subscriber) => {
      request
        .then((response) => {
          subscriber.next(response.data);
        })
        .catch((err: Error) => {
          subscriber.error(err);
        })
        .finally(() => {
          subscriber.complete();
        });
    });
  }

  public get<T>(
    url: string,
    params?: BasicObject,
    config?: AxiosRequestConfig
  ) {
    const newParams = Object.prototype.hasOwnProperty.call(params || {}, "lang")
      ? { ...params, lang: (params?.lang as any)?.toUpperCase?.() }
      : params;
    const request = {
      method: HttpMethod.GET,
      url,
      params: newParams,
      ...config,
    };
    return this.observableRequest<T>(request);
  }

  public post<T>(
    url: string,
    payload: BasicObject,
    query: BasicObject = {},
    config: AxiosRequestConfig = {}
  ) {
    const request = {
      method: HttpMethod.POST,
      url,
      params: query,
      data: payload,
      ...config,
    };
    return this.observableRequest<T>(request);
  }

  public put<T>(
    url: string,
    payload: BasicObject,
    query: BasicObject = {},
    config: AxiosRequestConfig = {}
  ) {
    const newPayload = Object.prototype.hasOwnProperty.call(
      payload || {},
      "lang"
    )
      ? { ...payload, lang: (payload?.lang as any)?.toUpperCase?.() }
      : payload;
    const request = {
      method: HttpMethod.PUT,
      url,
      params: query,
      data: newPayload,
      ...config,
    };
    return this.observableRequest<T>(request);
  }

  public patch<T>(
    url: string,
    payload: BasicObject,
    query: BasicObject = {},
    config: AxiosRequestConfig = {}
  ) {
    const newPayload = Object.prototype.hasOwnProperty.call(
      payload || {},
      "lang"
    )
      ? { ...payload, lang: (payload?.lang as any)?.toUpperCase?.() }
      : payload;
    const request = {
      method: HttpMethod.PATCH,
      url,
      params: query,
      data: newPayload,
      ...config,
    };
    return this.observableRequest<T>(request);
  }

  public delete<T>(url: string, config: AxiosRequestConfig = {}) {
    const request = {
      method: HttpMethod.DELETE,
      url,
      ...config,
    };
    return this.observableRequest<T>(request);
  }
}

export default Rxios;
