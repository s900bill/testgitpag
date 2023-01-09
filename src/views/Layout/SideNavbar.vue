<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :collapsedWidth="100"
    class="vh-100 overflow-auto"
  >
    <div
      v-if="!collapsed && prop.expand"
      @click.stop.prevent="emit('closedrawer')"
      class="position-absolute end-0 top-0 icon-cancel fs-4 m-3 cursor-pointer"
    ></div>
    <div class="vstack h-100 overflow-hidden">
      <!-- <a-switch v-model:checked="collapsed" checked-children="-" un-checked-children="黄" /> -->
      <div class="d-flex p-3 mt-1 align-items-center">
        <img
          src="@img/layout/Logo.svg"
          :style="
            collapsed
              ? 'width:60px;  margin-left:0px'
              : 'width:56px;margin-right:5px;'
          "
        />

        <span
          :style="collapsed ? 'opacity :0;display:none' : ''"
          class="fs-3 fw-bold"
          style="transition: display 1s ease-out, opacity 0.3s linear"
          >RMS</span
        >
      </div>

      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        class="overflow-auto"
        @click="navclick"
      >
        <template v-for="item in list" :key="item.key">
          <template v-if="!item.children">
            <a-menu-item
              :key="item.key"
              class="py-2 my-0 rounded-start"
              :class="collapsed ? 'ms-1' : ''"
              style="height: 65px"
            >
              <template #icon>
                <span
                  :class="item.icon"
                  class="fs-3"
                  :style="collapsed ? '  margin-left:-10px ;' : ''"
                  style="transition: 0.3s; transition-property: margin-left"
                ></span>
              </template>
              {{ $t(item.title) }}
            </a-menu-item>
          </template>
          <template v-else>
            <SubMenu
              :collapsed="collapsed"
              :key="item.key"
              :menu-info="item"
              class="mb-1"
            />
          </template>
        </template>
      </a-menu>
      <a-dropdown class="border-top border-secondary p-3 mt-auto">
        <div
          class="ant-dropdown-link fw-bold text-white hstack"
          @click.prevent
          style="width: 200px"
        >
          <a-avatar class="me-3 ms-1">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <div
            :style="collapsed ? 'opacity :0;' : ''"
            style="
              transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
                margin 0.3s, color 0.3s;
            "
          >
            <span class="fs-5 text-truncate d-block" style="max-width: 100px">
              {{ userinfo.Name }}</span
            >
          </div>
        </div>
        <template #overlay>
          <a-menu @click="userdropdown_click">
            <a-menu-item key="Profile">
              {{ $t('layout.profile') }}
            </a-menu-item>
            <a-menu-item key="ChangeLanguage">
              {{ $t('layout.language') }}
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="Logout">{{ $t('layout.logout') }}</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-sider>
  <div v-if="!prop.expand" class="position-relative">
    <div
      class="position-absolute bg-hover rounded-circle bg-dark text-center cursor-pointer"
      style="bottom: 85px; right: -15px; width: 28px; height: 28px"
      @click.prevent="change(!collapsed)"
    >
      <span
        :class="collapsed ? 'bi bi-chevron-right' : 'bi bi-chevron-left'"
        style="line-height: 28px"
      ></span>
    </div>
  </div>

  <a-modal
    v-model:visible="changelang_visible"
    :title="$t('layout.changelanguage')"
    :footer="null"
  >
    <ChangeLanguage @close="changelang_visible = false"></ChangeLanguage>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { globalstore } from '@/stores'
import { INavItem } from '@/interface'
import SubMenu from './SubMenu.vue'
import { $Logout } from '@/globalfunction'
import type { MenuProps } from 'ant-design-vue'
import { UserOutlined, DownOutlined } from '@ant-design/icons-vue'
const store = globalstore()
const { userinfo } = storeToRefs(store)

const emit = defineEmits(['closedrawer', 'changelanguage'])

const prop = defineProps<{ expand: boolean }>()
const collapsed = ref<boolean>(true)
const change = (value: boolean) => {
  if (!prop.expand) {
    collapsed.value = value
  }
}

const route = useRoute()
onMounted(() => {
  selectedKeys.value = [route.name.toString()]
  collapsed.value = !prop.expand
})
watch(
  () => route.name,
  () => {
    selectedKeys.value = [route.name.toString()]
  }
)

const list: Array<INavItem> = [
  {
    key: 'Home',
    title: 'layout.home',
    icon: 'icon-home',
  },
  {
    key: 'UserList',
    title: 'layout.user',
    icon: 'bi-people-fill',
    // children: [
    //   {
    //     key: 'UserGroupList',
    //     title: 'usermanagement.grouplist',
    //     // icon: 'icon-users',
    //     //children: [{ key: '2.1.1', title: 'layout.home', icon: 'bi-search', }],
    //   },
    //   {
    //     key: 'UserList',
    //     title: 'usermanagement.userlist',
    //   },
    // ],
  },
  {
    key: 'RoomList',
    title: 'layout.room',
    icon: 'bi-door-closed-fill',
  },
  {
    key: 'PaymentList',
    title: 'layout.payment',
    icon: 'bi-currency-dollar',
  },
]

const selectedKeys = ref<Array<string>>([''])
const openKeys = ref<Array<string>>([''])

const router = useRouter()
const navclick: MenuProps['onClick'] = (menuInfo) => {
  router.push({ name: menuInfo.key.toString() })
}

const changelang_visible = ref<Boolean>(false)

const userdropdown_click: MenuProps['onClick'] = (menuInfo) => {
  switch (menuInfo.key) {
    case 'Profile':
      router.push({ name: 'EditUser', query: { id: userinfo.value.ID } })
      break
    case 'ChangeLanguage':
      changelang_visible.value = true
      break
    case 'Logout':
      $Logout()
      break
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  if (!collapsed.value && window.innerWidth < 1400) {
    collapsed.value = true
  }
}
</script>

<style lang="scss" scoped>
.ant-menu-item-selected {
  .icon {
    opacity: 1;
  }
}
</style>
