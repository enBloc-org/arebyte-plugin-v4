import { DigestedEvent } from "~types/eventTypes"
import determineImgSrc from "~utils/determineImgSrc"

import "./EventCard.css"

import { sendToBackground } from "@plasmohq/messaging"

export default function EventCard({
  event
}: {
  event: DigestedEvent
}) {
  const handleEventCardClick = async () => {
    await sendToBackground({
      name: "triggerPopup",
      body: { id: event.id }
    })
  }

  return (
    <button
      className="event-card stack"
      onClick={handleEventCardClick}
    >
      <img
        className="event-card--image shadow"
        src={determineImgSrc(
          event.pop_ups[0].thumbnail_image.formats.thumbnail.url
        )}
      />
      <p className="bold text-md">{event.title}</p>
    </button>
  )
}
