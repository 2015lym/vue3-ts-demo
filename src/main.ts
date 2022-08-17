import { createApp } from 'vue'
import App from './App.vue'
import { globalRegisterApp } from './global'
import 'normalize.css'
import './assets/css/index.less'
// import './service/axios_demo'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import router from './router'
import store from './store'
import ymRequest from './service'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(globalRegisterApp)
app.use(router)
app.use(store)
// app.use(ElementPlus)

app.mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

ymRequest
  .get<DataType>({
    url: '/home/multidata',
    showLoading: true,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单独请求的config')
        return config
      },
      responseInterceptor: (res) => {
        console.log('单独响应的res')
        return res
      }
    }
  })
  .then((res) => {
    console.log('sadf' + res.returnCode)
  })
