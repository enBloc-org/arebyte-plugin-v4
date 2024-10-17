import type { PlasmoMessaging } from "@plasmohq/messaging"

import { AudienceMemberQueryString } from "~queries/audienceMemberQuery"
import type {
  AudienceMember,
  AuthData,
  UserSession
} from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  // Create new audience member and git id to connect to new user
  const { data: audienceData, error: audienceError } =
    await fetchStrapiContent<AudienceMember>(
      `api/audience-members?${AudienceMemberQueryString}`,
      "POST",
      undefined,
      JSON.stringify({
        project_id: 0,
        is_quiet_mode: false,
        is_paused: false,
        event_time: "12:00:00:000"
      })
    )

  if (audienceError) {
    console.log(audienceError)
    res.send(false)
  }

  // Register new user and add audience member relation
  const response = await fetchStrapiContent<AuthData>(
    `api/auth/local/register`,
    "POST",
    undefined,
    JSON.stringify({
      ...req.body,
      audience_member: audienceData.id
    })
  )

  if (response.error) {
    console.log(response.error)
    res.send(response.error)
  }
  interface UserSessionWithError extends UserSession {
    error: string
  }
  const userSession: UserSessionWithError = {
    user: {
      ...response.data.user,
      audience_member: {
        is_quiet: audienceData.is_quiet,
        is_paused: audienceData.is_quiet,
        project_id: audienceData.project_id,
        current_index: audienceData.current_index,
        event_time: audienceData.event_time,
        playlist: []
      }
    },
    jwt: response.data.jwt,
    error: response.error
  }

  res.send(userSession)
}

export default handler
