<template>
  <div class="text-center vstack gap-3 py-5 px-2 position-relative">
    <a-tag
      v-if="prop.userinfo.Role === 1"
      class="bg-custom-01 position-absolute start-0 top-0 fs-7"
    >
      {{ $t('userrole.manager') }}</a-tag
    >
    <div class="mx-auto">
      <a-avatar
        :src="prop.userinfo.Image"
        :size="100"
        shape="square"
        class="rounded-2"
      >
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>

      <!-- <a-avatar :size="40"
                class="icon-pencil position-absolute end-0 bottom-0  rounded-circle bg-secondary  cursor-pointer bg-hover"
                @click="edituser" /> -->
      <!-- <span class="bi-search position-absolute end-0 bottom-0  rounded-circle bg-secondary "></span> -->
    </div>
    <div class="fw-bold fs-4">{{ prop.userinfo.Name }}</div>
    <div class="text-secondary">{{ prop.userinfo.Description }}</div>
    <div class="d-flex justify-content-center gap-1 text-secondary">
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ prop.userinfo.Phone }}</span>
        </template>
        <span class="icon-phone"></span>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ prop.userinfo.Email }}</span>
        </template>
        <span class="icon-envelope-o"></span>
      </a-tooltip>
    </div>
    <div
      class="d-block text-truncate text-secondary mx-auto"
      style="max-width: 250px"
    >
      {{ prop.userinfo.UserGroup?.map((x) => x.Name).join('&nbsp;&nbsp;') }}
    </div>
    <a-button :block="true" shape="round" type="primary" @click="edituser">
      <template #icon>
        <span class="bi-pencil me-1"></span>
      </template>
      {{ $t('userdetail.edit') }}
    </a-button>
    <a-button
      :block="true"
      shape="round"
      type="danger"
      @click="confirmdelete(prop.userinfo)"
    >
      <template #icon>
        <span class="bi-trash me-1"></span>
      </template>
      {{ $t('userdetail.delete') }}
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { createVNode } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/network'
import { IUserInfo } from '@/interface'
import { useI18n } from 'vue-i18n'

import { message, Modal } from 'ant-design-vue'
import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

const { t } = useI18n()
const prop = defineProps(['userinfo'])
const emit = defineEmits(['update'])
const router = useRouter()

const edituser = () => {
  router.push({ name: 'EditUser', query: { id: prop.userinfo.ID } })
}

const confirmdelete = (user: IUserInfo) => {
  Modal.confirm({
    title: t('userdetail.delete_title', { n: user.Name }),
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      return new Promise((resolve, reject) => {
        api(`user/${user.ID}`, 'DELETE', null)
          .then((res: any) => {
            if (res) {
              emit('update')
              resolve(null)
            }
          })
          .catch((err: any) => {
            message.error(err)
            reject(err)
          })
      })
    },
  })
}
</script>

<style lang="scss" scoped></style>
