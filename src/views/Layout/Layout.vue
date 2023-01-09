<template>
  <div style="min-height: 100vh">
    <nav
      class="navbar px-1 py-1 bg-dark position-sticky top-0 d-md-none"
      style="z-index: 2"
    >
      <div class="container-fluid px-0">
        <div class="d-flex align-items-center">
          <img src="@img/layout/Logo.svg" class="me-1" style="width: 32px" />
          <span class="fs-5 fw-bold">RMS</span>
        </div>
        <div style="width: 60px" class="d-md-none">
          <span id="nav_burger" @click="showsidebar = !showsidebar"> </span>
        </div>
      </div>
    </nav>

    <div class="d-flex h-100">
      <div class="d-none d-md-block">
        <SideNavbarVue :expand="false"> </SideNavbarVue>
      </div>

      <div
        class="flex-grow-1 overflow-auto vh-100 p-3 px-sm-4 px-md-5 px-lg-6 px-xl-7 pt-xl-6"
      >
        <router-view />
      </div>
    </div>

    <a-drawer
      :width="200"
      :closable="false"
      :placement="'left'"
      :visible="showsidebar"
      :bodyStyle="{ padding: 0 }"
      @close="onClose"
    >
      <div class="overflow-auto vh-100">
        <SideNavbarVue
          v-if="showsidebar"
          :expand="true"
          @closedrawer="onClose"
        ></SideNavbarVue>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
// import { storeToRefs } from 'pinia'
// import { globalstore } from '@/stores'
import SideNavbarVue from './SideNavbar.vue'
// import antdv_en_GB from 'ant-design-vue/lib/locale/en_GB';
// import antdv_zh_TW from 'ant-design-vue/lib/locale/zh_TW';
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-tw';
// import 'dayjs/locale/en';

// const store = globalstore()
//  const { lang } = storeToRefs(store)

const router = useRouter()

window.onpopstate = () => {
  if (router.currentRoute.value.meta.allowBack === false) {
    // 防止使用者點擊上一頁
    history.go(1)
  }
}

// const antdvlang = ref<any>(antdv_en_GB);

// watch(lang, (val) => {

//   switch (val) {
//     case 'English':
//       antdvlang.value = antdv_en_GB;
//       dayjs.locale('en');

//       break;
//     case '中文': antdvlang.value = antdv_zh_TW;
//       dayjs.locale('zh-tw');
//       break;
//   }

// }, { immediate: true }
// );

const showsidebar = ref<Boolean>(false)
const onClose = () => {
  showsidebar.value = false
}
</script>

<style lang="scss" scoped>
#nav_burger {
  background-image: url('@/assets/img/layout/Nav_burgericon.svg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 40px;
  height: 40px;
  display: block;
  margin: auto;
}
</style>
