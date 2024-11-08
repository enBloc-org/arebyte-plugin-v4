import { eventPopupQueryString } from "~queries/eventPopupsQuery"
import { projectQueryString } from "~queries/projectQuery"
import type { EventData } from "~types/eventTypes"
import type { ProjectData } from "~types/projectTypes"

import { fetchStrapiContent } from "./fetchStrapiContent"

/**
 *
 * @description fetches an array of popups from the project with the given Id
 * @returns an object with the full array of popups, the total number of events in the project and the time_delay set for the event
 * @example const { popUps, numberOfEvents, timeDelay } = getProjectPopups(projectId, currentIndex)
 */
export default async function getProjectPopups(
  projectId: number,
  currentIndex: number
) {
  const currentProject = await fetchStrapiContent<ProjectData>(
    `api/projects/${projectId}?${projectQueryString}`
  )
  const currentEventId = currentProject.data.sequence[currentIndex].id
  const { data } = await fetchStrapiContent<EventData>(
    `api/events/${currentEventId}?${eventPopupQueryString}`
  )

  return {
    popUps: data.pop_ups,
    numberOfEvents: currentProject.data.sequence.length,
    timeDelay: data.time_delay
  }
}
