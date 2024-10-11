import browser from "webextension-polyfill"

import { UserSession } from "~types/userTypes"
import calculateCountDown from "~utils/calculateCountDown"

import backgroundPopupCreate from "./backgroundPopCreate"
import getCurrentProjectPopups from "./getCurrentProjectPopups"
import getProjectPopups from "./getProjectPopups"
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

  browser.alarms.onAlarm.addListener(async alarm => {
    if (alarm.name !== "test-alarm") return
    const storage = newStorage()
    const userSession: UserSession = await storage.get(
      "arebyte-audience-session"
    )

    if (userSession) {
      const projectId = userSession.user.audience_member.project_id
      const currentIndex =
        userSession.user.audience_member.current_index

      const pop_ups =
        projectId === 0
          ? await getCurrentProjectPopups(currentIndex)
          : await getProjectPopups(projectId, currentIndex)

      await backgroundPopupCreate(pop_ups)
      const newIndex = iterateIndex(pop_ups, currentIndex)

      const updatedSession = updateStorage(userSession, {
        current_index: newIndex,
        ...(newIndex === 0 && { project_id: 0 })
      })
      await storage.set("arebyte-audience-session", updatedSession)
    } else {
      const publicIndex: number = await storage.get(
        "arebyte-public-index"
      )

      const pop_ups = await getCurrentProjectPopups(publicIndex)
      await backgroundPopupCreate(pop_ups)

      const newPublicIndex = iterateIndex(pop_ups, publicIndex)
      await storage.set("arebyte-public-index", newPublicIndex)
    }
  })
}
