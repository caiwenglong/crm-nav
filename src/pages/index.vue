<script setup lang="ts">
import { forIn, groupBy } from 'lodash'
import { onMounted } from 'vue'
import BlockItem from './components/BlockItem.vue'
import { useWebsiteStore } from '~/stores/storeWebsite'
import type { Website, WebsiteList } from '~/type/website'

defineOptions({
  name: 'IndexPage',
})
const spinning = ref(false)
const website = useWebsiteStore()
const targetOffset = ref<number | undefined>(undefined)

targetOffset.value = window.innerHeight / 2

const websiteList = reactive<WebsiteList[]>([])
async function handleGetWebsiteList() {
  spinning.value = true
  const result = await website.aGetWebsiteList()
  const data = result.data

  if (data && data.length) {
    const group = groupBy(data, 'category')
    forIn(group, (value: Array<Website>, key: string) => {
      websiteList.push(
        reactive({
          id: value[0].categoryID,
          category: key,
          websites: value as Website[],
        }),
      )
    })
  }
  spinning.value = false
}

onMounted(() => {
  handleGetWebsiteList()
})
</script>

<template>
  <!-- <base-virtual-list :data="websiteList" :item-height="50" dynamic>
    <template #default="{ item }">
      <BlockItem :id="item.id" :category="item.category" :source="item.websites" />
    </template>
  </base-virtual-list> -->
  <div class="home-content h-full">
    <BlockItem :website-list="websiteList" :spinning="spinning" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style scoped lang="scss">
.home-content {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
