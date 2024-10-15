import type { BlocksContent } from "@strapi/blocks-react-renderer"

import type { EventResponse } from "./eventTypes"
import type { ImageResponse } from "./imageTypes"
import type { ContentCreator } from "./userTypes"

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
  events: Omit<EventResponse["data"], "pop_ups">[]
  content_creator: ContentCreator
}

export interface CurrentProjectData {
  id: number
  event_time: string
  project: ProjectData
}

export interface ProjectResponse {
  data: ProjectData
  meta: object
  error: string | null
}

export interface CurrentProjectResponse {
  data: CurrentProjectData
  meta: object
  error: string | null
}

export interface AllProjectResponse {
  data: Omit<
    ProjectData,
    "content_creator" | "events" | "description"
  >[]
  meta: object
  error: string | null
}
