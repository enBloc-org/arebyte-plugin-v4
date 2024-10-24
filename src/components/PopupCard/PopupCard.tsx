import type { Popup } from "~types/eventTypes"

import "./PopupCard.css"

import { sendToBackground } from "@plasmohq/messaging"

export default function PopupCard({
  popup,
  isEditing
}: {
  popup: Popup
  isEditing?: boolean
}) {
  const handleClick = async () => {
    const { data, error } = await sendToBackground({
      name: "viewSinglePopup",
      body: { id: popup.id }
    })

    if (error) console.log("ooops!")

    console.log(data)
  }

  return (
    <button onClick={handleClick}>
      <div className="popup-card content-box shadow">
        <img
          className="popup-card--image"
          src={
            process.env.PLASMO_PUBLIC_API_URL +
            popup.thumbnail_image.formats.thumbnail.url
          }
          alt={popup.work_title}
        />
        {isEditing && <span>REMOVE</span>}
      </div>
    </button>
  )
}
