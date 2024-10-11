import Browser from "webextension-polyfill"

import { currentProjectQueryString } from "~queries/currentProjectQuery"
import type { CurrentProjectResponse } from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"
import newStorage from "~utils/newStorage"
import setEventAlarm from "~utils/setEventAlarm"

export {}

if (process.env.NODE_ENV === "development") {
  console.log("This is a development build")
}

if (process.env.NODE_ENV === "production") {
  console.log("This is a production build")
}


Browser.runtime.onInstalled.addListener(async () => {
  const storage = newStorage()
  storage.set("arebyte-public-index", 0)
  
  const currentProject =
    await fetchStrapiContent<CurrentProjectResponse>(
      `api/current-project?${currentProjectQueryString}`
    )

  const [eventHour, eventMinute] =
    currentProject.data.event_time.split(":")

  setEventAlarm(parseInt(eventHour), parseInt(eventMinute))
})
