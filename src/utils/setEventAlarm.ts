import browser from "webextension-polyfill"

import { ProjectResponse } from "~types/projectTypes"
import { UserSession } from "~types/userTypes"
import calculateCountDown from "~utils/calculateCountDown"

import { fetchStrapiContent } from "./fetchStrapiContent"
import iterateIndex from "./iterateIndex"
import newStorage from "./newStorage"

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
    const projectId = userSession.user.audience_member.project_id
    const currentIndex =
      userSession.user.audience_member.current_index

    const newIndex = iterateIndex([1, "2", 3], currentIndex)

    

    browser.windows.create({
      url: "https://media.4-paws.org/f/b/9/e/fb9eaf496f739315766331e91bddde8936375550/VP0113037-1927x1333.jpg",
      type: "popup",
      top: Math.floor(Math.random() * 1000),
      left: Math.floor(Math.random() * 1000)
    })
  })
}
