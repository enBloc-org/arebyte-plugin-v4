import type { Popup } from "~types/eventTypes"

import "./PopupCard.css"

export default function PopupCard({
  popup,
  isEditing
}: {
  popup: Popup
  isEditing?: boolean
}) {
  return (
    <div className="popup-card content-box shadow">
      <img
        className="popup-card--image"
        src={
          process.env.PLASMO_PUBLIC_API_URL +
          popup.popup_content[0].media.url
        }
        alt={popup.work_title}
        onError={() =>
          popup.popup_content[0].media.formats.thumbnail.url
        }
      />
      {isEditing && <span>REMOVE</span>}
    </div>
  )
}
