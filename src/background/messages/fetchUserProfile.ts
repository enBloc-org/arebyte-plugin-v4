import type { PlasmoMessaging } from "@plasmohq/messaging"

import { userQueryString } from "~queries/userQuery"
import type { UserResponse } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { jwt, id } = req.body

  const response = await fetchStrapiContent<UserResponse>(
    `api/users/${id}?${userQueryString}`,
    "GET",
    jwt
  )

  res.send(response)
}

export default handler
