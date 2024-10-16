import type { PlasmoMessaging } from "@plasmohq/messaging"

import { allProjectQueryString } from "~queries/allProjectsQuery"
import type { AllProjectResponse } from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<AllProjectResponse>(
    `api/projects?${allProjectQueryString}`
  )
  res.send(response)
}

export default handler
