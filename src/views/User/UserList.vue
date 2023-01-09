<template>
  <div class="fs-2 fw-bold mb-3">{{ $t('layout.user') }}</div>

  <div class="row gx-0 gap-1 mb-3">
    <a-button
      v-show="selectedlist.length == 0"
      shape="round"
      :size="'large'"
      class="col-md-4 col-lg-3 col-xl-2"
      @click="router.push({ name: 'CreateUser' })"
    >
      <template #icon>
        <span class="bi-plus-lg me-1"></span>
      </template>
      {{ $t('userlist.createuser') }}
    </a-button>
    <a-button
      v-show="selectedlist.length > 0 && ismanager"
      shape="round"
      :size="'large'"
      class="col-lg-3 col-xl-2"
      @click.stop="selectall"
    >
      <div class="hstack justify-content-center gap-1">
        <span
          class="bg-secondary rounded-1 border"
          :class="
            selectallflag || selectedlist?.length === userlist.data?.length
              ? 'bg-info  border-info '
              : 'bg-secondary'
          "
          style="width: 20px; height: 20px"
          @click.stop="selectall"
        >
          <span
            v-if="
              selectallflag || selectedlist?.length === userlist.data?.length
            "
            class="bi-check-lg"
            style=""
          ></span>
        </span>
        <span>
          {{ $t('button.selectall') }}
        </span>
        <a-badge
          :count="selectedlist.length"
          :number-style="{
            backgroundColor: '#147DF0',
          }"
        />
      </div>
    </a-button>
    <a-button
      v-show="selectedlist.length > 0 && ismanager"
      shape="round"
      :size="'large'"
      class="col-md-4 col-lg-3 col-xl-2"
      @click="confirmdelete"
    >
      <template #icon>
        <span class="bi-trash me-1"></span>
      </template>
      {{ $t('userlist.deleteusers') }}
    </a-button>
    <div class="col-lg-2 ms-lg-auto">
      <a-input v-model:value="userlist.filtervalue" class="rounded-pill">
        <template #prefix>
          <span class="bi-search"></span>
        </template>
      </a-input>
    </div>
  </div>
  <a-skeleton :loading="userlist.loading" active>
    <div
      class="overflow-hidden"
      v-infinitescroll.expend="{
        func: infinitload,
        target: '.userlist',
        delay: 300,
      }"
    >
      <div v-if="userlist.data_display.length > 0">
        <div class="userlist row g-3 overflow-auto" style="max-height: 700px">
          <div
            v-for="item in userlist.data_display"
            :key="item.ID"
            class="col-md-6 col-xl-4 col-xxl-3"
            style="min-width: 400px"
          >
            <div
              style="height: 120px"
              class="p-3 bg-dark rounded border"
              :class="selectedlist.includes(item.ID) ? 'border-info' : ''"
              role="button"
              @click="itemclick(item)"
            >
              <div class="d-flex position-relative">
                <a-avatar :src="item.Image" :size="60" class="my-auto me-3">
                  <template #icon>
                    <UserOutlined />
                  </template>
                </a-avatar>
                <div class="vstack gap-1">
                  <div class="d-flex align-items-center">
                    <span
                      class="me-1 fs-5 text-truncate"
                      style="max-width: 150px"
                      >{{ item.Name }}</span
                    >
                    <a-tag
                      v-if="item.Role === 1"
                      class="bg-custom-01 rounded-1"
                    >
                      {{ $t('userrole.manager') }}</a-tag
                    >
                  </div>

                  <div class="hstack gap-1 text-secondary fs-7">
                    <a-tooltip :title="item.Phone">
                      <span v-show="item.Phone" class="bi-telephone"></span>
                    </a-tooltip>
                    <a-tooltip :title="item.Email">
                      <span v-show="item.Email" class="bi-envelope"></span>
                    </a-tooltip>
                    <a-tooltip :title="item.LineID">
                      <span v-show="item.LineID" class="bi-line"></span>
                    </a-tooltip>
                  </div>
                  <div
                    v-if="roomlist"
                    class="me-1 text-secondary text-truncate"
                    style="max-width: 150px"
                  >
                    {{ getRoomNumber(item.Room) }}
                  </div>
                </div>
                <div
                  class="position-absolute top-0 end-0 bg-secondary rounded-1 text-center border"
                  :class="
                    selectedlist.includes(item.ID)
                      ? 'bg-info  border-info'
                      : 'bg-secondary'
                  "
                  style="width: 20px; height: 20px"
                  @click.stop="selectuser(item.ID)"
                >
                  <span
                    v-if="selectedlist.includes(item.ID)"
                    class="icon bi-check-lg align-middle"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div v-if="!userlist.loading && userlist.display_count < userlist.data.length"
                :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                <a-button @click="onLoadMore">{{ $t('component.loadingmore') }}</a-button>
            </div> -->
      </div>
      <div
        v-else
        class="d-flex align-items-center justify-content-center"
        style="height: 500px"
      >
        <a-empty />
      </div>
    </div>
  </a-skeleton>
  <a-modal v-model:visible="userdetail_visable" :footer="null" width="400px">
    <UserDetail
      :userinfo="viewuser"
      @close="userdetail_visable = false"
      @update="update()"
    ></UserDetail>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive, createVNode } from 'vue'
import api from '@/network'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { globalstore } from '@/stores'
import { useI18n } from 'vue-i18n'
import { IListClass, IUserInfo, IRoom } from '@/interface'
import UserDetail from './UserDetail.vue'
import { message, Modal } from 'ant-design-vue'
import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

const { t } = useI18n()
const store = globalstore()
const { ismanager } = storeToRefs(store)
const router = useRouter()

onMounted(async () => {
  await getRoomList()
  await getalluser()
})
const roomlist = ref<Array<IRoom>>([])
const getRoomList_load = ref<boolean>(false)
const getRoomList = async () => {
  getRoomList_load.value = true

  await api('room/', 'GET', null)
    .then((res: any) => {
      if (res) {
        roomlist.value = res
      }
    })
    .catch((err: any) => {
      message.error(err)
    })
    .finally(() => {
      getRoomList_load.value = false
    })
}
const getRoomNumber = (id: number) => {
  return roomlist.value.find((x) => x.ID === id).RoomNumber
}

const userlist = reactive<IListClass<IUserInfo>>({
  data: [],
  data_display: [],
  loading: false,
  filtervalue: '',
  display_count: 20,
})
onMounted(() => {})

const getalluser = async (): Promise<void> => {
  userlist.loading = true
  await api('user/', 'GET', null)
    .then((res: any) => {
      if (res) {
        userlist.data = res
      }
    })
    .catch((err: any) => {
      message.error(err.message ?? err)
    })
    .finally(() => {
      filterlist()
      userlist.loading = false
    })
}
const filterlist = (): void => {
  let list = []
  if (userlist.filtervalue) {
    list = userlist.data.filter(
      (x) =>
        x.Name.includes(userlist.filtervalue) ||
        x.Email.includes(userlist.filtervalue) ||
        x.Phone.includes(userlist.filtervalue)
    )
  } else {
    list = [...userlist.data]
  }
  userlist.data_display = list.slice(0, userlist.display_count)
}

const infinitload = (): void => {
  userlist.display_count = userlist.display_count + 20
  filterlist()
}

watch(
  () => userlist.filtervalue,
  () => {
    filterlist()
  }
)

const userdetail_visable = ref<boolean>(false)
const viewuser = ref<IUserInfo>({
  ID: '',
  Account: '',
  Name: '',
  Email: '',
  Phone: '',
  Role: 0,
  Image: '',
})
const itemclick = (user) => {
  viewuser.value = user
  userdetail_visable.value = true
}

const selectedlist = ref<Array<string>>([])
const selectuser = (id: string): void => {
  let index = selectedlist.value.indexOf(id)
  if (index === -1) {
    selectedlist.value.push(id)
  } else {
    selectedlist.value.splice(index, 1)
  }
}

const selectallflag = ref<boolean>(false)
const selectall = () => {
  if (selectallflag.value) {
    if (userlist.filtervalue) {
      let filterlist = userlist.data
        .filter(
          (x) =>
            x.Name.includes(userlist.filtervalue) ||
            x.Description?.includes(userlist.filtervalue)
        )
        .map((y) => y.ID)
      selectedlist.value = selectedlist.value.filter(
        (x) => filterlist.indexOf(x) === -1
      )
    } else {
      selectedlist.value = []
    }
    selectallflag.value = false
  } else {
    if (userlist.filtervalue) {
      let filterlist = userlist.data
        .filter(
          (x) =>
            (x.Name.includes(userlist.filtervalue) ||
              x.Description?.includes(userlist.filtervalue)) &&
            selectedlist.value.indexOf(x.ID) === -1
        )
        .map((y) => y.ID)
      selectedlist.value = [...selectedlist.value, ...filterlist]
    } else {
      selectedlist.value = userlist.data.map((x) => x.ID)
    }
    selectallflag.value = true
  }
}

const update = () => {
  userdetail_visable.value = false
  getalluser()
}

//#region delete user

const confirmdelete = () => {
  Modal.confirm({
    title: t('userlist.delete_title', { n: selectedlist.value.length }),
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      return new Promise((resolve, reject) => {
        api('user/deleteMultiUsers', 'DELETE', {
          DeleteIDList: selectedlist.value,
        })
          .then((res: any) => {
            if (res) {
              message.success(t('userlist.delete_success'))
              selectedlist.value = []
              getalluser()

              resolve(null)
            }
          })
          .catch((err: any) => {
            message.error(err.message ?? err)
            reject(err)
          })
      })
    },
  })
}

//#endregion
</script>

<style lang="scss" scoped></style>
