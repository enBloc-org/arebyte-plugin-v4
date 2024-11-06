import type { PlasmoMessaging } from "@plasmohq/messaging"

import { projectDigestQueryString } from "~queries/projectDigestQuery"
import { FullProject } from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<FullProject>(
    `api/projects/5?${projectDigestQueryString}`
  )
  if (response.error) {
    console.error(response.error)
    res.send(response)
  }
  console.log(response.data)
  res.send(response)
}

export default handler
