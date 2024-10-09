import browser from "webextension-polyfill"

import { UserSession } from "~types/userTypes"
import calculateCountDown from "~utils/calculateCountDown"

import iterateActiveProject from "./iterateActiveProject"
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

    const projectId = userSession.user.audience_member.project_id

    const newProjectId = await iterateActiveProject(projectId)
    const updatedSession = updateStorage(userSession, {
      project_id: newProjectId
    })

    console.log(updatedSession)
    // storage.set("arebyte-audience-session", newStorage)

    browser.windows.create({
      url: "https://media.4-paws.org/f/b/9/e/fb9eaf496f739315766331e91bddde8936375550/VP0113037-1927x1333.jpg",
      type: "popup",
      top: Math.floor(Math.random() * 1000),
      left: Math.floor(Math.random() * 1000)
    })
  })
}
