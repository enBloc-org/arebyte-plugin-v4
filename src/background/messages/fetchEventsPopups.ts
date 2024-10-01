import type { PlasmoMessaging } from "@plasmohq/messaging"

import { eventPopupQueryString } from "~queries/eventPopupsQuery"
import type { EventResponse } from "~types/eventTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<EventResponse>(
    `api/events/${req.body.id}?${eventPopupQueryString}`
  )
  res.send(response)
}

export default handler
