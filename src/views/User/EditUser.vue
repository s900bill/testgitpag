<template>
  <div class="hstack gap-1 pb-1">
    <span
      class="icon-arrow-left fs-5 text-hover cursor-pointer"
      @click="back()"
    ></span>
    <div class="fs-5">{{ $t('edituser.title') }}</div>
    <div></div>
  </div>
  <div class="position-relative m-3 d-inline-flex">
    <a-avatar :src="mUserInfo.Image" :size="100">
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
  <a-form ref="formRef" :model="mUserInfo" v-bind="layout" :layout="'vertical'">
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
      <a-select
        v-model:value="mUserInfo.Room"
        :optionFilterProp="'RoomNumber'"
        allowClear
      >
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
        <a-select-option :value="0">{{ $t('userrole.user') }}</a-select-option>
        <a-select-option :value="1">{{
          $t('userrole.manager')
        }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        @click.prevent="changepassword_visable = !changepassword_visable"
        >{{ $t('edituser.changepassword') }}</a-button
      >
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        class="bg-info border-info"
        @click.prevent="onSubmit"
        >{{ $t('button.update') }}
      </a-button>
    </a-form-item>
  </a-form>

  <a-modal
    :cancelText="$t('button.cancel')"
    :okText="$t('button.confirm')"
    v-model:visible="changepassword_visable"
    :title="$t('edituser.changepassword')"
    :destroyOnClose="true"
    @cancel="changepassword_close"
    @ok="onSubmitChangePassword"
    :confirmLoading="changepassword_load"
  >
    <a-form
      ref="formRef"
      v-show="changepassword_visable"
      :model="mChangePassword"
      :rules="rules_changepassword"
      :layout="'vertical'"
      class=""
    >
      <a-form-item
        has-feedback
        :label="$t('edituser.currentpassword')"
        name="CurrentPassword"
      >
        <a-input-password
          v-model:value="mChangePassword.CurrentPassword"
          autocomplete="off"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        has-feedback
        :label="$t('edituser.newpassword')"
        name="NewPassword"
      >
        <a-input-password
          v-model:value="mChangePassword.NewPassword"
          autocomplete="off"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        has-feedback
        :label="$t('edituser.confirmpassword')"
        name="ConfirmPassword"
      >
        <a-input-password
          v-model:value="mChangePassword.ConfirmPassword"
          autocomplete="off"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, watch } from 'vue'
import api from '@/network'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { globalstore } from '@/stores'
import { $CompressionImage } from '@/globalfunction'
import { IUserInfo, eLeaseType, IRoom } from '@/interface'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { message, Form } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const store = globalstore()
const { userinfo } = storeToRefs(store)
const { t } = useI18n()

const back = () => {
  window.history.go(-1)
}

const userid: string = route.query.id.toString()
let origin_userinfo: IUserInfo = {
  ID: '',
  Account: '',
  Name: '',
  Email: '',
  Phone: '',
  Role: 0,
  Image: '',
  Room: 0,
  LeaseType: 0,
  Rent: 0,
}
const mUserInfo: IUserInfo = reactive<IUserInfo>({
  ID: '',
  Account: '',
  Name: '',
  Email: '',
  Phone: '',
  Role: 0,
  Image: '',
  Room: 0,
  LeaseType: 0,
  Rent: 0,
})

const leaserange = ref([dayjs(), dayjs().add(1, 'y')])
watch(leaserange, (newvalue, oldvalue) => {
  if (newvalue !== null) {
    mUserInfo.LeaseStart = leaserange.value[0]?.format('YYYY/MM/DD')
    mUserInfo.LeaseEnd = leaserange.value[1]?.format('YYYY/MM/DD')
  } else {
    mUserInfo.LeaseStart = null
    mUserInfo.LeaseEnd = null
  }
})

onMounted(async () => {
  await getUserInfo()
  await getRoomList()
})

const Initloading = ref<boolean>(false)
const changepassword_visable = ref<boolean>(false)
const getUserInfo = (): void => {
  Initloading.value = true

  api(`user/${userid}`, 'GET', null)
    .then((res: any) => {
      if (res) {
        origin_userinfo = { ...res }
        Object.assign(mUserInfo, res)
        leaserange.value = [
          dayjs(mUserInfo.LeaseStart),
          dayjs(mUserInfo.LeaseEnd),
        ]
      }
    })
    .catch((err: any) => {
      message.error(err)
    })
    .finally(() => {
      Initloading.value = false
    })
}
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

let validateName = async (_rule: Rule, value: string) => {
  if (value === origin_userinfo.Name) {
    return Promise.resolve()
  } else if (value === '') {
    return Promise.reject(t('edituser.validate_name_require'))
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
  Name: [{ required: true, validator: validateName, trigger: 'change' }],
  Phone: [{ required: false, validator: validatePhone, trigger: 'change' }],
  Email: [
    {
      required: false,
      type: 'email',
      validator: validateEmail,
      trigger: 'change',
    },
  ],
})

const layout = {
  wrapperCol: { md: { span: 20 }, xl: { span: 22 } },
}
const useForm = Form.useForm
const { validate, validateInfos } = useForm(mUserInfo, rules)

const onSubmit = () => {
  validate()
    .then(() => {
      console.log(mUserInfo.ID)
      api(`user/${mUserInfo.ID}`, 'PUT', mUserInfo)
        .then((res: any) => {
          if (res) {
            message.success(t('edituser.successedit'))
            getUserInfo()
          }
        })
        .catch((err: any) => {
          message.error(err)
        })
        .finally(() => {
          Initloading.value = false
        })
    })
    .catch((err) => {
      console.log('error', err)
    })
}
const updateimg_load = ref<boolean>(false)
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
  updateimg_load.value = true
  $CompressionImage(file.file, (newbase64) => {
    mUserInfo.Image = newbase64
    updateimg_load.value = false
  })
}

interface IChangePassword {
  CurrentPassword: string
  NewPassword: string
  ConfirmPassword: string
}
const InitChangePassword = reactive<IChangePassword>({
  CurrentPassword: '',
  NewPassword: '',
  ConfirmPassword: '',
})

const mChangePassword = reactive<IChangePassword>({ ...InitChangePassword })

const validateCurrentPassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject(t('edituser.validate_currentpassword_require'))
  } else if (!(await checkuserpassword(value))) {
    return Promise.reject(t('edituser.validate_currentpassword_error'))
  } else {
    return Promise.resolve()
  }
}
const checkuserpassword = async (value: string) => {
  let result: Boolean = false
  let senddata = { ID: mUserInfo.ID, Password: value }
  await api('user/checkUserPassword', 'POST', senddata)
    .then((res: any) => {
      result = res
    })
    .catch((err: any) => {
      message.error(err)
    })
  return result
}

const validateNewPassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject(t('edituser.validate_newpassword_require'))
  } else if (value === mChangePassword.CurrentPassword) {
    return Promise.reject(t('edituser.validate_newpassword_repeat'))
  } else {
    return Promise.resolve()
  }
}

const validateConfirmPassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject(t('edituser.validate_confirmpassword_require'))
  } else if (value !== mChangePassword.NewPassword) {
    return Promise.reject(t('edituser.validate_confirmpassword_error'))
  } else {
    return Promise.resolve()
  }
}

const rules_changepassword = reactive({
  CurrentPassword: [
    { required: true, validator: validateCurrentPassword, trigger: 'blur' },
  ],
  NewPassword: [
    { required: true, validator: validateNewPassword, trigger: 'blur' },
  ],
  ConfirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' },
  ],
})

const changepassword_close = () => {
  //reset mChangePassword
  Object.assign(mChangePassword, InitChangePassword)
}

const useFormChangePassword = Form.useForm
const validatechangepassord = useFormChangePassword(
  mChangePassword,
  rules_changepassword
)
const changepassword_load = ref<boolean>(false)
const onSubmitChangePassword = () => {
  changepassword_load.value = true
  validatechangepassord
    .validate()
    .then(() => {
      api(`user/changeUserPassword/${mUserInfo.ID}`, 'PUT', {
        newPassword: mChangePassword.NewPassword,
      })
        .then((res: any) => {
          if (res) {
            message.success(t('edituser.success_changepassword'))
            changepassword_visable.value = false
          }
        })
        .catch((err: any) => {
          message.error(err)
        })
    })
    .catch((err) => {
      //驗證失敗，錯誤訊息已顯示在畫面上，所以這邊不用做事
    })
    .finally(() => {
      changepassword_load.value = false
    })
}
</script>

<style lang="scss" scoped></style>
