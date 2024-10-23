import type { Popup } from "~types/eventTypes"

import "./PopupCard.css"

export default function PopupCard({ popup }: { popup: Popup }) {
  return (
    <div className="popup-card content-box shadow">
      <p>{popup.work_title}</p>
    </div>
  )
}
