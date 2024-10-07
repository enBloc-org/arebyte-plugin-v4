import { BlocksContent } from "@strapi/blocks-react-renderer"

export interface User {
  id: number
  username: string
  email: string
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
  artist_name: string
  bio: BlocksContent
  upcoming_events: {
    id: number
    event_name: string
    event_location: string
    event_date: string
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
