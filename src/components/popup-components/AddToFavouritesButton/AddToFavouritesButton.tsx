import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

const AddToFavourtesButton = ({ popupId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [status, setStaus] = useState<
    "idle" | "resolved" | "rejected"
  >("idle")

  const clickHandler = async () => {
    setIsLoading(true)
    const { data, error } = await sendToBackground({
      name: "updateUserDetails",
      body: {
        favourites: {
          connnet: [popupId]
        }
      }
    })

    if (error) {
      console.error(error)
      setStaus("rejected")
    }

    if (data) {
      setStaus("resolved")
    }

    setIsLoading(false)
  }

  return (
    <>
      <button
        className="info--button"
        disabled={isLoading || status === "resolved"}
        onClick={clickHandler}
      >
        {status === "idle" && "Add to Favourites"}
        {status === "resolved" && "Added to Favourites"}
      </button>
      {status === "rejected" && <p>Something went wrong</p>}
    </>
  )
}

export default AddToFavourtesButton
