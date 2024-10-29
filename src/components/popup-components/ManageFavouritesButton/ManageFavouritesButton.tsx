import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "./ManageFavouritesButton.css"

const ManageFavouritesButton = ({ popupId }) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "rejected"
  >("idle")
  const [isFavourite, setIsFavourite] = useState<boolean>(false)

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
    <div className="fav-button--container">
      <button
        className="info--button"
        disabled={status === "loading"}
        onClick={clickHandler}
      >
        {isFavourite ? "REMOVE FROM FAVOURITES" : "ADD TO FAVOURITES"}
      </button>
      {status === "rejected" && (
        <p className="fav-message__error">
          Something went wrong, try again.
        </p>
      )}
    </div>
  )
}

export default ManageFavouritesButton
