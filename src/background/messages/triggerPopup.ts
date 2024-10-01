import type { PlasmoMessaging } from "@plasmohq/messaging"

import { eventPopupQueryString } from "~queries/eventPopupsQuery"
import type { EventResponse } from "~types/eventTypes"
import backgroundPopupCreate from "~utils/backgroundPopCreate"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { data } = await fetchStrapiContent<EventResponse>(
    `api/events/${req.body.id}?${eventPopupQueryString}`
  )

  backgroundPopupCreate(data.pop_ups)
  res.send("success!")
}

export default handler
