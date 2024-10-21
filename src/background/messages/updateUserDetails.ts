import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { User, UserSession } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"
import newStorage from "~utils/newStorage"
import updateStorage from "~utils/updateStorage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const storage = newStorage()
  const userSession: UserSession = await storage.get(
    "arebyte-audience-session"
  )
  const newDetails = req.body

  const response = await fetchStrapiContent<User>(
    `api/users/${userSession.id}`,
    "PUT",
    userSession.jwt,
    JSON.stringify({
      ...newDetails
    })
  )

  if (response.error) {
    console.error(response.error)
  }

  const newSession = updateStorage(userSession, {
    id: response.data.id,
    event_time: response.data.event_time,
    project_id: response.data.project_id,
    current_index: response.data.current_index
  })
  await storage.set("arebyte-audience-session", newSession)
  res.send(response)
}

export default handler
