import type { PlasmoMessaging } from "@plasmohq/messaging"

import type {
  AuthResponse,
  User,
  UserSession
} from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const authData = await fetchStrapiContent<AuthResponse>(
    `api/auth/local`,
    "POST",
    undefined,
    req.body
  )

  const userData = await fetchStrapiContent<User>(
    `api/audience-members/${authData.user.id}`,
    "GET",
    authData.jwt
  )

  const response: UserSession = {
    jwt: authData.jwt,
    id: authData.user.id,
    event_time: userData.audience_member.event_time,
    project_id: userData.audience_member.project_id,
    current_index: userData.audience_member.current_index,
    is_paused: userData.audience_member.is_paused,
    is_quiet: userData.audience_member.is_quiet
  }

  res.send(response)
}

export default handler
