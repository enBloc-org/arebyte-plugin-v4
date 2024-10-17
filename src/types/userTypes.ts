import { BlocksContent } from "@strapi/blocks-react-renderer"

import type { ImageResponse } from "./imageTypes"

export interface User {
  id: number
  username: string
  email: string
  birth_date: string | null
  location: string | null
  audience_member: Omit<UserAudienceMember, "id">
}

export interface AudienceMember {
  id: number
  is_quiet: boolean
  is_paused: boolean
  project_id: number
  current_index: number
  event_time: string
}

export interface UserAudienceMember extends AudienceMember {
  playlist: number[]
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
  user: Omit<User, "audience_member">
}
export interface UserSession {
  user: User
  jwt: string
}
