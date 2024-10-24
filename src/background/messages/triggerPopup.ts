import type { PlasmoMessaging } from "@plasmohq/messaging"

import { eventPopupQueryString } from "~queries/eventPopupsQuery"
import type { EventData } from "~types/eventTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"
import backgroundPopupCreate from "~utils/popup-utils/backgroundPopCreate"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { data } = await fetchStrapiContent<EventData>(
    `api/events/${req.body.id}?${eventPopupQueryString}`
  )
  backgroundPopupCreate(data.pop_ups)
  res.send("success!")
}

export default handler
