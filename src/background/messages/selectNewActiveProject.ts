import type { PlasmoMessaging } from "@plasmohq/messaging"

import { User, UserSession } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"
import newStorage from "~utils/newStorage"
import updateStorage from "~utils/updateStorage"

const handler: PlasmoMessaging.MessageHandler = async req => {
  const storage = newStorage()
  const { selectedProjectId } = req.body

  const userSession: UserSession = await storage.get(
    "arebyte-audience-session"
  )

  const response = await fetchStrapiContent<User["audience_member"]>(
    `api/audience-members/${userSession.user.id}`,
    "PUT",
    userSession.jwt,
    JSON.stringify({
      ...userSession.user.audience_member,
      project_id: selectedProjectId
    })
  )

  if (response.error) console.log(response.error)

  const newSession = updateStorage(userSession, {
    project_id: response.data.project_id
  })

  await storage.set("arebyte-audience-session", newSession)
}

export default handler
