import type { BlocksContent } from "@strapi/blocks-react-renderer"

import type { ImageResponse } from "./imageTypes"

export interface EventData {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  pop_ups: Popup[]
}

export interface PopupContent {
  id: number
  description: BlocksContent
  media: ImageResponse
}

export interface Popup {
  id: number
  work_title: string
  popup_size: string
  popup_position: string
  external_link: string | null
  artist_name: string
  creation_date: string
  medium: string
  createdAt: string
  updatedAt: string
  popup_content: PopupContent[]
}
