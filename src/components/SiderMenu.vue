<script setup lang="ts">
import { TagsOutlined } from '@ant-design/icons-vue'
import { forEach, partition, sortBy } from 'lodash-es'
import type { WebsiteCategory } from '~/type/website'
import { useWebsiteStore } from '~/stores/storeWebsite'

defineOptions({
  name: 'SiderMenu',
})
const websiteStore = useWebsiteStore()
const selectedKeys = ref<string[]>(['1'])
const categoryList = reactive<WebsiteCategory[]>([])

const router = useRouter()

onMounted(async () => {
  await websiteStore.getWebsiteCategory()
  const sortedArr = sortBy(websiteStore.websiteCategories, (item: WebsiteCategory) => {
    return item.order
  })
  const categoryGroup = partition(sortedArr, (item: WebsiteCategory) => {
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
  const elementText = e.domEvent.target.innerText

  if (elementText === '首页')
    router.push('/')

  else
    router.push(`/category/${encodeURIComponent(e.key)}`)
}
</script>

<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="handleMenuClick">
    <template v-for="category in categoryList" :key="category.id">
      <template v-if="category.children?.length">
        <a-sub-menu :id="category.id" :key="category.id">
          <template #icon>
            <TagsOutlined />
          </template>
          <template #title>
            {{ category.name }}
          </template>
          <a-menu-item v-for="subCategory in category.children" :key="subCategory.id">
            <template #icon>
              <TagsOutlined />
            </template>
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
