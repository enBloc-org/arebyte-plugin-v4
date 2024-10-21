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

  const { data, error }: { data: User; error: string | null } =
    await fetchStrapiContent<User>(
      `api/users/${userSession.id}`,
      "PUT",
      userSession.jwt,
      JSON.stringify({
        ...newDetails
      })
    )

  if (error) {
    console.error(error)
    res.send(error)
  }

  const newSession = updateStorage(userSession, {
    id: data.id,
    event_time: data.event_time,
    project_id: data.project_id,
    current_index: data.current_index
  })
  await storage.set("arebyte-audience-session", newSession)
  res.send(data)
}

export default handler
