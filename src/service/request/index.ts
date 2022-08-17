import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { YMRequestInterceptor, YMRequestConfig } from './type'
import { ElLoading } from 'element-plus'
// el-loading 是插件，不是组件 https://icode.best/i/27773644543750
// 所以它不能直接按需加载
import 'element-plus/theme-chalk/el-loading.css'
import { nextTick } from 'vue'

const DEFAULT_LOADING = false

class YMRequest {
  instance: AxiosInstance
  interceptors?: YMRequestInterceptor
  showLoading: boolean

  constructor(config: YMRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 双问号代表是否为空
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 放下面先执行
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器：请求拦截成功')
        if (this.showLoading) {
          console.log(this.showLoading)
          const loadingInstance = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
          nextTick(() => {
            // Loading should be closed asynchronously
            setTimeout(() => {
              loadingInstance.close()
            }, 2000)
          })
        }

        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求拦截失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器：返回拦截成功')
        // 直接.data
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有的实例都有的拦截器：返回拦截成功')
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  request<T>(config: YMRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // if (config.showLoading === false) {
      this.showLoading = config.showLoading ?? DEFAULT_LOADING
      // }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          console.log(res)
          // 重置loading
          this.showLoading = DEFAULT_LOADING
          // 结果返回
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  get<T>(config: YMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: YMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: YMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: YMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default YMRequest
