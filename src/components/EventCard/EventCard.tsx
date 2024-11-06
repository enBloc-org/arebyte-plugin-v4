import { DigestedEvent } from "~types/projectTypes"
import determineImgSrc from "~utils/determineImgSrc"

import "./EventCard.css"

export default function EventCard({
  event
}: {
  event: DigestedEvent
}) {
  return (
    <div className="event-card stack">
      <img
        className="event-card--image shadow"
        src={determineImgSrc(
          event.pop_ups[0].thumbnail_image.formats.thumbnail.url
        )}
      />
      <p className="bold text-md">{event.title}</p>
    </div>
  )
}
