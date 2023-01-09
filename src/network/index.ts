import axios from 'axios'
import { $Config } from '@/globalfunction'
import { IAppConfig } from '@/interface'
import { globalstore } from '@/stores'

declare global {
  interface Window {
    apisetting?: any
  }
}

//全域性配置
// axios.defaults.baseURL = "http://127.0.0.1:3000/api";
// axios.defaults.timeout = 5000;

//攔截器
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// axios.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 404:
//           console.log('status code:404, page not found')
//           // go to 404 page
//           break
//         case 500:
//           console.log('status code:500, system exception')
//           // go to 500 page
//           break
//         default:
//           console.log(error.message)
//       }
//     }
//     if (!window.navigator.onLine) {
//       alert('網路出了點問題，請重新連線後重整網頁')
//       return
//     }
//     return Promise.reject(error)
//   }
// )

// 此處的instance為我們create的實體
export default async function (path: string, method: string, data: any) {
  let appconfig = {} as any
  await $Config().then((res) => {
    appconfig = res
  })
  let url: string = appconfig.BaseUrl + '/api/' + path

  let timeout: number = Number(
    <IAppConfig | unknown>appconfig.APITimeout ?? 15000
  )

  const store = globalstore()

  const token: string = store.token ?? ''
  var config = {
    url: url,
    method: method.toUpperCase(),
    timeout: timeout,
    headers: {
      token: token,
    },
    data: data,
  }
  return new Promise((resolve, reject) => {
    let promise = new Promise(() => {})
    promise = axios(config)

    //處理返回
    promise
      .then((res: any) => {
        if (res) {
          resolve(res.data)
          return
        } else {
          reject(res?.data ?? 'System Exception')
        }
      })
      .catch((err: any) => {
        reject(err?.response?.data?.message)
      })
  })
}
