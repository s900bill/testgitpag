<template>
  <div class="fs-2 fw-bold mb-3">{{ $t('layout.room') }}</div>

  <div class="row gx-0 gap-1 mb-3">
    <a-button
      v-show="selectedlist.length == 0"
      shape="round"
      :size="'large'"
      class="col-md-4 col-lg-3 col-xl-2"
      @click="router.push({ name: 'CreateRser' })"
    >
      <template #icon>
        <span class="bi-plus-lg me-1"></span>
      </template>
      {{ $t('roomlist.createroom') }}
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
            selectallflag || selectedlist?.length === roomlist.data?.length
              ? 'bg-info  border-info '
              : 'bg-secondary'
          "
          style="width: 20px; height: 20px"
          @click.stop="selectall"
        >
          <span
            v-if="
              selectallflag || selectedlist?.length === roomlist.data?.length
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
      {{ $t('roomlist.deleterooms') }}
    </a-button>
    <div class="col-lg-2 ms-lg-auto">
      <a-input v-model:value="roomlist.filtervalue" class="rounded-pill">
        <template #prefix>
          <span class="bi-search"></span>
        </template>
      </a-input>
    </div>
  </div>
  <a-skeleton :loading="roomlist.loading" active>
    <div
      class="overflow-hidden"
      v-infinitescroll.expend="{
        func: infinitload,
        target: '.roomlist',
        delay: 300,
      }"
    >
      <div v-if="roomlist.data_display.length > 0">
        <div class="roomlist row g-3 overflow-auto" style="max-height: 700px">
          <div
            v-for="item in roomlist.data_display"
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
              <div class="vstack gap-1">
                <div class="fw-bold fs-5">{{ item.RoomNumber }}</div>
                <div>
                  <div
                    class="float-start me-1"
                    v-for="user in item.UserList"
                    :key="user.ID"
                  >
                    <span class="bi-person" style="margin-right: 0.2rem"></span
                    >{{ user.Name }}
                  </div>
                </div>
              </div>

              <!-- <div class="d-flex position-relative">
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
                        <span class="bi-telephone"></span>
                      </a-tooltip>
                      <a-tooltip :title="item.Email">
                        <span class="bi-envelope"></span>
                      </a-tooltip>
                      <a-tooltip :title="item.LineID">
                        <span class="bi-line"></span>
                      </a-tooltip>
                    </div>
                    <div
                      class="me-1 text-secondary text-truncate"
                      style="max-width: 150px"
                    >
                      {{ item.Room }}
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
                </div> -->
            </div>
          </div>
        </div>
        <!-- <div v-if="!roomlist.loading && roomlist.display_count < roomlist.data.length"
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
  <a-modal v-model:visible="roomdetail_visable" :footer="null" width="400px">
    <!-- <UserDetail
        :userinfo="viewuser"
        @close="roomdetail_visable = false"
        @update="update()"
      ></UserDetail> -->
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive, createVNode } from 'vue'
import api from '@/network'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { globalstore } from '@/stores'
import { useI18n } from 'vue-i18n'
import { IListClass, IRoom } from '@/interface'
// import UserDetail from './UserDetail.vue'
import { message, Modal } from 'ant-design-vue'
import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

const { t } = useI18n()
const store = globalstore()
const { ismanager } = storeToRefs(store)
const router = useRouter()

const roomlist = reactive<IListClass<IRoom>>({
  data: [],
  data_display: [],
  loading: false,
  filtervalue: '',
  display_count: 20,
})
onMounted(() => {
  getallroom()
})

const getallroom = (): void => {
  roomlist.loading = true
  api('room/', 'GET', null)
    .then((res: any) => {
      if (res) {
        roomlist.data = res
      }
    })
    .catch((err: any) => {
      message.error(err.message ?? err)
    })
    .finally(() => {
      filterlist()
      roomlist.loading = false
    })
}
const filterlist = (): void => {
  let list = []
  if (roomlist.filtervalue) {
    list = roomlist.data.filter((x) =>
      x.RoomNumber.includes(roomlist.filtervalue)
    )
  } else {
    list = [...roomlist.data]
  }
  roomlist.data_display = list.slice(0, roomlist.display_count)
}

const infinitload = (): void => {
  roomlist.display_count = roomlist.display_count + 20
  filterlist()
}

watch(
  () => roomlist.filtervalue,
  () => {
    filterlist()
  }
)

const roomdetail_visable = ref<boolean>(false)
const viewuser = ref<IRoom>({
  ID: -1,
  RoomNumber: '',
  UserList: [],
  Group: '',
  ElectrictyMeter: '',
  WaterMeter: '',
  Remark: '',
})
const itemclick = (user) => {
  viewuser.value = user
  roomdetail_visable.value = true
}

const selectedlist = ref<Array<number>>([])
const selectuser = (id: number): void => {
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
    if (roomlist.filtervalue) {
      let filterlist = roomlist.data
        .filter((x) => x.RoomNumber.includes(roomlist.filtervalue))
        .map((y) => y.ID)
      selectedlist.value = selectedlist.value.filter(
        (x) => filterlist.indexOf(x) === -1
      )
    } else {
      selectedlist.value = []
    }
    selectallflag.value = false
  } else {
    if (roomlist.filtervalue) {
      let filterlist = roomlist.data
        .filter(
          (x) =>
            x.RoomNumber.includes(roomlist.filtervalue) &&
            selectedlist.value.indexOf(x.ID) === -1
        )
        .map((y) => y.ID)
      selectedlist.value = [...selectedlist.value, ...filterlist]
    } else {
      selectedlist.value = roomlist.data.map((x) => x.ID)
    }
    selectallflag.value = true
  }
}

const update = () => {
  roomdetail_visable.value = false
  getallroom()
}

//#region delete user

const confirmdelete = () => {
  Modal.confirm({
    title: t('roomlist.delete_title', { n: selectedlist.value.length }),
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      return new Promise((resolve, reject) => {
        api('room/deleteMultiRooms', 'DELETE', {
          DeleteIDList: selectedlist.value,
        })
          .then((res: any) => {
            if (res) {
              message.success(t('roomlist.delete_success'))
              selectedlist.value = []
              getallroom()

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
