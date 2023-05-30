<script lang="ts">
import {
  TagsOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useWebsiteStore } from '~/stores/storeWebsite'
import type { WebsiteCategory } from '~/type/website'

const websiteStore = useWebsiteStore()
const categoryList = reactive<WebsiteCategory[]>([])
export default defineComponent({
  components: {
    TagsOutlined,
  },
  setup() {
    onMounted(async () => {
      await websiteStore.getWebsiteCategory()
      websiteStore.websiteCategories.forEach((item) => {
        categoryList.push(item)
      })
    })

    return {
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
      categoryList,
    }
  },

})
</script>

<template>
  <a-layout class="h-full">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="category in categoryList" :key="category.id">
          <TagsOutlined />
          <span>{{ category.name }}</span>
        </a-menu-item>
      </a-menu>
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
