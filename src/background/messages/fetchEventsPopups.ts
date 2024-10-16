import type { PlasmoMessaging } from "@plasmohq/messaging"

import { eventPopupQueryString } from "~queries/eventPopupsQuery"
import type { EventData } from "~types/eventTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<EventData>(
    `api/events/${req.body.id}?${eventPopupQueryString}`
  )
  res.send(response)
}

export default handler
