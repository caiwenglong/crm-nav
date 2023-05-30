import $http from '~/utils/http'

export function getWebsiteList() {
  return $http({
    method: 'GET',
    url: '/website/all',
  })
}

export function getWebsiteCategory() {
  return $http({
    method: 'GET',
    url: '/website/category/all',
  })
}

export default {
  getWebsiteList,
}
