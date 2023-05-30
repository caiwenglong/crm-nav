import { defineStore } from 'pinia'
import { getWebsiteList } from '~/api/apiWebsite'

export const useWebsiteStore = defineStore('websiteStore', {
  state: () => {
    return {
      code: 0,
      massage: '',
      websiteList: Array,
    }
  },
  actions: {
    async aGetWebsiteList() {
      return await getWebsiteList()
    },
  },
})
