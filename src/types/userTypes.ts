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
