import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { AuthData } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const data = await fetchStrapiContent<AuthData>(
    `api/auth/local`,
    "POST",
    undefined,
    req.body
  )
  res.send(data)
}

export default handler
