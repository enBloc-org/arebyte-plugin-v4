import { currentProjectQueryString } from "~queries/currentProjectQuery"
import { eventPopupQueryString } from "~queries/eventPopupsQuery"
import type { EventResponse } from "~types/eventTypes"
import type { CurrentProjectResponse } from "~types/projectTypes"

import { fetchStrapiContent } from "./fetchStrapiContent"

/**
 *
 * @description fetches an array of pop ups from the unique type Current_Project
 */
export default async function getCurrentProjectPopups(
  currentIndex: number
) {
  const currentProject =
    await fetchStrapiContent<CurrentProjectResponse>(
      `api/current-project?${currentProjectQueryString}`
    )
  const currentEventId =
    currentProject.data.project.events[currentIndex].id
  const {
    data: { pop_ups }
  } = await fetchStrapiContent<EventResponse>(
    `api/events/${currentEventId}?${eventPopupQueryString}`
  )
  return pop_ups
}
