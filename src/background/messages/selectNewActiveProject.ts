import type { PlasmoMessaging } from "@plasmohq/messaging"

import { User, UserSession } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"
import newStorage from "~utils/newStorage"
import updateStorage from "~utils/updateStorage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const storage = newStorage()
  const { selectedProjectId } = req.body

  const userSession: UserSession = await storage.get(
    "arebyte-audience-session"
  )

  const response = await fetchStrapiContent<User>(
    `api/users/${userSession.user.id}`,
    "PUT",
    userSession.jwt,
    JSON.stringify({
      project_id: selectedProjectId
    })
  )

  if (response.error) {
    console.log(response.error)
    res.send(false)
  }

  const newSession = updateStorage(userSession, {
    project_id: response.data.project_id
  })

  await storage.set("arebyte-audience-session", newSession)
  res.send(true)
}

export default handler
