import { FullProject } from "~types/projectTypes"
import determineImgSrc from "~utils/determineImgSrc"

export default function EventCard({
  event
}: {
  event: FullProject["sequence"]
}) {
  return (
    <>
      <img
        className="event-card--image shadow"
        src={determineImgSrc(
          event.pop_ups[0].thumbnail_image.formats.thumbnail.url
        )}
      />
      <p>{event.title}</p>
    </>
  )
}
