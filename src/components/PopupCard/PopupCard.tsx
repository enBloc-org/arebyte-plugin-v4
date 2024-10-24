import type { Popup } from "~types/eventTypes"

import "./PopupCard.css"

export default function PopupCard({
  popup
}: {
  popup: Popup
}) {
  return (
    <div className="popup-card content-box shadow">
      <img
        src={
          process.env.PLASMO_PUBLIC_API_URL +
          popup.popup_content[0].media.url
        }
        alt={popup.work_title}
      />
    </div>
  )
}
