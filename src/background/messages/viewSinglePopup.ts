import type { PlasmoMessaging } from "@plasmohq/messaging"

import { popupQueryString } from "~queries/popupQuery"
import type { Popup } from "~types/eventTypes"
import type { UserSession } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"
import newStorage from "~utils/newStorage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { id } = req.body
  const storage = newStorage()

  const userSession: UserSession = await storage.get(
    "arebyte-audience-session"
  )

  const response = await fetchStrapiContent<Popup>(
    `api/pop-ups/${id}?${popupQueryString}`,
    "GET",
    userSession.jwt
  )

  if (response.error) {
    console.error(response.error)
    res.send(response)
  }

  const temporaryPopup = response.data
  temporaryPopup.popup_position = "center"

  res.send({ data: temporaryPopup, error: null })
}

export default handler
