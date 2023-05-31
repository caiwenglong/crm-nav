<script setup lang="ts">
import { TagsOutlined } from '@ant-design/icons-vue'
import { forEach, partition } from 'lodash-es'
import type { WebsiteCategory } from '~/type/website'
import { useWebsiteStore } from '~/stores/storeWebsite'

defineOptions({
  name: 'SiderMenu',
})
const websiteStore = useWebsiteStore()
const selectedKeys = ref<string[]>(['1'])
const categoryList = reactive<WebsiteCategory[]>([])

onMounted(async () => {
  await websiteStore.getWebsiteCategory()

  const categoryGroup = partition(websiteStore.websiteCategories, (item: WebsiteCategory) => {
    return item.parentID === '0'
  })

  categoryList.push(...categoryGroup[0])

  forEach(categoryList, (item: WebsiteCategory) => {
    forEach(categoryGroup[1], (child: WebsiteCategory) => {
      if (child.parentID === item.id) {
        if (!Array.isArray(item.children))
          item.children = []

        item.children.push(child)
      }
    })
  })
})

function handleMenuClick(e: any) {
  const element = document.getElementById(e.key)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth', // 定义过渡动画。其中一个auto或smooth。默认为auto.
      block: 'start', // 定义垂直对齐。一start，center，end，或 nearest。默认为start.
      inline: 'nearest', // 定义水平对齐方式。一start，center，end，或 nearest。默认为nearest.
    })
  }
}
</script>

<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="handleMenuClick">
    <template v-for="category in categoryList" :key="category.id">
      <template v-if="category.children?.length">
        <a-sub-menu :id="category.id" :key="category.id">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>
            {{ category.name }}
          </template>
          <a-menu-item v-for="subCategory in category.children" :key="subCategory.id">
            {{ subCategory.name }}
          </a-menu-item>
        </a-sub-menu>
      </template>
      <a-menu-item v-else :key="category.id">
        <TagsOutlined />
        <span>{{ category.name }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>
