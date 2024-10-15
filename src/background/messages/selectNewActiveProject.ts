import type { PlasmoMessaging } from "@plasmohq/messaging"

import { AudienceMemberResponse, UserSession } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"
import newStorage from "~utils/newStorage"
import updateStorage from "~utils/updateStorage"

const handler: PlasmoMessaging.MessageHandler = async req => {
  const storage = newStorage()
  const { selectedProjectId } = req.body

  const userSession: UserSession = await storage.get(
    "arebyte-audience-session"
  )

  const response = await fetchStrapiContent<AudienceMemberResponse>(
    `api/audience-members/${userSession.user.id}`,
    "PUT",
    userSession.jwt,
    JSON.stringify({
      ...userSession.user.audience_member,
      project_id: selectedProjectId
    })
  )

  const newSession = updateStorage(userSession, {
    project_id: response.data.project_id
  })

  await storage.set("arebyte-audience-session", newSession)

  console.log(response)
}

export default handler
