<template>
  <div v-if="!createsuccess">
    <div class="hstack gap-1 pb-1">
      <span
        class="icon-arrow-left fs-5 text-hover cursor-pointer"
        @click="back()"
      ></span>
      <div class="fs-5">{{ $t('button.back') }}</div>
    </div>
    <div class="position-relative m-3 d-inline-flex">
      <a-avatar :src="mUserInfo.Image" :size="90">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <a-upload
        name="avatar"
        :multiple="false"
        :customRequest="uploadfiles"
        class="avatar-uploader"
        :show-upload-list="false"
        :before-upload="beforeUpload"
      >
        <a-avatar
          :size="40"
          :class="!mUserInfo.Image ? 'bi-plus-lg' : 'icon-pencil'"
          class="position-absolute end-0 bottom-0 rounded-circle bg-secondary cursor-pointer bg-hover"
        />
      </a-upload>
    </div>
    <a-form
      ref="formRef"
      :model="mUserInfo"
      v-bind="layout"
      :layout="'vertical'"
      :scrollToFirstError="true"
    >
      <a-form-item
        has-feedback
        :label="$t('edituser.account')"
        name="Account"
        v-bind="validateInfos.Account"
      >
        <a-input v-model:value="mUserInfo.Account" autocomplete="off" />
      </a-form-item>
      <a-form-item
        has-feedback
        :label="$t('edituser.name')"
        name="Name"
        v-bind="validateInfos.Name"
      >
        <a-input v-model:value="mUserInfo.Name" autocomplete="off" />
      </a-form-item>
      <a-form-item
        has-feedback
        :label="$t('edituser.description')"
        name="Description"
      >
        <a-input v-model:value="mUserInfo.Description" autocomplete="off" />
      </a-form-item>
      <a-form-item
        has-feedback
        :label="$t('edituser.password')"
        name="Password"
        v-bind="validateInfos.Password"
      >
        <a-input-password v-model:value="mUserInfo.Password" autocomplete="off">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        has-feedback
        :label="$t('edituser.confirmpassword')"
        name="ConfirmPassword"
        v-bind="validateInfos.ConfirmPassword"
      >
        <a-input-password
          v-model:value="mUserInfo.ConfirmPassword"
          autocomplete="off"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        has-feedback
        :label="$t('edituser.phone')"
        name="Phone"
        v-bind="validateInfos.Phone"
      >
        <a-input v-model:value="mUserInfo.Phone" autocomplete="off" />
      </a-form-item>
      <a-form-item
        has-feedback
        :label="$t('edituser.email')"
        name="Email"
        v-bind="validateInfos.Email"
      >
        <a-input v-model:value="mUserInfo.Email" autocomplete="off" />
      </a-form-item>
      <a-form-item
        has-feedback
        label="Line ID"
        name="LineID"
        v-bind="validateInfos.LineID"
      >
        <a-input v-model:value="mUserInfo.LineID" autocomplete="off" />
      </a-form-item>
      <a-form-item
        has-feedback
        :label="$t('edituser.room')"
        name="Room"
        v-bind="validateInfos.Room"
      >
        <a-select v-model:value="mUserInfo.Room" :optionFilterProp="'label'">
          <a-select-option
            v-for="room in roomlist"
            :key="room.ID"
            :value="room.ID"
            >{{ room.RoomNumber }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item has-feedback :label="$t('edituser.leaseterm')">
        <a-range-picker v-model:value="leaserange" />
      </a-form-item>
      <a-form-item
        has-feedback
        :label="$t('edituser.leasetype')"
        name="LeaseType"
        v-bind="validateInfos.LeaseType"
      >
        <a-select v-model:value="mUserInfo.LeaseType">
          <a-select-option :value="eLeaseType.monthly">{{
            $t('leasetype.monthly')
          }}</a-select-option>
          <a-select-option :value="eLeaseType.quarterly">{{
            $t('leasetype.quarterly')
          }}</a-select-option>
          <a-select-option :value="eLeaseType.annually">{{
            $t('leasetype.annually')
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        has-feedback
        :label="$t('edituser.rent')"
        name="Rent"
        v-bind="validateInfos.Rent"
      >
        <a-input v-model:value="mUserInfo.Rent" autocomplete="off" />
      </a-form-item>
      <a-form-item has-feedback :label="$t('edituser.role')" name="Role">
        <a-select v-model:value="mUserInfo.Role">
          <a-select-option :value="eRole.Manager">{{
            $t('userrole.manager')
          }}</a-select-option>
          <a-select-option :value="eRole.User">{{
            $t('userrole.user')
          }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          class="bg-info border-info"
          @click.prevent="onSubmit"
        >
          {{ $t('button.create') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
  <a-result
    v-else
    status="success"
    :title="$t('edituser.successcreate') + ': ' + mUserInfo.Name"
  >
    <template #extra>
      <a-button
        type="primary"
        @click="
          () => {
            router.push({ name: 'UserList' })
          }
        "
        >{{ $t('button.confirm') }}
      </a-button>
      <a-button @click="createnext()">{{ $t('edituser.createnext') }}</a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, watch } from 'vue'
import api from '@/network'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { globalstore } from '@/stores'
import { $CompressionImage } from '@/globalfunction'
import { IUserInfo, eRole, eLeaseType, IRoom } from '@/interface'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { message, Form } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const store = globalstore()

const { t } = useI18n()

const formRef: any = ref<InstanceType<typeof Form>>() // 实例化

const back = () => {
  window.history.go(-1)
}

const inituserinfo = reactive<IUserInfo>({
  ID: '',
  Account: '',
  Name: '',
  Description: '',
  Password: '',
  ConfirmPassword: '',
  Email: '',
  Phone: '',
  LineID: '',
  // Room: null,
  Role: eRole.User,
  // LeaseStart:new Date(),
  // LeaseEnd:new Date(),
  LeaseType: eLeaseType.monthly,
  Rent: 0,
  Image: '',
})
const mUserInfo = reactive<IUserInfo>({ ...inituserinfo })
const leaserange = ref([dayjs(), dayjs().add(1, 'y')])
watch(
  leaserange,
  (newvalue, oldvalue) => {
    if (newvalue !== null) {
      mUserInfo.LeaseStart = leaserange.value[0]?.format('YYYY/MM/DD')
      mUserInfo.LeaseEnd = leaserange.value[1]?.format('YYYY/MM/DD')
    } else {
      mUserInfo.LeaseStart = null
      mUserInfo.LeaseEnd = null
    }
  },
  { immediate: true }
)

onMounted(() => {
  getRoomList()
})

const roomlist = ref<Array<IRoom>>([])
const getRoomList_load = ref<boolean>(false)
const getRoomList = (): void => {
  getRoomList_load.value = true

  api('room/', 'GET', null)
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

let validateAccount = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject(t('edituser.validate_account_require'))
  } else if (!(await checkaccountavailable(value))) {
    return Promise.reject(t('edituser.validate_account_repeat'))
  } else {
    return Promise.resolve()
  }
}
const checkaccountavailable = async (value: string) => {
  let result: Boolean = false
  await api(`user/checkAccountRepeat/${value}`, 'GET', null)
    .then((res: any) => {
      result = res
    })
    .catch((err: any) => {
      message.error(err)
      result = false
    })
  return result
}

let validateName = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject(t('edituser.validate_name_require'))
  } else {
    return Promise.resolve()
  }
}
const validatePassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject(t('edituser.validate_password_require'))
  }
}

const validateConfirmPassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject(t('edituser.validate_confirmpassword_require'))
  } else if (value !== mUserInfo.Password) {
    return Promise.reject(t('edituser.validate_confirmpassword_error'))
  } else {
    return Promise.resolve()
  }
}

let validatePhone = async (_rule: Rule, value: string) => {
  if (value) {
    var pattern = new RegExp('^[0-9]*$')
    if (pattern.test(value)) {
      return Promise.resolve()
    } else {
      return Promise.reject(t('edituser.validate_phone'))
    }
  }
  return Promise.resolve()
}
let validateEmail = async (_rule: Rule, value: string) => {
  if (value) {
    var pattern =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
    if (pattern.test(value)) {
      return Promise.resolve()
    } else {
      return Promise.reject(t('edituser.validate_email'))
    }
  }
  return Promise.resolve()
}

const rules = reactive({
  Account: [{ required: true, validator: validateAccount }],
  Name: [{ required: true, validator: validateName }],
  Password: [{ required: true, validator: validatePassword }],
  ConfirmPassword: [{ required: true, validator: validateConfirmPassword }],
  Phone: [{ required: false, validator: validatePhone }],
  Email: [{ required: false, type: 'email', validator: validateEmail }],
})

const layout = {
  // labelCol: { md: { span: 4 }, xl: { span: 4 }, },
  wrapperCol: { md: { span: 20 }, xl: { span: 22 } },
}
const useForm = Form.useForm
const { validate, validateInfos } = useForm(mUserInfo, rules)

const createuser_load = ref<boolean>(false)
const onSubmit = () => {
  createuser_load.value = true
  validate()
    .then(() => {
      api('user/create', 'POST', mUserInfo)
        .then((res: any) => {
          if (res) {
            createsuccess.value = true
          }
        })
        .catch((err: any) => {
          message.error(err)
        })
        .finally(() => {
          createuser_load.value = false
        })
    })
    .catch(() => {
      formRef.value.scrollToField()
    })
}

const createsuccess = ref<boolean>(false)
const createnext = () => {
  Object.assign(mUserInfo, inituserinfo)
  createsuccess.value = false
}

const beforeUpload = (file) => {
  const fileTypes = [
    'image/apng',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    'image/x-icon',
  ]
  const isImage = fileTypes.includes(file.type)
  if (!isImage) {
    message.error(t('upload.notimage'))
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error(t('upload.over2M'))
  }
  return isImage && isLt2M
}

const uploadfiles = (file) => {
  $CompressionImage(file.file, (newbase64) => {
    mUserInfo.Image = newbase64
  })
}
</script>

<style lang="scss" scoped></style>
