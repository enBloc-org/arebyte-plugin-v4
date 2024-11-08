import { type PlasmoMessaging } from "@plasmohq/messaging"

import { eventDigestQueryString } from "~queries/eventDigestQuery"
import { FullProject } from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"
import generatePagination from "~utils/generatePagination"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { digestCounter, projectId } = req.body
  const { pageNumber, pageSize } = generatePagination(digestCounter)
  const newQuery = eventDigestQueryString(
    pageNumber,
    pageSize,
    projectId
  )

  const response = await fetchStrapiContent<FullProject>(
    `api/events?${newQuery}`
  )
  if (response.error) {
    console.error(response.error)
    res.send(response)
  }

  res.send(response)
}

export default handler
