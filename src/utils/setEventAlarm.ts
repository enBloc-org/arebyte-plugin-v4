import browser from "webextension-polyfill"

import { currentProjectQueryString } from "~queries/currentProjectQuery"
import { eventPopupQueryString } from "~queries/eventPopupsQuery"
import { EventResponse } from "~types/eventTypes"
import { CurrentProjectResponse } from "~types/projectTypes"
import { UserSession } from "~types/userTypes"
import calculateCountDown from "~utils/calculateCountDown"

import backgroundPopupCreate from "./backgroundPopCreate"
import { fetchStrapiContent } from "./fetchStrapiContent"
import iterateActiveProject from "./iterateActiveProject"
import iterateIndex from "./iterateIndex"
import newStorage from "./newStorage"
import updateStorage from "./updateStorage"

/**
 *
 * @param eventHour
 * @param eventMinute
 * @description sets a unique alarm for our daily event. This function should be called every time the event_time value is updated to align the extensions behaviour with the state of our data.
 */
export default function setEventAlarm(
  eventHour: number,
  eventMinute: number
) {
  browser.alarms.clear("test-alarm")

  browser.alarms.create("test-alarm", {
    periodInMinutes: 1440,
    when: calculateCountDown(eventHour, eventMinute)
  })
  console.log(`set alarm for ${eventHour}:${eventMinute}`)

  browser.alarms.onAlarm.addListener(async alarm => {
    if (alarm.name !== "test-alarm") return
    const storage = newStorage()
    const userSession: UserSession = await storage.get(
      "arebyte-audience-session"
    )
    if (userSession) {
      const projectId = userSession.user.audience_member.project_id

      const newProjectId = await iterateActiveProject(projectId)
      const updatedSession = updateStorage(userSession, {
        project_id: newProjectId
      })

      console.log(updatedSession)
      // storage.set("arebyte-audience-session", newStorage)
    } else {
      const publicIndex: number = await storage.get(
        "arebyte-public-index"
      )

      const currentProject =
        await fetchStrapiContent<CurrentProjectResponse>(
          `api/current-project?${currentProjectQueryString}`
        )
      const currentEventId =
        currentProject.data.project.events[publicIndex].id
      const {
        data: { pop_ups }
      } = await fetchStrapiContent<EventResponse>(
        `api/events/${currentEventId}?${eventPopupQueryString}`
      )
      await backgroundPopupCreate(pop_ups)

      const newPublicIndex = iterateIndex(pop_ups, publicIndex)
      await storage.set("arebyte-public-index", newPublicIndex)
    }
  })
}
