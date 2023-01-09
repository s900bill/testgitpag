import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import App from '@/App.vue'
import router from '@/router'
import 'ant-design-vue/dist/antd.less'
import 'bootstrap-icons/font/bootstrap-icons.css'
import infinitescroll from './util/infinitescroll'
import 'bootstrap'

import VueI18n from './language'

import '@fonticon/styles.css'

createApp(App)
  .use(createPinia()) // 启用 Pinia
  .use(router)
  .use(VueI18n)
  .use(Antd)
  .use(infinitescroll)
  .mount('#app')
