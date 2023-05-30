interface Website {
  category: string
  createdAt: string
  details: string
  introduction: string
  updatedAt: string
  websiteLink: string
  websiteName: string
  height: 50
  id: number
}

interface Grouped {
  [key: string]: Website[] // 以string类型为键，并且值为Person数组类型的对象
}

interface WebsiteDict {
  [key: string]: { [key: string]: Website }
}

interface WebsiteList {
  id: number
  category: string
  websites: Website[]
}

export type {
  WebsiteDict,
  Website,
  Grouped,
  WebsiteList,
}
