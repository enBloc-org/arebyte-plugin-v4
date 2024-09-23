// types
import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { ProjectResponse } from "~types/projectTypes"
//utils
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<ProjectResponse>(
    "api/current-project?populate=*"
  )
  console.log("Hi from message API!")
  res.send(response)
}

export default handler
