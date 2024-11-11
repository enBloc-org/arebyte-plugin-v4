import { currentProjectQueryString } from "~queries/currentProjectQuery"
import { eventPopupQueryString } from "~queries/eventPopupsQuery"
import type { EventData } from "~types/eventTypes"
import type { CurrentProjectData } from "~types/projectTypes"

import { fetchStrapiContent } from "./fetchStrapiContent"

/**
 *
 * @description fetches an array of pop ups from the unique type Current_Project
 * @returns an object with the array of pop_ups, the total number of events in the project and the time_delay value set for the event
 * @example const { popUps, numberOfEvents, timeDelay } = getCurrentProjectPopups(currentIndex)
 */
export default async function getCurrentProjectPopups(
  currentIndex: number
) {
  const currentProject = await fetchStrapiContent<CurrentProjectData>(
    `api/current-project?${currentProjectQueryString}`
  )
  const currentEventId =
    currentProject.data.project.sequence[currentIndex].id
  const { data } = await fetchStrapiContent<EventData>(
    `api/events/${currentEventId}?${eventPopupQueryString}`
  )
  return {
    popUps: data.pop_ups,
    numberOfEvents: currentProject.data.project.sequence.length,
    timeDelay: data.time_delay
  }
}
