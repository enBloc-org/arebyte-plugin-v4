import type { Favourite } from "~types/eventTypes"

import "./PopupCard.css"

import defaultImage from "data-base64:assets/icon.png"
import { useState } from "react"
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
  const [sourceString, setSourceString] = useState<string>(
    process.env.NODE_ENV === "development"
      ? process.env.PLASMO_PUBLIC_API_URL +
          popup.thumbnail_image.formats.thumbnail.url
      : popup.thumbnail_image.formats.thumbnail.url
  )

  const setToDefault = () => {
    setSourceString(defaultImage)
  }

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
      <div
        className={`${isEditing ? "popup-card__editing" : ""} popup-card content-box shadow`}
      >
        <img
          className="popup-card--image"
          src={sourceString}
          alt={popup.work_title}
          onError={setToDefault}
        />
        {isEditing && (
          <button
            onClick={removeButtonHandler}
            className="popup-card--remove-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="50"
              height="50"
              viewBox="0 0 5 250"
              fill="var(--base)"
            >
              <path
                d="M 13.4 88.492 L 1.508 76.6 c -2.011 -2.011 -2.011 -5.271 0 -7.282 L 69.318 1.508 c 2.011 -2.011 5.271 -2.011 7.282 0 L 88.492 13.4 c 2.011 2.011 2.011 5.271 0 7.282 L 20.682 88.492 C 18.671 90.503 15.411 90.503 13.4 88.492 z"
                transform=" matrix(1 0 0 1 0 0) "
              />
              <path
                d="M 69.318 88.492 L 1.508 20.682 c -2.011 -2.011 -2.011 -5.271 0 -7.282 L 13.4 1.508 c 2.011 -2.011 5.271 -2.011 7.282 0 l 67.809 67.809 c 2.011 2.011 2.011 5.271 0 7.282 L 76.6 88.492 C 74.589 90.503 71.329 90.503 69.318 88.492 z"
                transform=" matrix(1 0 0 1 0 0) "
              />
            </svg>
          </button>
        )}
      </div>
    </button>
  )
}
