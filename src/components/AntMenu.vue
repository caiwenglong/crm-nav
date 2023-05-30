<script setup>
defineOptions({
  name: 'AntMenu',
})
</script>

<template>
  <div class="wdight-menu">
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="handleClick">
      <a-menu-item key="1">
        <UserOutlined />
        <span>nav 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <VideoCameraOutlined />
        <span>nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <UploadOutlined />
        <span>nav 3</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>
