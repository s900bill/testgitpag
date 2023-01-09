<template>
  <div>
    <div
      class="w-100 min-vh-100 d-flex flex-wrap justify-content-center align-items-center"
    >
      <div class="bg-dark rounded py-5" style="width: 390px">
        <form class="">
          <div class="fs-1 text-center py-2">
            {{ $t('login.welcome') }}
          </div>
          <div class="text-center pb-3">
            <img src="@img/layout/Logo.svg" class="mx-auto img-fluid w-50" />
          </div>

          <div class="w-75 mx-auto">
            <div class="mb-3 px-3">
              <div class="mb-1 text-start">
                <label for="Account">{{ $t('login.account') }}</label>
              </div>
              <a-input id="Account" v-model:value="logindata.Account" />
            </div>
            <div class="mb-4 px-3">
              <div class="mb-1 text-start">
                <label for="Password">{{ $t('login.password') }}</label>
              </div>
              <a-input
                type="password"
                id="Password"
                class="form-control"
                required
                v-model:value="logindata.Password"
              />
            </div>
            <div class="px-3 text-center">
              <a-button
                id="login_btn"
                @click="login()"
                :loading="login_load"
                :disabled="loginbtn_disable"
              >
                {{ $t('login.login') }}
              </a-button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { globalstore } from '@/stores'
import api from '@/network'
import { useI18n } from 'vue-i18n'
import { computed } from '@vue/reactivity'
import { message } from 'ant-design-vue'

const store = globalstore()
const router = useRouter()
const { t } = useI18n()

onMounted(() => {
  window.addEventListener('keydown', keydownhandle)
})

onUnmounted(() => {
  window.removeEventListener('keydown', keydownhandle)
})

function keydownhandle(e: any) {
  if (e.keyCode == 13) {
    document.getElementById('login_btn')?.click()
  }
}

interface Ilogin {
  Account: string
  Password: string
}
const logindata = reactive<Ilogin>({ Account: '', Password: '' })

let login_load = ref(false)
function login() {
  login_load.value = true
  api('user/login', 'POST', logindata)
    .then((res: any) => {
      if (res) {
        store.updatetoken(res)
        //store.updateuserinfo(res);
        localStorage.setItem('Token', res)
        router.push({
          name: 'Home',
        })
      }
    })
    .catch((err: any) => {
      // 请求失败处理
      message.error(t('login.loginfail'))
    })
    .finally(() => {
      login_load.value = false
    })
}

const loginbtn_disable = computed(() => {
  return logindata.Account === '' || logindata.Password === ''
})
</script>

<style lang="scss" scoped></style>
