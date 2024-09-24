// types
import type { PlasmoMessaging } from "@plasmohq/messaging"

import { currentProjectQueryString } from "~queries/currentProjectQuery"
import type { ProjectResponse } from "~types/projectTypes"
//utils
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<ProjectResponse>(
    `api/current-project?${currentProjectQueryString}`
  )
  res.send(response)
}

export default handler
