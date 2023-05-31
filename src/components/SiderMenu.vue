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
</script>

<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <template v-for="category in categoryList" :key="category.id">
      <template v-if="category.children?.length">
        <a-sub-menu :key="category.id">
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
      <a-menu-item v-else>
        <TagsOutlined />
        <span>{{ category.name }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>
