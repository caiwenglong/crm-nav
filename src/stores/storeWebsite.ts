import { defineStore } from 'pinia'
import { getWebsiteCategory, getWebsiteList } from '~/api/apiWebsite'

export const useWebsiteStore = defineStore('websiteStore', {
  state: () => {
    return {
      code: 0,
      massage: '',
      websiteList: Array,
      websiteCategories: [],
    }
  },
  actions: {
    async aGetWebsiteList() {
      return await getWebsiteList()
    },
    async getWebsiteCategory() {
      const categoryList = await getWebsiteCategory()
      this.websiteCategories = categoryList.data ? categoryList.data : []
    },
  },
})
