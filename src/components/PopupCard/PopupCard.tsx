import type { Favourite } from "~types/eventTypes"

import "./PopupCard.css"

import { sendToBackground } from "@plasmohq/messaging"

export default function PopupCard({
  popup,
  isEditing
}: {
  popup: Favourite
  isEditing?: boolean
}) {
  const handlePopup = async () => {
    if (isEditing) return

    const { data, error } = await sendToBackground({
      name: "viewSinglePopup",
      body: { id: popup.id }
    })

    if (error) console.log("ooops!")

    console.log(data)
  }

  const handleRemove = async () => {
    console.log("REMOVE")
  }

  return (
    <button onClick={handlePopup}>
      <div className="popup-card content-box shadow">
        <img
          className="popup-card--image"
          src={
            process.env.PLASMO_PUBLIC_API_URL +
            popup.thumbnail_image.formats.thumbnail.url
          }
          alt={popup.work_title}
        />
        {isEditing && (
          <button
            onClick={handleRemove}
            className="popup-card--remove-button button--secondary bold"
          >
            REMOVE
          </button>
        )}
      </div>
    </button>
  )
}
