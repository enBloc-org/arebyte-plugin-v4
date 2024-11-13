import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { UserFavourites, UserSession } from "~types/userTypes"
import newStorage from "~utils/newStorage"

const ManageFavouritesButton = ({ popupId }) => {
  const storage = newStorage()
  const [status, setStatus] = useState<
    "idle" | "loading" | "rejected"
  >("idle")
  const [isFavourite, setIsFavourite] = useState<boolean>(false)

  useEffect(() => {
    const fetchFavourites = async () => {
      const userSession: UserSession = await storage.get(
        "arebyte-audience-session"
      )
      const {
        data,
        error
      }: { data: UserFavourites; error: string | null } =
        await sendToBackground({
          name: "fetchUserFavourites",
          body: {
            id: userSession.id,
            jwt: userSession.jwt
          }
        })

      if (error) {
        console.error(error)
        return
      }
      console.log(data)
      console.log(popupId)
      console.log(data.favourites.some(fav => fav.id === popupId))
      setIsFavourite(data.favourites.some(fav => fav.id === popupId))
    }

    fetchFavourites()
  }, [])

  const clickHandler = async () => {
    setStatus("loading")
    const { error } = await sendToBackground({
      name: "updateUserDetails",
      body: {
        favourites: {
          [isFavourite ? "disconnect" : "connect"]: [popupId]
        }
      }
    })

    if (error) {
      console.error(error)
      setStatus("rejected")
    }

    setIsFavourite(!isFavourite)
    setStatus("idle")
  }

  return (
    <div className="controls-button--container">
      <button
        className="info--button"
        disabled={status === "loading"}
        onClick={clickHandler}
      >
        {isFavourite ? "REMOVE FROM FAVOURITES" : "ADD TO FAVOURITES"}
      </button>
      {status === "rejected" && (
        <p className="controls-message__error">
          Something went wrong, try again.
        </p>
      )}
    </div>
  )
}

export default ManageFavouritesButton
