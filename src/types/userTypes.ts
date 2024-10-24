import { BlocksContent } from "@strapi/blocks-react-renderer"

import type { Favourite, Popup } from "./eventTypes"
import type { ImageResponse } from "./imageTypes"

export interface User {
  id: number
  username: string
  email: string
  event_time: string
  project_id: number
  current_index: number
  is_paused: boolean
  birth_date: string | null
  location: string | null
  favourites: Popup[]
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
  user: User
  jwt: string
}
export interface UserSession
  extends Pick<
    User,
    "event_time" | "project_id" | "current_index" | "id"
  > {
  jwt: string
}

export interface UserFavourites {
  id: number
  favourites: Array<Favourite>
}
