import type { PlasmoMessaging } from "@plasmohq/messaging"

import { projectQueryString } from "~queries/projectQuery"
import { ProjectData } from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<ProjectData>(
    `api/projects/5?${projectQueryString}`
  )
  if (response.error) {
    console.error(response.error)
    res.send(response)
  }

  res.send(response)
}

export default handler
