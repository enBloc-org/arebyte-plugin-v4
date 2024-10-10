import { eventPopupQueryString } from "~queries/eventPopupsQuery"
import { projectQueryString } from "~queries/projectQuery"
import type { EventResponse } from "~types/eventTypes"
import type { ProjectResponse } from "~types/projectTypes"

import { fetchStrapiContent } from "./fetchStrapiContent"

/**
 * 
 * @description fetches an array of popups from the project with the given Id
 */
export default async function getProjectPopups(
  projectId: number,
  currentIndex: number
) {
  const currentProject = await fetchStrapiContent<ProjectResponse>(
    `api/projects/${projectId}?${projectQueryString}`
  )
  const currentEventId = currentProject.data.events[currentIndex].id
  const {
    data: { pop_ups }
  } = await fetchStrapiContent<EventResponse>(
    `api/events/${currentEventId}?${eventPopupQueryString}`
  )

  return pop_ups
}
