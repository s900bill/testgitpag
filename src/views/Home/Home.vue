<template>
  <Home_Manager v-if="ismanager"></Home_Manager>
  <Home_User v-else></Home_User>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { globalstore } from '@/stores'

import Home_Manager from './Home_Manager/Main.vue'
import Home_User from './Home_User/Main.vue'

const store = globalstore()
const { ismanager } = storeToRefs(store)
</script>

<style lang="scss" scoped></style>
