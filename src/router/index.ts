import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import api from '@/network'
import { globalstore } from '@/stores'
import { $Logout } from '@/globalfunction'

var store: any = null

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

//換頁前判斷登入權限
router.beforeEach((to, from, next) => {
  if (store === null) {
    store = globalstore()
  }

  const checkLogin = () => {
    return new Promise((resolve, reject) => {
      let token = store.token
      if (to.path === '/Login') {
        if (token) {
          resolve(token)
        } else {
          resolve(null)
        }
        return
      }
      if (token) {
        checktoken(token).then((res) => {
          if (res) {
            //驗證token成功進入跳轉路由
            resolve(res)
          } else {
            //如果驗證token失敗就重新登入
            $Logout()
            reject()
          }
        })
      } else {
        //如果store中userinfo不存在，就驗證localStorage中的UserInfo是否存在
        token = localStorage.getItem('Token')
        if (token) {
          checktoken(token).then(async (res) => {
            if (res) {
              resolve(res)
            } else {
              $Logout()
              reject()
            }
          })
        } else {
          $Logout()
          reject()
        }
      }
    })
  }

  const checktoken = async (token) => {
    var result = false

    await api('user/verifytoken', 'POST', { token: token })
      .then((userinfo: any) => {
        if (userinfo) {
          if (!store.userinfo || !store.userinfo.ID) {
            store.updatetoken(token)
            store.updateuserinfo(userinfo.data)
          }
          result = true
        }
      })
      .catch((err: any) => {
        // 请求失败处理
        console.log(err)
        console.log('token verify err, logout.')
      })
    return result
  }

  const checkrouter = (userinfo) => {
    var requireAuth = to.matched.some((record) => record.meta.requireAuth)

    if (requireAuth) {
      if (userinfo && userinfo.Sort > to.meta.rolelevel) {
        //如果權限等級不夠就跳轉回首頁
        alert(`You don't have permission to access ${to.name.toString()} page`)
        let redirectpath = from.path

        next({
          path: redirectpath,
          query: to.query,
        })
        return
      } else {
        // 登入後頁面跳轉
        next()
      }
    } else if (to.path == '/Login' && userinfo) {
      //已經登入但又輸入Login時，跳轉到Default Page (HomePage)
      next({
        path: '/Home',
      })
    } else {
      next()
    }
  }

  checkLogin()
    .then((res) => {
      checkrouter(res)
    })
    .catch(() => {
      return
    })

  // next();return;

  // 初始化store放在这里
  // if (store === null) {
  //   store = globalstore();
  // }

  // let userinfo: IUserInfo = <IUserInfo>store.userinfo;

  // if (!userinfo || !userinfo.Token) {

  //   let localstorage = $GetLocalStorage('UserInfo');
  //   if (localstorage) {
  //     userinfo = <IUserInfo>localstorage;
  //   }

  // }

  // const { role, requireAuth } = to.meta
  // let isLogin = userinfo && userinfo.Token && userinfo.Token !== '';

  // if (to.name !== 'Login' && !isLogin) {

  //   $Logout();
  //   return;
  // }
  // else if (to.name === 'Login' && isLogin) {
  //   next('/');
  //   return;
  // }
  // else if (requireAuth && userinfo.Role > Number(role)) {
  //   alert('You don\'t have permission to access this page');
  //   next('/');
  // }
  // else {
  //   console.log(4)
  //   next();
  // }
})

export default router
