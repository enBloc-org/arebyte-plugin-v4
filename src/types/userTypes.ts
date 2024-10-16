import { BlocksContent } from "@strapi/blocks-react-renderer"

import type { ImageResponse } from "./imageTypes"

export interface User {
  id: number
  username: string
  email: string
  birth_date: string | null
  location: string | null
  audience_member: {
    is_quiet: boolean
    is_paused: boolean
    project_id: number
    current_index: number
    event_time: string
    playlist: number[]
  }
}
export interface ContentCreator {
  id: number
  curator_name: string
  curator_organisation: string
  organisation_logo: ImageResponse
  bio: BlocksContent
  upcoming_events: {
    id: number
    event_name: string
    event_location: string
    event_date: string
    event_link: string
  }[]
  social_media_links: {
    id: number
    platform:
      | "Facebook"
      | "Instagram"
      | "LinkedIn"
      | "X"
      | "Mastodon"
      | "Youtube"
    link_url: string
  }[]
}

export interface AuthData {
  jwt: string
  user: {
    blocked: boolean
    confirmed: boolean
    createdAt: string
    email: string
    id: number
    provider: string
    updatedAt: string
    username: string
  }
}
export interface UserSession {
  user: User
  jwt: string
}
