export interface ProjectDescription {
  type: string
  children: Array<{
    type: string
    text: string
  }>
}
export interface ProjectData {
  id: number
  title: string
  description: ProjectDescription[]
  launch_date: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Data {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  project: ProjectData
}

export interface ProjectResponse {
  data: Data
  meta: object
}
