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

export interface AuthResponse {
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

export interface UserResponse {
  data: User
  meta: object
}

export interface UserSession {
  user: User
  jwt: string
}
