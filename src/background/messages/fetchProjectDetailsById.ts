import type { PlasmoMessaging } from "@plasmohq/messaging"

import { projectQueryString } from "~queries/projectQuery"
import type { ProjectResponse } from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<ProjectResponse>(
    `api/projects/${req.body.id}?${projectQueryString}`
  )
  res.send(response)
}

export default handler
