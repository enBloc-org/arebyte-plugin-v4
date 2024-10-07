import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { User } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { jwt, id } = req.body

  const data = await fetchStrapiContent<User>(
    `api/audience-members/${id}`,
    "GET",
    jwt
  )

  res.send(data)
}

export default handler
