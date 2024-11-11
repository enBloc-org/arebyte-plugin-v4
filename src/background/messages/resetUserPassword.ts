import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { AuthData, UserSession } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"
import newStorage from "~utils/newStorage"
import updateStorage from "~utils/updateStorage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const storage = newStorage()
  const userSession: UserSession = await storage.get(
    "arebyte-audience-session"
  )

  console.log(userSession)

  const response = await fetchStrapiContent<AuthData>(
    `api/auth/change-password`,
    "POST",
    userSession.jwt,
    JSON.stringify({
      ...req.body
    })
  )

  if (response.error) {
    console.log(response.error)
    res.send(response)
  }

  const newSession = updateStorage(userSession, {
    jwt: response.data.jwt
  })
  await storage.set("arebyte-audience-session", newSession)

  res.send(response)
}

export default handler
