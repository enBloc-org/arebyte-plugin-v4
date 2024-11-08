import { currentProjectQueryString } from "~queries/currentProjectQuery"
import { eventPopupQueryString } from "~queries/eventPopupsQuery"
import type { EventData } from "~types/eventTypes"
import type { CurrentProjectData } from "~types/projectTypes"

import { fetchStrapiContent } from "./fetchStrapiContent"

/**
 *
 * @description fetches an array of pop ups from the unique type Current_Project
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
    pop_ups: data.pop_ups,
    numberOfEvents: currentProject.data.project.sequence.length,
    timeDelay: data.time_delay
  }
}
