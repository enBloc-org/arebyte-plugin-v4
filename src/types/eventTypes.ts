import type { BlocksContent } from "@strapi/blocks-react-renderer"

import type { ImageResponse, VideoResponse } from "./imageTypes"

export interface EventData {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  pop_ups: Popup[]
}

export interface MediaContent {
  id: number
  __component: "piece.piece"
  description: BlocksContent
  media: ImageResponse | VideoResponse
}

export interface TextContent {
  id: number
  __component: "piece.text-content"
  text_content: BlocksContent
  description: BlocksContent
}

export interface Popup {
  id: number
  work_title: string
  popup_size: "Small" | "Medium" | "Large"
  popup_position: string
  external_link: string | null
  artist_name: string
  creation_date: string
  medium: string
  createdAt: string
  updatedAt: string
  popup_content: Array<MediaContent | TextContent>
  thumbnail_image: {
    formats: {
      thumbnail: {
        url: string
      }
    }
  }
}

export interface SlimPopup {
  type: "text" | "image" | "video"
  index: number
  popupInfo: Pick<
    Popup,
    | "artist_name"
    | "medium"
    | "work_title"
    | "creation_date"
    | "external_link"
  >
  width: number
  height: number
  top: number
  left: number
  url?: string
  alt?: string
  description: BlocksContent
  text_content?: BlocksContent
  thumbnail_image: {
    formats: {
      thumbnail: {
        url: string
      }
    }
  }
}
