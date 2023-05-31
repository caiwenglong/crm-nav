<script setup lang="ts">
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { Website } from '~/type/website'

defineProps({
  id: String,
  category: String,
  source: {
    type: Object as () => Website[],
  },
})

function handleGoWebsite(url: string): void {
  window.open(url)
}
</script>

<template>
  <div class="grid-wrapper">
    <div class="block-header">
      <a-typography-title :id="id" :level="4" type="success">
        {{ category }}
      </a-typography-title>
    </div>
    <div class="grid">
      <a-list class="w-full" :grid="{ gutter: 16, column: 4 }" :data-source="source">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-card hoverable>
              <template #actions>
                <SettingOutlined key="setting" />
                <EditOutlined key="edit" />
                <EllipsisOutlined key="ellipsis" />
              </template>
              <a-card-meta>
                <template #title>
                  <div @click="handleGoWebsite(item.websiteLink)">
                    {{ item.websiteName }}
                  </div>
                </template>
                <template #avatar>
                  <a-avatar src="https://joeschmoe.io/api/v1/random" />
                </template>
                <template #description>
                  <a-tooltip placement="topLeft" :title="item.introduction">
                    {{ item.introduction }}
                  </a-tooltip>
                </template>
              </a-card-meta>
              <!-- {{ item.introduction }} -->
            </a-card>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.ant-card-meta-description) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 177px;
}
:deep(.ant-col) {
    padding: 0 !important;
}

:deep(.ant-row > div) {
  padding-left: 8px;
  padding-right: 8px
}
</style>
