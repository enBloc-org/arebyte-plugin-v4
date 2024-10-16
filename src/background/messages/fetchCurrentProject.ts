import type { PlasmoMessaging } from "@plasmohq/messaging"

import { currentProjectQueryString } from "~queries/currentProjectQuery"
import type { CurrentProjectData } from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<CurrentProjectData>(
    `api/current-project?${currentProjectQueryString}`
  )
  res.send(response)
}

export default handler
