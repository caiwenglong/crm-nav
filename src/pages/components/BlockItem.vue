<script setup lang="ts">
import type { Website, WebsiteList } from '~/type/website'
import avatar from '~/images/avatar.png'

defineProps({
  id: String,
  category: String,
  source: {
    type: Object as () => Website[],
  },
  websiteList: {
    type: Array as () => WebsiteList[],
  },
  spinning: Boolean,
})

function handleGoWebsite(url: string): void {
  window.open(url)
}
</script>

<template>
  <a-spin class="h-full w-full" tip="Loading..." :spinning="spinning">
    <div class="item-content-wrapper">
      <div v-for="(target, index) in websiteList" :key="index">
        <div class="grid-wrapper">
          <div class="block-header">
            <a-typography-title :id="target.id" :level="4" type="success">
              {{ target.category }}
            </a-typography-title>
          </div>
          <div class="grid">
            <a-list class="w-full" :grid="{ gutter: 16, column: 4 }" :data-source="target.websites">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-card hoverable>
                    <!-- <template #actions>
                      <SettingOutlined key="setting" />
                      <EditOutlined key="edit" />
                      <EllipsisOutlined key="ellipsis" />
                    </template> -->
                    <a-card-meta>
                      <template #title>
                        <div @click="handleGoWebsite(item.websiteLink)">
                          {{ item.websiteName }}
                        </div>
                      </template>
                      <template #avatar>
                        <a-avatar :src="avatar" />
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
      </div>
    </div>
    <div class="anchor-link-wrapper">
      <a-anchor>
        <div v-for="(item, index) in websiteList" :key="index">
          <a-anchor-link :href="`#${item.id}`" :title="item.category" />
        </div>
      </a-anchor>
    </div>
  </a-spin>
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
.item-content-wrapper {
    padding-right: 180px;
}

.anchor-link-wrapper {
    position: fixed;
    transform: translate(30px, -50%);
    top: 50%;
    right: 80px;
}
</style>
