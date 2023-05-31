<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      collapsed: ref<boolean>(false),
    }
  },

})
</script>

<template>
  <a-layout class="h-full">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible :style="{ overflow: 'auto', height: '100vh' }">
      <div class="logo" />
      <SiderMenu />
    </a-layout-sider>
    <a-layout>
      <!-- <a-layout-header style="background: #fff; padding: 0">
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header> -->
      <a-layout-content class="h-full w-full">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
:deep(.ant-layout) {
  padding: 20px;
  width: calc(100% - 200px)
}
.ant-layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.ant-layout .trigger:hover {
  color: #1890ff;
}

.ant-layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
