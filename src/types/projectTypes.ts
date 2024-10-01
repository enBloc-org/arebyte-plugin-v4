import type { BlocksContent } from "@strapi/blocks-react-renderer"

import type { EventResponse } from "./eventTypes"
import type { ImageResponse } from "./imageTypes"

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
  description: BlocksContent
  cover_image: ImageResponse
  launch_date: string
  events: EventResponse[]
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

export interface CurrentProjectResponse {
  data: Data & { event_time: string }
  meta: object
}
