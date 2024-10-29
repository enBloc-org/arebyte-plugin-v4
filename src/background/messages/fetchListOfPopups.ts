import type { PlasmoMessaging } from "@plasmohq/messaging"

import popupsListQuery from "~queries/popupsListQuery"
import type { Favourite } from "~types/eventTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { page, popupArray } = req.body
  const popupsQueryString = popupsListQuery(page, popupArray)

  const response = await fetchStrapiContent<Favourite[]>(
    `api/pop-ups?${popupsQueryString}`
  )

  if (response.error) {
    console.error(response.error)
    res.send(response)
  }

  res.send(response)
}

export default handler
