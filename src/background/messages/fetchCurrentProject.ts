// types
import type { PlasmoMessaging } from "@plasmohq/messaging"

import { currentProjectQueryString } from "~queries/currentProjectQuery"
import type { CurrentProjectResponse } from "~types/projectTypes"
//utils
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<CurrentProjectResponse>(
    `api/current-project?${currentProjectQueryString}`
  )
  res.send(response)
}

export default handler
