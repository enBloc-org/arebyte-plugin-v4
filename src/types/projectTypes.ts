export interface ProjectDescription {
  type: string
  children: Array<{
    type: string
    text: string
  }>
}

export interface ProjectAttributes {
  title: string
  description: ProjectDescription[]
  launch_date: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ProjectData {
  id: number
  attributes: ProjectAttributes
}

export interface Data {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt: string
    project: {
      data: ProjectData
    }
  }
}

export interface ProjectResponse {
  data: Data
  meta: object
}
