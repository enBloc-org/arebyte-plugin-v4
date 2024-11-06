import type { PlasmoMessaging } from "@plasmohq/messaging"

import { projectDigestQueryString } from "~queries/projectDigestQuery"
import { CurrentProjectData, FullProject } from "~types/projectTypes"
import { UserSession } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"
import newStorage from "~utils/newStorage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const storage = newStorage()
  const userSession: UserSession = await storage.get(
    "arebyte-audience-session"
  )

  if (!userSession || userSession.project_id === 0) {
    const currentProjectResponse =
      await fetchStrapiContent<CurrentProjectData>(
        `api/current-project`
      )

    if (currentProjectResponse.error) {
      console.error(currentProjectResponse.error)
      res.send(currentProjectResponse)
    }

    const response = await fetchStrapiContent<FullProject>(
      `api/projects/${currentProjectResponse.data.id}?${projectDigestQueryString}`
    )
    if (response.error) {
      console.error(response.error)
      res.send(response)
    }
    console.log(response.data)
    res.send(response)
  }

  const response = await fetchStrapiContent<FullProject>(
    `api/projects/${userSession.project_id}?${projectDigestQueryString}`
  )
  if (response.error) {
    console.error(response.error)
    res.send(response)
  }
  console.log(response.data)
  res.send(response)
}

export default handler
