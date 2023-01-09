<template>
  <a-radio-group v-model:value="locale" @change="changelang">
    <a-radio
      v-for="language in availableLocales"
      :key="language"
      :value="language"
      >{{ language }}</a-radio
    >
  </a-radio-group>
  <div class="mt-3 text-end">
    <a-button type="primary" @click="close">{{
      $t('button.confirm')
    }}</a-button>
  </div>
</template>

<script setup lang="ts">
import { globalstore } from '@/stores'
import { useI18n } from 'vue-i18n'

const store = globalstore()

const emit = defineEmits(['close'])
const close = () => {
  emit('close')
}

const { t, locale, availableLocales } = useI18n({ useScope: 'global' })
const changelang = () => {
  store.updatelang(locale.value)
}
</script>

<style lang="scss" scoped></style>
