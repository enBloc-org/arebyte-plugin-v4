import type { PlasmoMessaging } from "@plasmohq/messaging"

// import { Storage } from "@plasmohq/storage"

import { eventPopupQueryString } from "~queries/eventPopupsQuery"
import type { EventResponse } from "~types/eventTypes"
import backgroundPopupCreate from "~utils/backgroundPopCreate"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  // const storage = new Storage()
  console.log(eventPopupQueryString)

  const { data } = await fetchStrapiContent<EventResponse>(
    `api/events/${req.body.id}?${eventPopupQueryString}`
  )

  // await storage.set("popups", data.pop_ups)

  console.log("====================================")
  console.log(data)
  console.log("====================================")
  backgroundPopupCreate(data.pop_ups)
  res.send("success!")
}

export default handler
