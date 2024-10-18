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

  const { data, error }: { data: User; error: string | null } =
    await fetchStrapiContent<User>(
      `api/users/${userSession.id}`,
      "PUT",
      userSession.jwt,
      JSON.stringify({
        project_id: selectedProjectId
      })
    )
  if (error) {
    console.error(error)
    res.send(false)
  }

  const newSession = updateStorage(userSession, {
    project_id: data.project_id
  })

  await storage.set("arebyte-audience-session", newSession)
  res.send(true)
}

export default handler
