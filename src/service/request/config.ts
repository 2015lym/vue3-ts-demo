// 根据process.env.NODE_ENV dev、pro、test
let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://123.207.32.32:8000/'
} else {
  BASE_URL = 'http://123.207.32.32:8000/'
}

// 如果单独 export 必须在上面定义的时候就 export
export { BASE_URL, TIME_OUT }

// 还有一种方式是建立.env文件
// 区分环境的话要分别建立 .env.development .env.production .env.test
// 可以参考开发文档 模式和环境变量
