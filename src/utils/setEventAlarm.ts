import browser from "webextension-polyfill"

import calculateCountDown from "~utils/calculateCountDown"

import eventAlarmListener from "./eventAlarmListener"

/**
 *
 * @param eventHour
 * @param eventMinute
 * @description sets a unique alarm for our daily event. This function should be called every time the event_time value is updated to align the extensions behaviour with the state of our data.
 */
export default async function setEventAlarm(
  eventHour: number,
  eventMinute: number
) {
  await browser.alarms.clear("sequence-alarm")
  await browser.alarms.onAlarm.removeListener(eventAlarmListener)

  await browser.alarms.create("sequence-alarm", {
    periodInMinutes: 1440,
    when: calculateCountDown(eventHour, eventMinute)
  })
  await browser.alarms.onAlarm.addListener(eventAlarmListener)
  try {
    const newAlarm = await browser.alarms.get("sequence-alarm")

    return { data: newAlarm, error: null }
  } catch (error) {
    console.error(error)
    return { data: null, error: error }
  }
}
