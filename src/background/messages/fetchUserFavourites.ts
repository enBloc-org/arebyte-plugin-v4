import type { PlasmoMessaging } from "@plasmohq/messaging"

import { userFavouritesQueryString } from "~queries/userFavouritesQuery"
import type { User } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { jwt, id } = req.body
  
  const response = await fetchStrapiContent<
    Pick<User, "id" | "favourites">
  >(`api/users/${id}?${userFavouritesQueryString}`, "GET", jwt)

  if (response.error) {
    console.error(response.error)
    res.send(response)
  }

  res.send(response)
}

export default handler
