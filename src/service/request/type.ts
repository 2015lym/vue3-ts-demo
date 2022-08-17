import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface YMRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface YMRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YMRequestInterceptor<T>
  showLoading?: boolean
}
