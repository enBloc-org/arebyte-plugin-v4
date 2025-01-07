import type { Favourite } from "~types/eventTypes"

import "./PopupCard.css"

import defaultImage from "data-base64:assets/icon.png"
import { useState } from "react"
import { useErrorBoundary } from "react-error-boundary"

import { sendToBackground } from "@plasmohq/messaging"

import determineImgSrc from "~utils/determineImgSrc"
import displayPopup from "~utils/popup-utils/displayPopup"

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
  const [sourceString, setSourceString] = useState<string>(() =>
    determineImgSrc(popup.thumbnail_image.formats.thumbnail.url)
  )

  const setToDefault = () => {
    setSourceString(defaultImage)
  }

  const handlePopup = async () => {
    if (isEditing) return

    const { data, error } = await sendToBackground({
      name: "viewSinglePopup",
      body: { id: popup.id }
    })

    if (error)
      return showBoundary(
        "Something went wrong. Please try again later."
      )

    await displayPopup(data)
  }

  return (
    <div
      className={`${isEditing ? "popup-card__editing" : ""} popup-card shadow`}
    >
      {isEditing && (
        <button
          className="close-button--container"
          onClick={removeButtonHandler}
        >
          <div className="popup-card--remove-button"></div>
        </button>
      )}
      <button onClick={handlePopup}>
        <img
          className="popup-card--image"
          src={sourceString}
          alt={popup.work_title}
          onError={setToDefault}
        />
      </button>
    </div>
  )
}
