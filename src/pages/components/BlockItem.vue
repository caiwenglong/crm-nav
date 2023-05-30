<script setup lang="ts">
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { Website } from '~/type/website'

defineProps({
  id: Number,
  category: String,
  source: {
    type: Object as () => Website[],
  },
})
</script>

<template>
  <div class="grid-wrapper">
    <div class="block-header">
      <a-typography-title :level="4" type="success">
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
              <a-card-meta :title="item.websiteName">
                <template #avatar>
                  <a-avatar src="https://joeschmoe.io/api/v1/random" />
                </template>
                <template #description>
                  {{ item.introduction }}
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
