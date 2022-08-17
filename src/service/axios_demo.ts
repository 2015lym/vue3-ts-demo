import axios from 'axios'

// 内部创建 axios 实例对象
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res)
})

// axios.get('http://httpbin.org/get', {
//   params: {
//     name: 'corderlym',
//     age: 18
//   }
// })

// axios.post('http://httpbin.org/post', {
//   data: {
//     name: 'corderlym',
//     age: 18
//   }
// })

// 额外补充 Promise 中类型的使用
// new Promise<string>((resolve) => {
//   resolve('abc')
// }).then((res) => {
//   console.log(res.length)
// })

axios.defaults.baseURL = 'http://httpbin.org/'
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

axios
  .get('get', {
    params: {
      name: 'corderlym',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .post('post', {
    data: {
      name: 'corderlym',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .all([
    axios.get('/get', { params: { name: 'corderlym', age: 18 } }),
    axios.post('post', { data: { name: 'corderlym', age: 18 } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })

// 拦截器 fn1成功 fn2失败
axios.interceptors.request.use(
  (config) => {
    // 1.添加 token 2.loading 动画
    console.log('请求成功')
    return config
  },
  (err) => {
    console.log('请求错误')
    return err
  }
)
axios.interceptors.response.use(
  (res) => {
    // 1.添加 token 2.loading 动画
    console.log('返回成功')
    // 也可以res.data
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
