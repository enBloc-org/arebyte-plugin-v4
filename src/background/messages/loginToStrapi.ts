import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { AuthResponse } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  // const response = await fetch(
  //   `${process.env.PLASMO_PUBLIC_API_URL}/api/auth/local`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: req.body
  //   }
  // )
  // const data = await response.json()
  // console.dir(data)

  const data = await fetchStrapiContent<AuthResponse>(
    `api/auth/local`,
    "POST",
    undefined,
    req.body
  )
  res.send(data)
}

export default handler
