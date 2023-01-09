<template>
  <a-result status="404" :title="$t('404.title')" :sub-title="$t('404.info')">
    <template #extra>
      <a-button
        type="primary"
        @click="
          () => {
            router.push({ name: 'Home' })
          }
        "
        >{{ $t('404.backhome') }}</a-button
      >
    </template>
  </a-result>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped></style>
