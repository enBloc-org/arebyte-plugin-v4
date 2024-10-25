import type { Favourite } from "~types/eventTypes"

import "./PopupCard.css"

import { useErrorBoundary } from "react-error-boundary"

import { sendToBackground } from "@plasmohq/messaging"

export default function PopupCard({
  popup,
  isEditing,
  removeButtonHandler
}: {
  popup: Favourite
  isEditing?: boolean
  removeButtonHandler: () => void
}) {
  const { showBoundary } = useErrorBoundary()

  const handlePopup = async () => {
    if (isEditing) return

    const { error } = await sendToBackground({
      name: "viewSinglePopup",
      body: { id: popup.id }
    })

    if (error)
      return showBoundary(
        "Something went wrong. Please try again later."
      )
  }

  return (
    <button onClick={handlePopup}>
      <div className="popup-card content-box shadow">
        <img
          className="popup-card--image"
          src={
            process.env.NODE_ENV === "development"
              ? process.env.PLASMO_PUBLIC_API_URL +
                popup.thumbnail_image.formats.thumbnail.url
              : popup.thumbnail_image.formats.thumbnail.url
          }
          alt={popup.work_title}
        />
        {isEditing && (
          <button
            onClick={removeButtonHandler}
            className="popup-card--remove-button button--secondary bold"
          >
            REMOVE
          </button>
        )}
      </div>
    </button>
  )
}
