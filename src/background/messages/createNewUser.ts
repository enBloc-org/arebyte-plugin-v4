import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { AuthData } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  // Register new user and add audience member relation
  const response = await fetchStrapiContent<AuthData>(
    `api/auth/local/register`,
    "POST",
    undefined,
    JSON.stringify({
      ...req.body,
      event_time: "12:00:00.000"
    })
  )

  if (response.error) {
    console.log(response.error)
    res.send(response)
  }

  res.send(response)
}

export default handler
