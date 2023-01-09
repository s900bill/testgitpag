<template>
  <a-sub-menu :key="menuInfo.key">
    <template #icon>
      <span
        class="fs-4"
        :class="menuInfo.icon"
        :style="collapsed ? '  margin-left:-10px ;' : ''"
        style="transition: 0.3s; transition-property: margin-left"
      ></span
    ></template>
    <template #title>{{ $t(menuInfo.title) }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <template #icon>
            <i :class="item.icon" class="fs-5"></i>
          </template>

          {{ $t(item.title) }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.key" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts">
defineProps({
  menuInfo: {
    type: Object,
    default: () => ({}),
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped></style>
