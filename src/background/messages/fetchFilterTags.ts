import type { PlasmoMessaging } from "@plasmohq/messaging"

import { filterTabsQueryString } from "~queries/filterTabsQuery"
import { TagData } from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<TagData>(
    `api/tags?${filterTabsQueryString}`
  )
  res.send(response)
}

export default handler
