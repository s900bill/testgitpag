import router from '@/router'
import { globalstore } from '@/stores'
import { IUserInfo } from '@/interface'

let store: any = null
let config: any = null

export async function $Config() {
  if (config !== null) {
    return config
  }

  let returndata
  if (process.env.NODE_ENV === 'production') {
    await fetch('config.json').then(async (json) => {
      await json.json().then((config) => {
        returndata = config
      })
    })
  } else {
    returndata = {
      BaseUrl: 'http://localhost:8888',
      // "BaseUrl": "http://172.16.25.87:85",
      APITimeout: 15000,
    }
  }
  config = returndata
  return returndata
}

export function $Logout() {
  if (store === null) {
    store = globalstore()
  }
  const nulluser = {} as IUserInfo
  store.updatetoken('')
  store.updateuserinfo(nulluser)
  localStorage.clear()
  sessionStorage.clear()
  router.push({
    name: 'Login',
  })
}

//記錄每個頁面的Setting
export function $PageSetting(
  page: string,
  functionname: string,
  value: string
) {
  var setting = {}
  var pagesetting_json = localStorage.getItem('PageData')
  if (pagesetting_json) {
    setting = pagesetting_json
  }
  setting[page + '_' + functionname] = value

  localStorage.setItem('PageData', JSON.stringify(setting))
}

//取得每個頁面的Setting
export function $Getpagesetting(page: string, functionname: string) {
  var pagesetting_json = localStorage.getItem('PageData')

  if (pagesetting_json) {
    var pageingsetting = pagesetting_json
    return pageingsetting[page + '_' + functionname]
  } else {
    return null
  }
}
export function $RandomString(len: Number): string {
  len = len || 23
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
  var maxPos = chars.length
  var str = ''
  for (var i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}

//將圖檔轉成Webp格式並壓縮
export function $CompressionImage(img: Blob, callback) {
  var newImage = new Image()
  newImage.src = URL.createObjectURL(img)
  newImage.setAttribute('crossOrigin', 'Anonymous') //url为外域时需要
  newImage.onload = function () {
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    canvas.width = newImage.width
    canvas.height = newImage.height
    ctx.drawImage(newImage, 0, 0)

    //轉檔
    canvas.toBlob((blob) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result as string))
      reader.readAsDataURL(blob)
    }, 'image/webp')
  }
}
