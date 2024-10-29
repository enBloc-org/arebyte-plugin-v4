import type { PlasmoMessaging } from "@plasmohq/messaging"

import { filterTabsQueryString } from "~queries/filterTabsQuery"
import { TagsData } from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<TagsData>(
    `api/tags?${filterTabsQueryString}`
  )
  res.send(response)
}

export default handler
