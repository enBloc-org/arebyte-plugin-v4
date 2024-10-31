import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { AuthData } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<AuthData>(
    `api/auth/local`,
    "POST",
    undefined,
    req.body
  )

  if (response.error) {
    console.log(response.error)
    res.send(response)
  }

  res.send(response)
}

export default handler
