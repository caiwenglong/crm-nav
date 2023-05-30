<script lang="ts" setup>
import virtualProps from './props'
import { isNumber, isString } from '~/utils'

const props = defineProps(virtualProps)

const state = reactive<any>({
  start: 0,
  end: 20,
  scrollOffset: 0,
  cacheData: [],
})

const observerInstance = ref()

const getWrapperStyle = computed(() => {
  const { style, height, width } = props
  const styleObj = isString(style) ? JSON.parse(style) : { ...style }
  return {
    height: `${height}px`,
    width: isNumber(width) ? `${width}px` : width,
    ...styleObj,
  }
})

// 数据数量
const total = computed(() => {
  return props.data.length
})

// 总体高度
const getScreenTotalHeight = computed(() => {
  return unref(total) * props.itemHeight
})

const getInnerStyle = computed(() => {
  return {
    height: `${unref(getScreenTotalHeight)}px`,
    width: '100%',
  }
})

const getListStyle = computed(() => {
  return {
    willChange: 'transform',
    transform: `translateY(${state.scrollOffset}px)`,
  }
})

// 当前屏幕显示的数量
const clientCount = computed(() => {
  return Math.ceil(props.height / props.itemHeight)
})

// 当前屏幕显示的数据
const clientData = computed(() => {
  return props.data.slice(state.start, state.end)
})

function clearObserver() {
  nextTick(() => {
    unref(observerInstance)?.unobserve(document.getElementById('_top'))
    unref(observerInstance)?.unobserve(document.getElementById('_bottom'))
  })
}

function observerCallback(entries: any[]) {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting && entry.target.id === '_bottom') {
      state.end = Math.min(state.end + unref(clientCount), unref(total))
      state.start = Math.max(state.end - unref(clientCount) * 2, 0)
      state.scrollOffset = state.start * props.itemHeight
    }

    if (entry.isIntersecting && entry.target.id === '_top') {
      state.end = state.end === 20 ? 20 : state.end - 10 > 20 ? state.end - 10 : 20
      state.start = state.start === 0 ? 0 : state.start - 10 > 0 ? state.start - 10 : 0
    }
    state.scrollOffset = state.start * props.itemHeight
  })
}

function initObserver() {
  if (unref(total) < unref(clientCount))
    return

  observerInstance.value = new IntersectionObserver(observerCallback, { threshold: 0.1 })

  nextTick(() => {
    unref(observerInstance).observe(document.getElementById('_top'))
    unref(observerInstance).observe(document.getElementById('_bottom'))
  })
}

watch(
  () => state.end,
  () => {
    clearObserver()
    initObserver()
  },
  { immediate: true },
)
</script>

<template>
  <div class="base-virtual-wrapper" :class="[className]" :style="getWrapperStyle">
    <div class="base-virtual-inner" :style="getInnerStyle">
      <div class="base-virtual-list" :style="getListStyle">
        <div
          v-for="(item, index) in clientData"
          :id="index === clientData.length - 1 ? '_bottom' : index === 0 ? '_top' : ''"
          :key="index + state.start"
        >
          <slot name="default" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-virtual-wrapper {
    position: relative;
    overflow-y: auto;
}
</style>
