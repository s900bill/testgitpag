<template>
  <a-button
    class="editable-add-btn"
    style="margin-bottom: 8px"
    @click="handleAdd"
    >Add</a-button
  >
  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="hstack gap-1 text-danger">
            <div>
              <a-input
                v-model:value="editableData[record.key].name"
                @pressEnter="save(record.key)"
              />
            </div>
            <div>
              <check-outlined
                class="editable-cell-icon-check"
                @click="save(record.key)"
              />
            </div>
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined
              class="editable-cell-icon"
              @click="edit(record.key)"
            />
          </div>
        </div>
      </template>
      <!-- <template v-else-if="column.dataIndex === 'operation'">
        <a-popconfirm
          v-if="getallpayment.length"
          title="Sure to delete?"
          @confirm="onDelete(record.key)"
        >
          <a>Delete</a>
        </a-popconfirm>
      </template> -->
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'

interface DataItem {
  key: string
  name: string
  age: number
  address: string
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    width: '30%',
  },
  {
    title: 'Room',
    dataIndex: 'Room',
  },
  {
    title: 'address',
    dataIndex: 'address',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
  },
]
const dataSource: Ref<DataItem[]> = ref([
  {
    key: '0',
    name: 'Edward King 0',
    age: 32,
    address: 'London, Park Lane no. 0',
  },
  {
    key: '1',
    name: 'Edward King 1',
    age: 32,
    address: 'London, Park Lane no. 1',
  },
])
const count = computed(() => dataSource.value.length + 1)
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})

const edit = (key: string) => {
  editableData[key] = {
    ...dataSource.value.filter((item) => key === item.key)[0],
  }
}
const save = (key: string) => {
  Object.assign(
    dataSource.value.filter((item) => key === item.key)[0],
    editableData[key]
  )
  delete editableData[key]
}

const onDelete = (key: string) => {
  dataSource.value = dataSource.value.filter((item) => item.key !== key)
}
const handleAdd = () => {
  const newData = {
    key: `${count.value}`,
    name: `Edward King ${count.value}`,
    age: 32,
    address: `London, Park Lane no. ${count.value}`,
  }
  dataSource.value.push(newData)
}

//   import { onMounted, ref, watch, reactive, createVNode } from 'vue'
//   import api from '@/network'
//   import { useRouter } from 'vue-router'
//   import { storeToRefs } from 'pinia'
//   import { globalstore } from '@/stores'
//   import { useI18n } from 'vue-i18n'
//   import { IListClass, IRoom } from '@/interface'
//   // import UserDetail from './UserDetail.vue'
//   import { message, Modal } from 'ant-design-vue'
//   import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

//   const { t } = useI18n()
//   const store = globalstore()
//   const { ismanager } = storeToRefs(store)
//   const router = useRouter()

//   const paymentlist = reactive<IListClass<IRoom>>({
//     data: [],
//     data_display: [],
//     loading: false,
//     filtervalue: '',
//     display_count: 20,
//   })
//   onMounted(() => {
//     getallpayment()
//   })

//   const getallpayment = (): void => {
//     paymentlist.loading = true
//     api('payment/', 'GET', null)
//       .then((res: any) => {
//         if (res) {
//             paymentlist.data = res
//         }
//       })
//       .catch((err: any) => {
//         message.error(err.message ?? err)
//       })
//       .finally(() => {
//         filterlist()
//         paymentlist.loading = false
//       })
//   }
//   const filterlist = (): void => {
//     let list = []
//     if (paymentlist.filtervalue) {
//       list = paymentlist.data.filter(
//         (x) =>
//           x.RoomNumber.includes(paymentlist.filtervalue)
//       )
//     } else {
//       list = [...paymentlist.data]
//     }
//     paymentlist.data_display = list.slice(0, paymentlist.display_count)
//   }

//   const infinitload = (): void => {
//     paymentlist.display_count = paymentlist.display_count + 20
//     filterlist()
//   }

//   watch(
//     () => paymentlist.filtervalue,
//     () => {
//       filterlist()
//     }
//   )

//   const roomdetail_visable = ref<boolean>(false)
//   const viewuser = ref<IRoom>({
//     ID: -1,
//     RoomNumber: '',
//     UserList: [],
//     Group: '',
//     ElectrictyMeter: '',
//     WaterMeter: '',
//     Remark: ''
//   })
//   const itemclick = (user) => {
//     viewuser.value = user
//     roomdetail_visable.value = true
//   }

//   const selectedlist = ref<Array<number>>([])
//   const selectuser = (id: number): void => {
//     let index = selectedlist.value.indexOf(id)
//     if (index === -1) {
//       selectedlist.value.push(id)
//     } else {
//       selectedlist.value.splice(index, 1)
//     }
//   }

//   const selectallflag = ref<boolean>(false)
//   const selectall = () => {
//     if (selectallflag.value) {
//       if (paymentlist.filtervalue) {
//         let filterlist = paymentlist.data
//           .filter(
//             (x) =>
//               x.RoomNumber.includes(paymentlist.filtervalue)
//           )
//           .map((y) => y.ID)
//         selectedlist.value = selectedlist.value.filter(
//           (x) => filterlist.indexOf(x) === -1
//         )
//       } else {
//         selectedlist.value = []
//       }
//       selectallflag.value = false
//     } else {
//       if (paymentlist.filtervalue) {
//         let filterlist = paymentlist.data
//           .filter(
//             (x) =>
//               x.RoomNumber.includes(paymentlist.filtervalue) &&
//               selectedlist.value.indexOf(x.ID) === -1
//           )
//           .map((y) => y.ID)
//         selectedlist.value = [...selectedlist.value, ...filterlist]
//       } else {
//         selectedlist.value = paymentlist.data.map((x) => x.ID)
//       }
//       selectallflag.value = true
//     }
//   }

//   const update = () => {
//     roomdetail_visable.value = false;
//     getallpayment();
//   }
//   //#region delete user

//   const confirmdelete = () => {
//     Modal.confirm({
//       title: t('roomlist.delete_title', { n: selectedlist.value.length }),
//       icon: createVNode(ExclamationCircleOutlined),
//       onOk() {
//         return new Promise((resolve, reject) => {
//           api('room/deleteMultiRooms', 'DELETE', {
//             DeleteIDList: selectedlist.value,
//           })
//             .then((res: any) => {
//               if (res) {
//                 message.success(t('roomlist.delete_success'))
//                 selectedlist.value = []
//                 getallpayment()

//                 resolve(null)
//               }
//             })
//             .catch((err: any) => {
//               message.error(err.message ?? err)
//               reject(err)
//             })
//         })
//       },
//     })
//   }

//    //#endregion
</script>

<style lang="scss" scoped></style>
