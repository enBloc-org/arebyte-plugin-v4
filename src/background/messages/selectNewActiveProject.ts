import type { PlasmoMessaging } from "@plasmohq/messaging"

import { User, UserSession } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"
import newStorage from "~utils/newStorage"

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
        project_id: selectedProjectId,
        current_index: 0,
        digest_counter: 0
      })
    )
  if (error) {
    console.error(error)
    res.send(false)
  }

  res.send({
    project_id: data.project_id,
    current_index: data.current_index
  })
}

export default handler
