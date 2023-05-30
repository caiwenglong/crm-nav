import $http from '~/utils/http'

export function getWebsiteList() {
  return $http({
    method: 'GET',
    url: '/website/all',
  })
}

export default {
  getWebsiteList,
}
