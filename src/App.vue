<template>
  <a-config-provider :locale="antdvlang">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { globalstore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import antdv_en_GB from 'ant-design-vue/lib/locale/en_GB'
import antdv_zh_TW from 'ant-design-vue/lib/locale/zh_TW'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import 'dayjs/locale/en'

const store = globalstore()
const routed = useRoute()

function savestore() {
  sessionStorage.setItem('store', JSON.stringify(store.$state))
}

onMounted(() => {
  //重新整理頁面前，將pinia的資料保存到sessionStorage裡
  window.addEventListener('beforeunload', savestore)

  //刷新頁面後檢查sessionStorage裡的資料並更新store
  if (sessionStorage.getItem('store')) {
    store.$state = JSON.parse(String(sessionStorage.getItem('store')))
    const { locale } = useI18n({ useScope: 'global' })
    locale.value = store.lang
  }
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', savestore)
})

const { lang } = storeToRefs(store)

const antdvlang = ref<any>(antdv_en_GB)

watch(
  lang,
  (val) => {
    switch (val) {
      case 'English':
        antdvlang.value = antdv_en_GB
        dayjs.locale('en')

        break
      case '中文':
        antdvlang.value = antdv_zh_TW
        dayjs.locale('zh-tw')
        break
    }
  },
  { immediate: true }
)

// message.config({
//   duration: 1,
//   maxCount: 1,
// });
</script>

<style lang="scss">
body {
  font-family: SourceSansPro-Regular, sans-serif, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $BG02 !important;
  text-align: center;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  position: relative;
  height: 100vh;
}

[v-cloak] {
  //頁面加載前將DOM中的{{}}隱藏
  display: none;
}

:root {
  --bs-body-line-height: 1rem !important;
}

// bootstrap
$primary: $primarycolor;
$secondary: $T01;
$danger: $R03;
$info: $B03;
$dark: $BG03;
$warning: $Y03;

$border-radius: 0.5rem;

// //spacer
$spacer: 1.25rem;
$spacers: (
  0: 0,
  1: $spacer * 0.5,
  //10
  2: $spacer * 0.8,
  //16
  3: $spacer,
  //20
  4: $spacer * 1.4,
  //28
  5: $spacer * 2,
  //40
  6: $spacer * 3,
  //60
  7: $spacer * 4,
  //80
);

//input
$input-border-radius: 0.25rem;
$input-focus-bg: $BG01;
$input-plaintext-color: $alarmcolor;
//font
$font-size-base: 1rem;
$font-family-base: SourceSansPro-Regular;
$font-weight-bold: 600;
$font-weight-bolder: 700;
$font-sizes: (
  1: $font-size-base * 2.5,
  //40px
  2: $font-size-base * 2,
  //32px
  3: $font-size-base * 1.75,
  //28px
  4: $font-size-base * 1.5,
  //24px
  5: $font-size-base * 1.25,
  //20px
  6: $font-size-base,
  //16px
  7: $font-size-base * 0.875,
  //14px
  8: $font-size-base * 0.75,
  //12px
  9: $font-size-base * 0.625,
  //10px
);

$border-color: $BG04;

@import '../node_modules/bootstrap/scss/bootstrap';
</style>
