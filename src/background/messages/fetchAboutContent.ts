import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { AboutPage } from "~types/baseTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response =
    await fetchStrapiContent<AboutPage>(`api/about-page`)

  if (response.error) {
    console.error(response.error)
    res.send(response)
  }

  res.send(response)
}

export default handler
