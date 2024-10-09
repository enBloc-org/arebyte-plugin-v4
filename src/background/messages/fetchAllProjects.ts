import type { PlasmoMessaging } from "@plasmohq/messaging"

import { allProjectQueryString } from "~queries/allProjectsQuery"
import type { CurrentProjectResponse } from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<CurrentProjectResponse>(
    `api/projects?${allProjectQueryString}`
  )
  console.log("====================================")
  console.log(allProjectQueryString)
  console.log("====================================")
  res.send(response)
}

export default handler
