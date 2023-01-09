<template>
  <div>
    <div class="hstack gap-1 mb-5">
      <a-avatar
        :src="userinfo.Image"
        :size="120"
        shape="square"
        class="me-3 ms-1"
        style="border-radius: 2.5rem"
      >
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <div class="vstack gap-2 my-auto">
        <div class="hstack gap-1">
          <span class="fs-4 fw-bolder" style="letter-spacing: 0.2rem">{{
            userinfo.Name
          }}</span>
        </div>
        <div class="text-secondary">{{ userinfo.Description }}</div>
      </div>
    </div>

    <div class="container-fluid mb-3 g-0">
      <div class="row g-3">
        <div class="col-xl-5 vstack gap-3">
          <a-card style="height: 300px">
            <LeaseInfo></LeaseInfo>
          </a-card>
          <a-card style="height: 300px">
            <Payment></Payment>
          </a-card>
        </div>
        <div class="col-xl-7 vstack gap-3">
          <a-card style="height: 500px">
            <Announcement></Announcement>
          </a-card>
          <a-card style="height: 100px">
            <ContactLandlord></ContactLandlord>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { globalstore } from '@/stores'
import { UserOutlined } from '@ant-design/icons-vue'

import LeaseInfo from './LeaseInfo.vue'
import Payment from './Payment.vue'
import Announcement from './Announcement.vue'
import ContactLandlord from './ContactLandlord.vue'

const store = globalstore()
const { userinfo } = storeToRefs(store)
</script>

<style lang="scss" scoped></style>
