import { eventPopupQueryString } from "~queries/eventPopupsQuery"
import { projectQueryString } from "~queries/projectQuery"
import type { EventData } from "~types/eventTypes"
import type { ProjectData } from "~types/projectTypes"

import { fetchStrapiContent } from "./fetchStrapiContent"

/**
 *
 * @description fetches an array of popups from the project with the given Id
 */
export default async function getProjectPopups(
  projectId: number,
  currentIndex: number
) {
  const currentProject = await fetchStrapiContent<ProjectData>(
    `api/projects/${projectId}?${projectQueryString}`
  )
  const currentEventId = currentProject.data.sequence[currentIndex].id
  const {
    data: { pop_ups }
  } = await fetchStrapiContent<EventData>(
    `api/events/${currentEventId}?${eventPopupQueryString}`
  )

  return {
    pop_ups: pop_ups,
    numberOfEvents: currentProject.data.sequence.length
  }
}
